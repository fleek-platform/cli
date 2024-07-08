import { promises as fs } from 'node:fs';

import type { FleekRootConfig } from './types';

export type SaveConfigurationArgs = {
  config: FleekRootConfig;
  format: 'ts' | 'js' | 'json';
};

export const saveConfiguration = async ({
  config,
  format,
}: SaveConfigurationArgs): Promise<void> => {
  const prettyStringifiedConfig = JSON.stringify(config, undefined, 2);

  if (format === 'ts') {
    const content = `import { FleekConfig } from '@fleek-platform/cli';\n\nexport default ${prettyStringifiedConfig} satisfies FleekConfig;`;

    await fs.writeFile('fleek.config.ts', content);
  }

  if (format === 'js') {
    const content = `/** @type {import('@fleek-platform/cli').FleekConfig} */\nmodule.exports = ${prettyStringifiedConfig};`;

    await fs.writeFile('fleek.config.js', content);
  }

  if (format === 'json') {
    await fs.writeFile('fleek.config.json', prettyStringifiedConfig);
  }
};
