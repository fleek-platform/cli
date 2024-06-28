import { FleekFunctionBundlingFailedError, FleekFunctionPathNotValidError } from '@fleek-platform/errors';
import cliProgress from 'cli-progress';
import { filesFromPaths } from 'files-from-path';
import * as fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import webpack, { Configuration } from 'webpack';

import { output } from '../../../cli';
import { t } from '../../../utils/translation';
import { EnvironmentVariables } from './parseEnvironmentVariables';
import { moduleChecker, unsupportedModules } from './plugins/moduleChecker';

const externalModules = {
  assert: 'node:assert',
  buffer: 'node:buffer',
  console: 'node:console',
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
  'util/types': 'node:util/types',
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
  progressBar.start(100, 0);

  const tempDir = '.fleek';

  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  const unsupportedModulesUsed = new Set<string>();

  const outfilePath = path.join(process.cwd(), tempDir);
  const entryfilePath = path.join(process.cwd(), filePath);
  const filename = 'function.js';

  const webpackConfiguration: Configuration = {
    entry: entryfilePath,
    mode: 'none',
    externals: {
      ...externalModules,
      ...Object.values(externalModules).reduce((acc, val) => {
        acc[val] = val;

        return acc;
      }, {} as Record<string, string>),
    },
    experiments: {
      outputModule: true,
    },
    resolve: {
      alias: {
        ...[...unsupportedModules].reduce((acc, val) => {
          acc[val] = false;

          return acc;
        }, {} as Record<string, false>),
      },
      fallback: {
        async_hooks: path.resolve(__dirname, 'polyfills', 'async_hooks.js'),
      },
    },
    output: {
      library: {
        type: 'module',
      },
      path: outfilePath,
      filename,
      iife: false,
    },
    plugins: [
      moduleChecker({ unsupportedModulesUsed }),
      new webpack.ProgressPlugin((percentage) => {
        progressBar.update(percentage * 100);
      }),
      new webpack.BannerPlugin({
        raw: true,
        banner: `
globalThis.fleek = {
  env: {
    ${Object.entries(env)
      .map(([key, value]) => `${key}: "${value}"`)
      .join(',\n')}
  }
}
    `,
      }),
    ],
  };

  if (!noBundle) {
    try {
      const compiler = webpack(webpackConfiguration);
      const pack = promisify(compiler.run).bind(compiler);
      await pack();
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
  }

  progressBar.update(100);
  progressBar.stop();

  const bundlingResponse: BundlingResponse = {
    path: noBundle ? filePath : `${outfilePath}/${filename}`,
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
