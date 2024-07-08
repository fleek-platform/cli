import { SitesNotFoundError } from '@fleek-platform/errors';
import type { FleekSdk, Site } from '@fleek-platform/sdk';

import { selectPrompt } from '../../../prompts/selectPrompt';
import { t } from '../../../utils/translation';

type GetSiteOrPromptArgs = {
  id?: string;
  slug?: string;
  sdk: FleekSdk;
};

export const getSiteOrPrompt = async ({
  id,
  slug,
  sdk,
}: GetSiteOrPromptArgs): Promise<Site | undefined> => {
  if (id) {
    return sdk.sites().get({ id });
  }

  if (slug) {
    return sdk.sites().getBySlug({ slug });
  }

  const sites = await sdk.sites().list();

  if (!sites.length) {
    throw new SitesNotFoundError();
  }

  const selectedSiteId = await selectPrompt({
    message: t('commonSelectXFromList', { subject: t('site') }),
    choices: sites.map((site) => ({ title: site.name, value: site.id })),
  });

  const matchSite = sites.find((site) => site.id === selectedSiteId);

  if (!matchSite) return;

  return matchSite;
};
