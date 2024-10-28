import * as fs from 'node:fs';
import * as os from 'node:os';

// TODO: These error messages should be revised
// e.g. FleekFunctionPathNotValidError happens regardless of bundling
import {
  FleekFunctionBundlingFailedError,
  FleekFunctionPathNotValidError,
  UnknownError,
} from '@fleek-platform/errors';
import cliProgress from 'cli-progress';
import { type Plugin, type PluginBuild, build } from 'esbuild';
import { filesFromPaths } from 'files-from-path';

import { output } from '../../../cli';
import { t } from '../../../utils/translation';
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
  assetsCid?: string;
};

const transpileCode = async (args: TranspileCodeArgs) => {
  const {
    createFleekBuildConfig,
    nodeProtocolImportSpecifier,
    moduleChecker,
    unsupportedRuntimeModules,
  } = await import('@fleek-platform/functions-esbuild-config');

  const { filePath, bundle, env, assetsCid } = args;
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
    moduleChecker({
      unsupportedModulesUsed: new Set<string>(unsupportedRuntimeModules),
    }),
    {
      name: 'ProgressBar',
      setup: (build: PluginBuild) => {
        build.onStart(() => {
          progressBar.start(100, 10);
        });
      },
    },
  ];

  if (bundle) {
    plugins.push(
      nodeProtocolImportSpecifier({
        // Handle the error gracefully
        onError: () => output.error(t('failedToApplyNodeImportProtocol')),
      }),
    );
  }

  let adaptedEnv = env;
  if (assetsCid) {
    adaptedEnv = {
      ...env,
      ASSETS_CID: assetsCid,
    };
  }

  const buildConfig = createFleekBuildConfig({
    filePath,
    bundle,
    env: adaptedEnv,
  });

  try {
    await build({
      ...buildConfig,
      outfile: outFile,
      plugins,
      minify: !!bundle,
    });

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
    path: outFile,
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

export const getJsCodeFromPath = async (args: {
  filePath: string;
  bundle: boolean;
  env: EnvironmentVariables;
  assetsCid?: string;
}) => {
  const { filePath, bundle, env, assetsCid } = args;

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
    assetsCid,
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
