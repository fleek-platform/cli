import { OnResolveArgs, Plugin, PluginBuild } from 'esbuild';

import { unsupportedRuntimeModules } from '../runtimeModules';

const unsupportedModules = unsupportedRuntimeModules.map((it) => `node:${it}`);

type ModuleCheckerArgs = {
  unsupportedModulesUsed: Set<string>;
};

export const moduleChecker: (args: ModuleCheckerArgs) => Plugin = (args) => {
  const { unsupportedModulesUsed } = args;

  return {
    name: 'moduleChecker',
    setup: (build: PluginBuild) => {
      build.onLoad({ filter: /.*/, namespace: 'unsupported' }, (args) => {
        console.log('unsupported', args);

        return {
          contents: `
            throw new Error('Unsupported module: ${args.path}');
          `,
          loader: 'js',
        };
      });

      build.onResolve({ filter: /.*/ }, ({ path }: OnResolveArgs) => {
        if (unsupportedModules.includes(path) || unsupportedModules.includes(`node:${path}`)) {
          unsupportedModulesUsed.add(path);

          return {
            path,
            namespace: 'unsupported',
          };
        }

        return null;
      });
    },
  };
};
