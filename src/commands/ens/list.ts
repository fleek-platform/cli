import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';
import { getSiteEnsRecords } from './utils/getSiteEnsRecords';

export type ListEnsRecordsActionArgs = {
  siteId?: string;
};

export const listEnsRecordsAction: SdkGuardedFunction<
  ListEnsRecordsActionArgs
> = async ({ sdk, args }) => {
  const ensRecords = args.siteId
    ? await getSiteEnsRecords({ site: { id: args.siteId }, sdk })
    : await sdk.ens().list();

  if (ensRecords.length === 0) {
    output.log(t('noENSNames'));

    return;
  }

  output.table(
    ensRecords.map(({ name, createdAt, status }) => ({
      ENS: name,
      Status: status,
      'Created At': createdAt,
    })),
  );
};

export const listEnsRecordsActionHandler = withGuards(listEnsRecordsAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});
