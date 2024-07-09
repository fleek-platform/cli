import { promises as fs } from 'node:fs';

import { getConfigFileByTypeName } from '../config';

import { type FleekRootConfig, FleekSiteConfigFormats } from './types';

import { ExpectedOneOfValuesError } from '@fleek-platform/errors';

export type SaveConfigurationArgs = {
  config: FleekRootConfig;
  format: FleekSiteConfigFormats;
};

type ConfigFilePath = string;

export const saveConfiguration = async ({
  config,
  format,
}: SaveConfigurationArgs): Promise<ConfigFilePath | undefined> => {
  try {
    const formattedOutput = JSON.stringify(config, undefined, 2);

    if (format === 'ts') {
      // TODO: The syntax `satisfies` is only available >= 4.9
      const content = `import { FleekConfig } from '@fleek-platform/cli';\n\nexport default ${formattedOutput} satisfies FleekConfig;`;
      const configFile = getConfigFileByTypeName("Typescript");

      await fs.writeFile(configFile, content);

      return configFile;
    } else if (format === 'js') {
      const content = `/** @type {import('@fleek-platform/cli').FleekConfig} */\nmodule.exports = ${formattedOutput};`;
      const configFile = getConfigFileByTypeName("Javascript");

      await fs.writeFile(configFile, content);

      return configFile;
    } else if (format === 'json') {
      const configFile = getConfigFileByTypeName("JSON");
      await fs.writeFile(configFile, formattedOutput);

      return configFile;
    }

    throw new ExpectedOneOfValuesError({
      expectedValues: Object.keys(FleekSiteConfigFormats),
      receivedValue: format,
    });
  } catch (_err) {
    // TODO: write to system log file, see PLAT-1097
  }
};
