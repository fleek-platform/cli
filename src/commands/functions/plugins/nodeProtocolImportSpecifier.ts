import fs from 'fs';
import { PluginBuild } from 'esbuild';

export const nodeProtocolImportSpecifier = () => ({
  name: 'nodeProtocolImportSpecifie',
  setup(build: PluginBuild) {
    build.onLoad({ filter: /\.js$/ }, async (args) => {
      // TODO: escape module name
      // TODO: iterate over list of native module list
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
});
