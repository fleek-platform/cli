import { constants, promises as fs } from 'node:fs';
import { join as joinPath } from 'node:path';
import { FleekConfigMissingFileError } from '@fleek-platform/errors';
import {
  type FleekSiteConfigFormatValue,
  FleekSiteConfigFormats,
} from './types';

type GetConfigurationPathArgs = {
  predefinedConfigPath?: string;
};

export const getConfigurationPath = async ({
  predefinedConfigPath,
}: GetConfigurationPathArgs) => {
  if (predefinedConfigPath) {
    const absolutePath = joinPath(process.cwd(), predefinedConfigPath);

    return fs
      .access(absolutePath, constants.R_OK)
      .then(() => absolutePath)
      .catch(() =>
        Promise.reject(
          new FleekConfigMissingFileError({ configPath: predefinedConfigPath }),
        ),
      );
  }

  // Sorted by priority, we return only the first match
  const supposedFilenames = [
    'fleek.config.ts',
    'fleek.config.js',
    'fleek.config.json',
  ];

  for (const supposedFilename of supposedFilenames) {
    const absolutePath = joinPath(process.cwd(), supposedFilename);

    const isSupposedFileAccessible = await fs
      .access(absolutePath, constants.R_OK)
      .then(() => true)
      .catch(() => false);

    if (isSupposedFileAccessible) {
      return absolutePath;
    }
  }

  throw new FleekConfigMissingFileError({});
};

const FLEEK_CONFIG_BASENAME = 'fleek.config';
export const FLEEK_CONFIG_TMPL_JSON_PLACEHOLDER = '$jsonContent';

export const getConfigFileByTypeName = (
  name: keyof typeof FleekSiteConfigFormats,
) => `${FLEEK_CONFIG_BASENAME}.${FleekSiteConfigFormats[name]}`;

export const getConfigFileByTypeValue = (val: FleekSiteConfigFormatValue) =>
  `${FLEEK_CONFIG_BASENAME}.${val}`;

export const getConfigTemplateByTypeName = (
  name: keyof typeof FleekSiteConfigFormats,
) => `${getConfigFileByTypeName(name)}.tmpl`;
