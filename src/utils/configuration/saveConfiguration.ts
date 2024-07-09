import { promises as fs } from 'node:fs';

import { output } from '../../cli';

import { getConfigFileByTypeName } from '../config';

import type { FleekRootConfig, FleekSiteConfigFormats } from './types';

import { t } from '../translation';
import { fileExists } from '../fs'

export type SaveConfigurationArgs = {
  config: FleekRootConfig;
  format: FleekSiteConfigFormats;
};

export const saveConfiguration = async ({
  config,
  format,
}: SaveConfigurationArgs): Promise<string> => {
  // Default to json
  let configFile = getConfigFileByTypeName("JSON");

  try {
    const formattedOutput = JSON.stringify(config, undefined, 2);

    if (format === 'ts') {
      // TODO: The syntax `satisfies` is only available >= 4.9
      const content = `import { FleekConfig } from '@fleek-platform/cli';\n\nexport default ${formattedOutput} satisfies FleekConfig;`;
      configFile = getConfigFileByTypeName("Typescript");

      await fs.writeFile(configFile, content);
    }

    if (format === 'js') {
      const content = `/** @type {import('@fleek-platform/cli').FleekConfig} */\nmodule.exports = ${formattedOutput};`;
      configFile = getConfigFileByTypeName("Javascript");

      await fs.writeFile(configFile, content);
    }

    await fs.writeFile(configFile, formattedOutput);
  } catch (_err) {
    // TODO: write to system log file, see PLAT-1097
  }

  const isFile = await fileExists(configFile);

  if (!isFile) {
    output.warn(t('fsFailedToWriteConfig'));
    process.exit(1);
  }

  return configFile;
};
