import type { FleekSdk, Site } from '@fleek-platform/sdk/node';

import { confirmPrompt } from '../../../prompts/confirmPrompt';
import { getSiteOrPrompt } from '../../sites/prompts/getSiteOrPrompt';

type GetSiteToAssignRecordOrPromptArgs = {
  sdk: FleekSdk;
  siteId?: string;
  siteSlug?: string;
};

export const getSiteToAssignRecordOrPrompt = async ({
  sdk,
  siteId,
  siteSlug,
}: GetSiteToAssignRecordOrPromptArgs): Promise<Site | undefined | null> => {
  if (!siteId && !siteSlug) {
    const shouldSiteAssignToRecord = await confirmPrompt({
      message: 'Do you want to assign new IPNS record to the site?',
      initial: false,
    });

    if (!shouldSiteAssignToRecord) {
      return null;
    }
  }

  return getSiteOrPrompt({ sdk, id: siteId, slug: siteSlug });
};
