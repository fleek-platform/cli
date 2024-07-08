import type { DomainStatus } from '@fleek-platform/sdk';

import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';
import { getDomainOrPrompt } from './prompts/getDomainOrPrompt';

type DetailDomainActionOptions = {
  hostname?: string;
  id?: string;
};

const domainCreationPending: DomainStatus[] = ['CREATING', 'VERIFYING'];

const domainCreationFailed: DomainStatus[] = [
  'CREATING_FAILED',
  'VERIFYING_FAILED',
];

export const detailDomainAction: SdkGuardedFunction<
  DetailDomainActionOptions
> = async ({ sdk, args }) => {
  const domain = await getDomainOrPrompt({
    id: args.id,
    hostname: args.hostname,
    sdk,
  });

  if (!domain) {
    output.error(t('expectedNotFoundGeneric', { name: 'domain' }));

    return;
  }

  if (domainCreationPending.includes(domain.status)) {
    output.printNewLine();
    output.warn(t('domainCreationPending'));

    return;
  }

  if (domainCreationFailed.includes(domain.status)) {
    output.printNewLine();
    output.error(t('domainCreationFailed'));

    return;
  }

  output.table([
    {
      Hostname: domain.hostname,
      'Created At': domain.createdAt,
      Status: domain.status,
    },
  ]);

  output.log(`${t('configDomainAsTable')}:`);

  output.table(
    domain.dnsConfigs.map(
      (domain: {
        type: string;
        name: string;
        value: string;
      }) => ({
        Type: domain.type,
        Name: domain.name,
        Value: domain.value,
      }),
    ),
  );
};

export const detailDomainActionHandler = withGuards(detailDomainAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});
