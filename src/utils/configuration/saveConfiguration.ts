import { promises as fs } from 'node:fs';
import path from 'node:path';

import {
  FLEEK_CONFIG_TMPL_JSON_PLACEHOLDER,
  getConfigFileByTypeName,
  getConfigTemplateByTypeName,
} from '../configuration';

import { type FleekRootConfig, FleekSiteConfigFormats } from './types';

import {
  ExpectedOneOfValuesError,
  InvalidJSONFormat,
} from '@fleek-platform/errors';
import { isValidFleekConfigFormat } from '../formats';

export type SaveConfigurationArgs = {
  config: FleekRootConfig;
  format: FleekSiteConfigFormats;
};

type ConfigFilePath = string;

const DEV_SRC_UTILS_PATH = '/src/utils';
const basePath = path.dirname(__filename).includes(DEV_SRC_UTILS_PATH)
  ? '../..'
  : '';

const filePathForTypescriptConfig = path.resolve(
  path.dirname(__filename),
  basePath,
  'templates/sites/config',
  getConfigTemplateByTypeName('Typescript'),
);

const filePathForJavascriptConfig = path.resolve(
  path.dirname(__filename),
  basePath,
  'templates/sites/config',
  getConfigTemplateByTypeName('Javascript'),
);

export const saveConfiguration = async ({
  config,
  format,
}: SaveConfigurationArgs): Promise<ConfigFilePath | undefined> => {
  const formattedOutput = (() => {
    try {
      if (!Array.isArray(config.sites) || !config.sites[0].slug) throw Error();
      return JSON.stringify(config, undefined, 2);
    } catch (err) {
      throw new InvalidJSONFormat();
    }
  })();

  if (!isValidFleekConfigFormat(format)) {
    throw new ExpectedOneOfValuesError({
      expectedValues: Object.values(FleekSiteConfigFormats),
      receivedValue: format,
    });
  }

  let content: string;
  let configFile: ConfigFilePath;

  switch (format) {
    case FleekSiteConfigFormats.Typescript: {
      const contentForTypescriptConfig = (
        await fs.readFile(filePathForTypescriptConfig)
      ).toString();
      content = contentForTypescriptConfig.replace(
        FLEEK_CONFIG_TMPL_JSON_PLACEHOLDER,
        formattedOutput,
      );
      configFile = getConfigFileByTypeName('Typescript');
      break;
    }
    case FleekSiteConfigFormats.Javascript: {
      const contentForJavascriptConfig = (
        await fs.readFile(filePathForJavascriptConfig)
      ).toString();
      content = contentForJavascriptConfig.replace(
        FLEEK_CONFIG_TMPL_JSON_PLACEHOLDER,
        formattedOutput,
      );
      configFile = getConfigFileByTypeName('Javascript');
      break;
    }
    case FleekSiteConfigFormats.JSON: {
      content = formattedOutput;
      configFile = getConfigFileByTypeName('JSON');
      break;
    }
  }

  try {
    await fs.writeFile(configFile, content);
    return configFile;
  } catch (_err) {
    // TODO: write to system log file, see PLAT-1097
  }
};
