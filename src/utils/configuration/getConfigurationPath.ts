import { FleekConfigMissingFileError } from '@fleek-platform/errors';
import { constants, promises as fs } from 'fs';
import { join as joinPath } from 'path';

type GetConfigurationPathArgs = {
  predefinedConfigPath?: string;
};

export const getConfigurationPath = async ({ predefinedConfigPath }: GetConfigurationPathArgs) => {
  if (predefinedConfigPath) {
    const absolutePath = joinPath(process.cwd(), predefinedConfigPath);

    return fs
      .access(absolutePath, constants.R_OK)
      .then(() => absolutePath)
      .catch(() => Promise.reject(new FleekConfigMissingFileError({ configPath: predefinedConfigPath })));
  }

  // Sorted by priority, we return only the first match
  const supposedFilenames = ['fleek.config.ts', 'fleek.config.js', 'fleek.config.json'];

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
