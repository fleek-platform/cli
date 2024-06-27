import { FleekFunctionBundlingFailedError, FleekFunctionPathNotValidError } from '@fleek-platform/errors';
import cliProgress from 'cli-progress';
import { build, BuildOptions, Plugin } from 'esbuild';
import { nodeModulesPolyfillPlugin } from 'esbuild-plugins-node-modules-polyfill';
import { filesFromPaths } from 'files-from-path';
import * as fs from 'fs';

import { output } from '../../../cli';
import { t } from '../../../utils/translation';
import { EnvironmentVariables } from './parseEnvironmentVariables';
import { asyncLocalStoragePolyfill } from './plugins/asyncLocalStoragePolyfill';
import { moduleChecker } from './plugins/moduleChecker';

const supportedModulesAliases = {
  buffer: 'node:buffer',
  crypto: 'node:crypto',
  domain: 'node:domain',
  events: 'node:events',
  http: 'node:http',
  https: 'node:https',
  path: 'node:path',
  punycode: 'node:punycode',
  stream: 'node:stream',
  string_decoder: 'node:string_decoder',
  url: 'node:url',
  util: 'node:util',
  zlib: 'node:zlib',
};

type BundlingResponse =
  | {
      path: string;
      unsupportedModules: Set<string>;
      success: true;
    }
  | {
      path: string;
      unsupportedModules: Set<string>;
      success: false;
      error: string;
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
  noBundle: boolean;
  env: EnvironmentVariables;
};

const bundleCode = async (args: BundleCodeArgs) => {
  const { filePath, noBundle, env } = args;

  const progressBar = new cliProgress.SingleBar(
    {
      format: t('uploadProgress', { action: t('bundlingCode') }),
    },
    cliProgress.Presets.shades_grey
  );

  const tempDir = '.fleek';

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  const outFile = tempDir + '/function.js';
  const unsupportedModulesUsed = new Set<string>();

  const plugins: Plugin[] = [
    moduleChecker({ unsupportedModulesUsed }),
    {
      name: 'ProgressBar',
      setup: (build) => {
        build.onStart(() => {
          if (!noBundle) {
            progressBar.start(100, 10);
          }
        });
      },
    },
  ];

  if (!noBundle) {
    plugins.push(
      nodeModulesPolyfillPlugin({
        globals: { Buffer: true },
        modules: {
          async_hooks: false,
          assert: true,
          dns: true,
          http2: true,
          net: true,
          querystring: true,
          tls: true,
        },
      }),
      asyncLocalStoragePolyfill()
    );
  }

  const buildOptions: BuildOptions = {
    entryPoints: [filePath],
    bundle: true,
    logLevel: 'silent',
    platform: 'browser',
    format: 'esm',
    target: 'esnext',
    treeShaking: true,
    mainFields: ['browser', 'module', 'main'],
    external: [...Object.values(supportedModulesAliases)],
    alias: supportedModulesAliases,
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
  } catch (e) {
    progressBar.stop();

    const errorMessage =
      e && typeof e === 'object' && 'message' in e && typeof e.message === 'string' ? e.message : t('unknownBundlingError');

    const bundlingResponse: BundlingResponse = {
      path: filePath,
      unsupportedModules: unsupportedModulesUsed,
      success: false,
      error: errorMessage,
    };

    return bundlingResponse;
  }

  progressBar.update(100);
  progressBar.stop();

  const bundlingResponse: BundlingResponse = {
    path: noBundle ? filePath : outFile,
    unsupportedModules: unsupportedModulesUsed,
    success: true,
  };

  return bundlingResponse;
};

export const getFileLikeObject = async (path: string) => {
  const files = await filesFromPaths([path]);

  if (!files.length) {
    throw new FleekFunctionPathNotValidError({ path });
  }

  return files[0];
};

export const getCodeFromPath = async (args: { path: string; noBundle: boolean; env: EnvironmentVariables }) => {
  const { path, noBundle, env } = args;

  let filePath: string;

  if (fs.existsSync(path)) {
    filePath = path;
  } else {
    throw new FleekFunctionPathNotValidError({ path });
  }

  const bundlingResponse = await bundleCode({ filePath, noBundle, env });

  showUnsupportedModules({ unsupportedModulesUsed: bundlingResponse.unsupportedModules });

  if (!bundlingResponse.success && !noBundle) {
    throw new FleekFunctionBundlingFailedError({ error: bundlingResponse.error });
  }

  return bundlingResponse.path;
};
