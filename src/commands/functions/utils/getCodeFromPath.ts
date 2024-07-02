// TODO: These error messages should be revised
// e.g. FleekFunctionPathNotValidError happens regardless of bundling
import { FleekFunctionBundlingFailedError, FleekFunctionPathNotValidError, UnknownError } from '@fleek-platform/errors';
import cliProgress from 'cli-progress';
import { build, BuildOptions, Plugin } from 'esbuild';
import { filesFromPaths } from 'files-from-path';
import * as fs from 'fs';

import { output } from '../../../cli';
import { t } from '../../../utils/translation';
import { EnvironmentVariables } from './parseEnvironmentVariables';
import { asyncLocalStoragePolyfill } from '../plugins/asyncLocalStoragePolyfill';
import { moduleChecker } from '../plugins/moduleChecker';
import { nodeProtocolImportSpecifier } from '../plugins/nodeProtocolImportSpecifier';

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
    unsupportedModulesUsed.forEach((val) => {
      output.mistake(t('unsupportedPackage', { packageName: val }));
    });
    output.log(t('showUnsupportedModulesDocLink'));
    output.link('https://fleek.xyz/docs');
    output.printNewLine();
  }
};

type BundleCodeArgs = {
  filePath: string;
  bundle: boolean;
  env: EnvironmentVariables;
};

const transpileCode = async (args: BundleCodeArgs) => {
  const { filePath, bundle, env } = args;
  const progressBar = new cliProgress.SingleBar(
    {
      format: t('uploadProgress', { action: t(bundle ? 'bundlingCode' : 'transformingCode') }),
    },
    cliProgress.Presets.shades_grey
  );

  // TODO: The temporary directory should be handled
  // as expected. Create a temp location, use and deleted safely
  // it shouldn't be persistent or dumped in the user workdir.
  // Should be reusable across the file or process.
  const tempDir = '.fleek';

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  const outFile = tempDir + '/function.js';
  const unsupportedModulesUsed = new Set<string>();

  const plugins: Plugin[] = [
    moduleChecker({ unsupportedModulesUsed }),
    nodeProtocolImportSpecifier({
      // Handle the error gracefully
      onError: () => output.error(t('failedToApplyNodeImportProtocol')),
    }),
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
      asyncLocalStoragePolyfill()
    );
  }

  let buildOptions: BuildOptions = {
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
  };

  if (Object.keys(env).length) {
    buildOptions.banner = {
      js: `
    globalThis.fleek = {
      env: {
        ${Object.entries(env)
          .map(([key, value]) => `${key}: "${value}"`)
          .join(',\n')}
      }
    }
    `,
    };
  }

  try {
    await build(buildOptions);

    progressBar.update(100);
    progressBar.stop();
  } catch (e) {
    progressBar.stop();

    const errorMessage =
      e && typeof e === 'object' && 'message' in e && typeof e.message === 'string' ? e.message : t('unknownTransformError');

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
  const reRequireSyntax = new RegExp(`require\\s*\\([^)]*\\)`, 'g');
  const buffer = await fs.promises.readFile(filePath);
  const contents = buffer.toString();

  return reRequireSyntax.test(contents);
}

export const getCodeFromPath = async (args: { filePath: string; bundle: boolean; env: EnvironmentVariables }) => {
  const { filePath, bundle, env } = args;

  if (!fs.existsSync(filePath)) {
    throw new FleekFunctionPathNotValidError({ path: filePath });
  }

  const isUserSourceCodeSupported = await checkUserSourceCodeSupport(filePath);

  if (isUserSourceCodeSupported) {
    output.error(t('requireDeprecatedUseES6Syntax'));
  }

  // TODO: Given original name "bundleCode" and "noBundle"
  // parameter, check original intent.
  // The original version bundled regardless of "noBundle" flag
  // although at very end opting to use the raw version
  // but this seemed like a mistake.
  // TODO: If the original intent did NOT want to have esbuild
  // to transpile the code, it must apply shared computations
  // such as the node: protocol or others.
  const transpileResponse = await transpileCode({
    filePath,
    bundle,
    env,
  });

  showUnsupportedModules({ unsupportedModulesUsed: transpileResponse.unsupportedModules });

  if (!transpileResponse.success) {
    if (!transpileResponse.error) {
      throw new UnknownError();
    }
    
    throw new FleekFunctionBundlingFailedError({ error: transpileResponse.error });
  }

  return transpileResponse.path;
};
