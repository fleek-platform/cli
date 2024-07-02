import fs from 'fs';
import { PluginBuild } from 'esbuild';

const supportedModules = [
  'buffer',
  'crypto',
  'domain',
  'events',
  'http',
  'https',
  'path',
  'punycode',
  'stream',
  'string_decoder',
  'url',
  'util',
  'zlib',
];

const applyNodeProtocolConvention = async ({
  moduleName,
  path,
}: {
  moduleName: string;
  path: string;
}) => {
  const buffer = await fs.promises.readFile(path, 'utf8');
  const reImportSyntax = new RegExp(`import\\s+[\\w\\W]*?\\s+from\\s+["']${moduleName}["']`, 'g');
  const contents = buffer.toString();

  if (!reImportSyntax.test(contents)) return;

  const reModuleName = new RegExp(`["']${moduleName}["']`, 'g');

  return {
    contents: contents.replace(reModuleName, `"node:${moduleName}"`),
  }
}

export const nodeProtocolImportSpecifier = ({
  onError
}: {
  onError: () => void;    
}) => ({
  name: 'nodeProtocolImportSpecifier',
  setup(build: PluginBuild) {
    build.onLoad({ filter: /\.js$/ }, async ({ path }) => {
      try {
        for (const moduleName of supportedModules) {
          return applyNodeProtocolConvention({
            moduleName,
            path,
          });
        }        
      } catch (err) {
        onError();
      }
    });

    build.onResolve({ filter: /^node:/ }, args => ({
      path: args.path,
      external: true,
    }));
  },
});
