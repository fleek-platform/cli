import type { Site } from '@fleek-platform/sdk';

import { saveConfiguration } from '../../../utils/configuration/saveConfiguration';
import type { FleekRootConfig } from '../../../utils/configuration/types';
import { t } from '../../../utils/translation';
import { enterDirectoryPathPrompt } from '../prompts/enterDirectoryPathPrompt';
import { selectConfigurationFormatPrompt } from '../prompts/selectConfigurationFormatPrompt';
import { selectBuildCommandOrSkip } from './selectBuildCommandOrSkip';
import { FleekSiteConfigFormats } from '../../../utils/configuration/types';
import { fileExists } from '../../../utils/fs';

type InitConfigurationArgs = {
  site: Site;
  onUnexpectedFormat: (format: string) => void;
  onSaveConfiguration: () => void;
};

export const initConfiguration = async ({
  site,
  onUnexpectedFormat,
  onSaveConfiguration,
}: InitConfigurationArgs) => {
  const distDir = await enterDirectoryPathPrompt({
    message: t('specifyDistDirToSiteUpl'),
  });

  const buildCommand = await selectBuildCommandOrSkip();

  const config: FleekRootConfig = {
    sites: [{ slug: site.slug, distDir, buildCommand }],
  };

  const format = await selectConfigurationFormatPrompt();

  if (!Object.keys(FleekSiteConfigFormats).includes(format)) {
    onUnexpectedFormat(format);
  }

  const configFile = await saveConfiguration({ config, format });

  if (!configFile) {
    onSaveConfiguration();

    return;
  }

  const isFile = await fileExists(configFile);

  if (!isFile) {
    onSaveConfiguration();

    return;
  }

  return config;
};
