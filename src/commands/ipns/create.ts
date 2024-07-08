import { getIpnsGatewayUrl } from '@fleek-platform/utils-ipns';

import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';
import { getSiteToAssignRecordOrPrompt } from './prompts/getSiteToAssignRecordOrPrompt';

type CreateActionArgs = {
  siteId?: string;
  siteSlug?: string;
};

const createAction: SdkGuardedFunction<CreateActionArgs> = async ({
  sdk,
  args,
}) => {
  const site = await getSiteToAssignRecordOrPrompt({
    sdk,
    siteId: args.siteId,
    siteSlug: args.siteSlug,
  });

  const record = site
    ? await sdk.ipns().createRecordForSite({ siteId: site.id })
    : await sdk.ipns().createRecord();

  output.printNewLine();
  output.success(t('ipnsCreatedIPNSHash', { hash: record.name }));
  output.printNewLine();

  if (site) {
    output.chore(t('ipnsRecordToPublishAuto', { name: site.name }));
  } else {
    output.hint(t('youCanDoXUsingFolCmd', { action: t('publishIPNSRecord') }));
    output.log(`fleek ipns publish --name ${record.name} --hash <ipfsCid>`);
    output.printNewLine();
  }

  output.hint(`${t('ipnsAfterPubRecordVisitGw')}:`);
  output.link(getIpnsGatewayUrl(record.name));
};

export const createActionHandler = withGuards(createAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});
