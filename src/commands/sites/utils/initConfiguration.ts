import type { Site } from '@fleek-platform/sdk';

import { saveConfiguration } from '../../../utils/configuration/saveConfiguration';
import type { FleekRootConfig } from '../../../utils/configuration/types';
import { t } from '../../../utils/translation';
import { enterDirectoryPathPrompt } from '../prompts/enterDirectoryPathPrompt';
import { selectConfigurationFormatPrompt } from '../prompts/selectConfigurationFormatPrompt';
import { selectBuildCommandOrSkip } from './selectBuildCommandOrSkip';

type InitConfigurationArgs = {
  site: Site;
};

export const initConfiguration = async ({ site }: InitConfigurationArgs) => {
  const distDir = await enterDirectoryPathPrompt({
    message: t('specifyDistDirToSiteUpl'),
  });

  const buildCommand = await selectBuildCommandOrSkip();

  const config = {
    sites: [{ slug: site.slug, distDir, buildCommand }],
  } satisfies FleekRootConfig;

  const format = await selectConfigurationFormatPrompt();

  await saveConfiguration({ config, format });

  // TODO: assert configuration file's save

  return config;
};
