import * as fs from 'node:fs';
import * as os from 'node:os';
import path from 'node:path';

// TODO: These error messages should be revised
// e.g. FleekFunctionPathNotValidError happens regardless of bundling
import {
  FleekFunctionBundlingFailedError,
  FleekFunctionPathNotValidError,
  UnknownError,
} from '@fleek-platform/errors';
import cliProgress from 'cli-progress';
import { type BuildOptions, type Plugin, build } from 'esbuild';
import { filesFromPaths } from 'files-from-path';

import { output } from '../../../cli';
import { t } from '../../../utils/translation';
import { asyncLocalStoragePolyfill } from '../plugins/asyncLocalStoragePolyfill';
import { nodeProtocolImportSpecifier } from '../plugins/nodeProtocolImportSpecifier';
import { moduleChecker } from '../plugins/unsupportedModuleStub';
import type { EnvironmentVariables } from './parseEnvironmentVariables';

type TranspileResponse = {
  path: string;
  unsupportedModules: Set<string>;
  success: boolean;
  error?: string;
};

type ShowUnsupportedModulesArgs = {
  unsupportedModulesUsed: Set<string>;
};

const showUnsupportedModules = (args: ShowUnsupportedModulesArgs) => {
  const unsupportedModulesUsed = Array.from(args.unsupportedModulesUsed);

  if (unsupportedModulesUsed.length) {
    output.printNewLine();
    for (const packageName of unsupportedModulesUsed) {
      output.mistake(t('unsupportedPackage', { packageName }));
    }

    output.log(t('showUnsupportedModulesDocLink'));
    output.link('https://fleek.xyz/docs');
    output.printNewLine();
  }
};

const buildEnvVars = (args: { env: EnvironmentVariables }) => {
  return Object.entries(args.env)
    .map(([key, value]) => `${key}: "${value}"`)
    .join(',');
};

type TranspileCodeArgs = {
  filePath: string;
  bundle: boolean;
  env: EnvironmentVariables;
};

const transpileCode = async (args: TranspileCodeArgs) => {
  const { filePath, bundle, env } = args;
  const progressBar = new cliProgress.SingleBar(
    {
      format: t('uploadProgress', {
        action: t(bundle ? 'bundlingCode' : 'transformingCode'),
      }),
    },
    cliProgress.Presets.shades_grey,
  );

  let tempDir: string;

  if (!output.debugEnabled) {
    tempDir = os.tmpdir();
  } else {
    tempDir = '.fleek';

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
  }

  const outFile = `${tempDir}/function.js`;
  const unsupportedModulesUsed = new Set<string>();

  const plugins: Plugin[] = [
    moduleChecker({ unsupportedModulesUsed }),
    {
      name: 'ProgressBar',
      setup: (build) => {
        build.onStart(() => {
          progressBar.start(100, 10);
        });
      },
    },
  ];

  if (bundle) {
    plugins.push(
      asyncLocalStoragePolyfill(),
      nodeProtocolImportSpecifier({
        // Handle the error gracefully
        onError: () => output.error(t('failedToApplyNodeImportProtocol')),
      }),
    );
  }

  const filePathWorkDir = path.dirname(filePath);
  const nodeModulesPath = path.join(filePathWorkDir, 'node_modules');

  const buildOptions: BuildOptions = {
    entryPoints: [filePath],
    bundle,
    logLevel: 'silent',
    platform: 'browser',
    format: 'esm',
    target: 'esnext',
    treeShaking: true,
    mainFields: ['browser', 'module', 'main'],
    outfile: outFile,
    minify: true,
    plugins,
    nodePaths: [nodeModulesPath],
  };

  buildOptions.banner = {
    js: `import { Buffer } from "node:buffer";
globalThis.fleek={env:{${buildEnvVars({ env })}}};`,
  };

  try {
    await build(buildOptions);

    progressBar.update(100);
    progressBar.stop();
  } catch (e) {
    progressBar.stop();

    const errorMessage =
      e &&
      typeof e === 'object' &&
      'message' in e &&
      typeof e.message === 'string'
        ? e.message
        : t('unknownTransformError');

    const transpileResponse: TranspileResponse = {
      path: filePath,
      unsupportedModules: unsupportedModulesUsed,
      success: false,
      error: errorMessage,
    };

    return transpileResponse;
  }

  const transpileResponse: TranspileResponse = {
    path: bundle ? outFile : filePath,
    unsupportedModules: unsupportedModulesUsed,
    success: true,
  };

  return transpileResponse;
};

export const getFileLikeObject = async (path: string) => {
  const files = await filesFromPaths([path]);

  if (!files.length) {
    throw new FleekFunctionPathNotValidError({ path });
  }

  return files[0];
};

// TODO: Create a process to validate the user source code
// using placeholder for the moment
const checkUserSourceCodeSupport = async (filePath: string) => {
  const reRequireSyntax = /require\s*\([^)]*\)/g;
  const buffer = await fs.promises.readFile(filePath);
  const contents = buffer.toString();

  return reRequireSyntax.test(contents);
};

export const getCodeFromPath = async (args: {
  filePath: string;
  bundle: boolean;
  env: EnvironmentVariables;
}) => {
  const { filePath, bundle, env } = args;

  if (!fs.existsSync(filePath)) {
    throw new FleekFunctionPathNotValidError({ path: filePath });
  }

  const isUserSourceCodeSupported = await checkUserSourceCodeSupport(filePath);

  if (isUserSourceCodeSupported) {
    output.error(t('requireDeprecatedUseES6Syntax'));
  }

  const transpileResponse = await transpileCode({
    filePath,
    bundle,
    env,
  });

  showUnsupportedModules({
    unsupportedModulesUsed: transpileResponse.unsupportedModules,
  });

  if (!transpileResponse.success) {
    if (!transpileResponse.error) {
      throw new UnknownError();
    }

    throw new FleekFunctionBundlingFailedError({
      error: transpileResponse.error,
    });
  }

  return transpileResponse.path;
};
