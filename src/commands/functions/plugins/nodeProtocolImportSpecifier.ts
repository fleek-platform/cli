import fs from 'node:fs';
import type { PluginBuild } from 'esbuild';

import {
  supportedRuntimeModules,
  unsupportedRuntimeModules,
} from '../runtimeModules';

const replaceLineByMatchRegExpr = ({
  contents,
  moduleName,
}: { contents: string; moduleName: string }) => {
  const reImportSyntax = new RegExp(
    `import\\s*[\\w\\W]*?\\s*from\\s+["']${moduleName}["']`,
    'g',
  );
  const reModuleName = new RegExp(`["']${moduleName}["']`, 'g');
  const convention = `"node:${moduleName}"`;
  const lns = contents.split('\n');
  const res = lns.map((ln) => {
    const shouldReplace = reImportSyntax.test(ln);

    if (!shouldReplace) {
      return ln;
    }

    return ln.replace(reModuleName, convention);
  });

  return res.join('\n');
};

const applyNodeProtocolConvention = async ({ path }: { path: string }) => {
  const buffer = await fs.promises.readFile(path, 'utf8');
  const contents = buffer.toString();

  const output = [
    ...supportedRuntimeModules,
    ...unsupportedRuntimeModules,
  ].reduce((acc, moduleName) => {
    return replaceLineByMatchRegExpr({
      contents: acc,
      moduleName,
    });
  }, contents);

  return {
    contents: output,
  };
};

export const nodeProtocolImportSpecifier = ({
  onError,
}: { onError: () => void }) => ({
  name: 'nodeProtocolImportSpecifier',
  setup(build: PluginBuild) {
    build.onLoad({ filter: /\.js$/ }, async ({ path }) => {
      try {
        const output = await applyNodeProtocolConvention({
          path,
        });

        return output;
      } catch (err) {
        onError();
      }
    });

    build.onResolve({ filter: /^node:/ }, (args) => ({
      path: args.path,
      external: true,
    }));
  },
});
