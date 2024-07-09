// TODO: rename this filename, fix typoe congifuration -> configuration
import type { FleekSdk } from '@fleek-platform/sdk';

import { saveConfiguration } from '../../../utils/configuration/saveConfiguration';
import type { FleekRootConfig } from '../../../utils/configuration/types';
import { t } from '../../../utils/translation';
import { enterDirectoryPathPrompt } from '../prompts/enterDirectoryPathPrompt';
import { selectConfigurationFormatPrompt } from '../prompts/selectConfigurationFormatPrompt';
import { chooseOrCreateSite } from './chooseOrCreateSite';
import { selectBuildCommandOrSkip } from './selectBuildCommandOrSkip';

type InitConfigurationArgs = {
  sdk: FleekSdk;
};

export const initConfiguration = async ({ sdk }: InitConfigurationArgs) => {
  const site = await chooseOrCreateSite({ sdk });

  if (!site) {
    // TODO: Revise the initConfiguration
    console.error('Unexpected error');

    return;
  }

  const distDir = await enterDirectoryPathPrompt({
    message: t('specifyDistDirToSiteUpl'),
  });

  const buildCommand = await selectBuildCommandOrSkip();

  const config = {
    sites: [{ slug: site.slug, distDir, buildCommand }],
  } satisfies FleekRootConfig;

  const format = await selectConfigurationFormatPrompt();

  await saveConfiguration({ config, format });

  return config;
};
