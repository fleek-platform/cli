import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';
import { getEnsRecordOrPrompt } from './prompts/getEnsRecordOrPrompt';

export type DetailEnsRecordsActionArgs = {
  id?: string;
  name?: string;
};

export const detailEnsRecordsAction: SdkGuardedFunction<
  DetailEnsRecordsActionArgs
> = async ({ sdk, args }) => {
  const ensRecord = await getEnsRecordOrPrompt({
    id: args.id,
    name: args.name,
    sdk,
  });

  if (!ensRecord) {
    output.error(t('expectedNotFoundGeneric', { name: 'ENS Record' }));

    return;
  }

  output.table([
    {
      ENS: ensRecord.name,
      Status: ensRecord.status,
      'Created At': ensRecord.createdAt,
    },
  ]);

  output.log(`${t('ensConfigAsTable')}:`);

  output.table([
    {
      Name: 'Content Hash',
      Value: `ipns://${ensRecord.ipnsRecord.name}`,
    },
  ]);
};

export const detailEnsRecordsActionHandler = withGuards(
  detailEnsRecordsAction,
  {
    scopes: {
      authenticated: true,
      project: true,
      site: false,
    },
  },
);
