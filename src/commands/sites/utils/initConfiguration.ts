import type { Site } from '@fleek-platform/sdk';

import { saveConfiguration } from '../../../utils/configuration/saveConfiguration';
import type { FleekRootConfig } from '../../../utils/configuration/types';
import { t } from '../../../utils/translation';
import { enterDirectoryPathPrompt } from '../prompts/enterDirectoryPathPrompt';
import { selectConfigurationFormatPrompt } from '../prompts/selectConfigurationFormatPrompt';
import { selectBuildCommandOrSkip } from './selectBuildCommandOrSkip';
import { isValidFleekConfigFormat } from '../../../utils/formats';
import { fileExists } from '../../../utils/fs';

type InitConfigurationArgs = {
  site: Site;
  onUnexpectedFormatError: (format: string) => void;
  onSaveConfigurationError: () => void;
};

export const initConfiguration = async ({
  site,
  onUnexpectedFormatError,
  onSaveConfigurationError,
}: InitConfigurationArgs) => {
  const distDir = await enterDirectoryPathPrompt({
    message: t('specifyDistDirToSiteUpl'),
  });

  const buildCommand = await selectBuildCommandOrSkip();

  const config: FleekRootConfig = {
    sites: [{ slug: site.slug, distDir, buildCommand }],
  };

  const format = await selectConfigurationFormatPrompt();

  if (!isValidFleekConfigFormat(format)) {
    onUnexpectedFormatError(format);
  }

  const configFile = await saveConfiguration({ config, format });

  if (!configFile) {
    onSaveConfigurationError();

    return;
  }

  const isFile = await fileExists(configFile);

  if (!isFile) {
    onSaveConfigurationError();

    return;
  }

  return config;
};
