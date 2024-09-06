import type { FleekSdk, Site } from '@fleek-platform/sdk/node';

import { output } from '../../../cli';
import { t } from '../../../utils/translation';
import { confirmUseExistingSitePrompt } from '../prompts/confirmUseExistingSitePrompt';
import { getSiteOrPrompt } from '../prompts/getSiteOrPrompt';
import { createSite } from './createSite';

type ChooseOrCreateSiteArgs = { sdk: FleekSdk };

export const chooseOrCreateSite = async ({
  sdk,
}: ChooseOrCreateSiteArgs): Promise<Site | undefined> => {
  const sites = await sdk.sites().list();

  if (!sites.length) {
    output.warn(t('noSitesFound'));

    return createSite({ sdk });
  }

  const useExistingSite = await confirmUseExistingSitePrompt();

  if (useExistingSite) {
    const site = getSiteOrPrompt({ sdk });

    if (!site) {
      output.error(t('expectedNotFoundGeneric', { name: 'site' }));

      return;
    }

    return site;
  }

  return createSite({ sdk });
};
