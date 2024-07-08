import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';
import { getSiteDomains } from './utils/getSiteDomains';

export type ListDomainsActionArgs = {
  siteId?: string;
};

export const listDomainsAction: SdkGuardedFunction<
  ListDomainsActionArgs
> = async ({ sdk, args }) => {
  const domains = args.siteId
    ? await getSiteDomains({ siteId: args.siteId, sdk })
    : await sdk.domains().list();

  if (domains.length === 0) {
    output.mistake(t('noDomainsAssocFound'));

    return;
  }

  output.table(
    domains.map(({ hostname, createdAt, status }) => ({
      Hostname: hostname,
      'Created At': createdAt,
      Status: status,
    })),
  );
};

export const listDomainsActionHandler = withGuards(listDomainsAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});
