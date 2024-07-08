import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';
import { getEnsRecordOrPrompt } from './prompts/getEnsRecordOrPrompt';
import { waitUntilEnsRecordDeleted } from './wait/waitUntilEnsRecordDeleted';

export type DeleteEnsRecordActionArgs = {
  id?: string;
  name?: string;
};

export const deleteEnsAction: SdkGuardedFunction<
  DeleteEnsRecordActionArgs
> = async ({ sdk, args }) => {
  const ensRecord = await getEnsRecordOrPrompt({
    id: args.id,
    name: args.name,
    sdk,
  });

  if (!ensRecord) {
    output.error(t('expectedNotFoundGeneric', { name: 'ENS record' }));

    return;
  }

  output.spinner(t('ensDeleting'));

  await sdk.ens().delete({ id: ensRecord.id });

  const isDeleted = await waitUntilEnsRecordDeleted({ sdk, ensRecord });

  if (!isDeleted) {
    output.error(t('ensCannotDelete', { ensRecordName: ensRecord.name }));

    return;
  }

  output.printNewLine();
  output.success(
    t('commonItemActionSuccess', {
      subject: `${t('ens')} "${ensRecord.name}"`,
      action: t('deleted'),
    }),
  );
};

export const deleteEnsActionHandler = withGuards(deleteEnsAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});
