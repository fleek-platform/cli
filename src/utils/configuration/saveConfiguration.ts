import { promises as fs } from 'node:fs';

import { getConfigFileByTypeName } from '../configuration';

import { type FleekRootConfig, FleekSiteConfigFormats } from './types';

import { ExpectedOneOfValuesError } from '@fleek-platform/errors';

export type SaveConfigurationArgs = {
  config: FleekRootConfig;
  format: FleekSiteConfigFormats;
};

type ConfigFilePath = string;

// TODO: Move to separate template files
const contentForTypescriptConfig = "import { FleekConfig } from '@fleek-platform/cli';\n\nexport default $content satisfies FleekConfig;";
const contentForJavascriptConfig = "/** @type {import('@fleek-platform/cli').FleekConfig} */\nmodule.exports = $content;";

export const saveConfiguration = async ({
  config,
  format,
}: SaveConfigurationArgs): Promise<ConfigFilePath | undefined> => {const formattedOutput = JSON.stringify(config, undefined, 2);

  if (!Object.values(FleekSiteConfigFormats).includes(format)) {
    throw new ExpectedOneOfValuesError({
      expectedValues: Object.values(FleekSiteConfigFormats),
      receivedValue: format,
    });
  }

  let content: string;
  let configFile: ConfigFilePath;

  switch (format) {
    case FleekSiteConfigFormats.Typescript:
      content = contentForTypescriptConfig.replace('$content', formattedOutput);
      configFile = getConfigFileByTypeName("Typescript");
      break;
    case FleekSiteConfigFormats.Javascript:
      content = contentForJavascriptConfig.replace('$content', formattedOutput);
      configFile = getConfigFileByTypeName("Javascript");
      break;
    case FleekSiteConfigFormats.JSON:
      content = formattedOutput;
      configFile = getConfigFileByTypeName("JSON");
      break;
  }

  try {
    await fs.writeFile(configFile, content);
    return configFile;
  } catch (_err) {
    // TODO: write to system log file, see PLAT-1097
  }
};
