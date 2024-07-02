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

const transpileCode = async (args: BundleCodeArgs) => {
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
          progressBar.start(100, 10);
        });
      },
    },
    {
      name: 'Node:* protocol import specifier',
      setup(build) {
        build.onLoad({ filter: /\.js$/ }, async (args) => {
          // TODO: escape module name
          const moduleName = "buffer";
          const buffer = await fs.promises.readFile(args.path, 'utf8');
          const reImportSyntax = new RegExp(`import\\s+[\\w\\W]*?\\s+from\\s+["']${moduleName}["']`, 'g');
          const contents = buffer.toString();
          
          if (!reImportSyntax.test(contents)) return;

          const reModuleName = new RegExp(`["']${moduleName}["']`, 'g');

          return {
            contents: contents.replace(reModuleName, `"node:${moduleName}"`),
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

  // TODO: Rename the transpileCode param noBundle
  // to "bundle" as its easier to read
  // for the moment use proxy variable
  const bundle = !noBundle;

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

  if (bundle) {
    buildOptions = {
      ...buildOptions,
      // TODO: native modules don't require to be made external
      // as that's the default behaviour, revise this line
      external: [...Object.values(supportedModulesAliases)],
    }
  }

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

  if (!bundle) {
    const noCheck = '// @ts-nocheck';
    const buf = await fs.promises.readFile(outFile, 'utf8');
    const content = `${noCheck}\n${buf.toString()}`;
    await fs.promises.writeFile(outFile, content, 'utf8');
  }

  const bundlingResponse: BundlingResponse = {
    path: outFile,
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

  // TODO: Given original name "bundleCode" and "noBundle parameter, check original intent as some of the process
  // done when transpiling should be available when no "esbuild"
  // pass is required. Notice that the original author
  // always bundled the code even though the user might not
  // request it
  const bundlingResponse = await transpileCode({ filePath, noBundle, env });

  showUnsupportedModules({ unsupportedModulesUsed: bundlingResponse.unsupportedModules });

  if (!bundlingResponse.success && !noBundle) {
    throw new FleekFunctionBundlingFailedError({ error: bundlingResponse.error });
  }

  return bundlingResponse.path;
};
