import { FleekConfigInvalidContentError } from '@fleek-platform/errors';
import { validateConfigurationWithResult } from '@fleek-platform/utils-validation';

import { readConfigurationFile } from './readConfigurationFile';
import type { FleekRootConfig } from './types';

type LoadConfigurationArgs = {
  predefinedConfigPath?: string;
};

export const loadConfiguration = async ({
  predefinedConfigPath,
}: LoadConfigurationArgs): Promise<FleekRootConfig> => {
  const { configuration, configPath } = await readConfigurationFile({
    predefinedConfigPath,
  });

  return validateConfigurationWithResult({ configuration }).catch(
    (error: Error) =>
      Promise.reject(
        new FleekConfigInvalidContentError({
          configPath,
          validationResult: error.message,
        }),
      ),
  );
};
