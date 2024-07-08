import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';
import { confirmDeleteRecordPrompt } from './prompts/confirmDeleteRecordPrompt';
import { getRecordOrPrompt } from './prompts/getRecordOrPrompt';

type DeleteActionArgs = {
  name?: string;
};

const deleteAction: SdkGuardedFunction<DeleteActionArgs> = async ({
  sdk,
  args,
}) => {
  const foundRecord = await getRecordOrPrompt({ sdk, name: args.name });

  if (!foundRecord) {
    output.error(t('expectedNotFoundGeneric', { name: 'record' }));

    return;
  }

  const shouldDeleteRecord = await confirmDeleteRecordPrompt();

  if (!shouldDeleteRecord) {
    return;
  }

  await sdk.ipns().deleteRecord({ id: foundRecord.id });

  output.printNewLine();
  output.success(
    t('commonItemActionSuccess', {
      subject: t('ipnsRecord'),
      action: t('deleted'),
    }),
  );
};

export const deleteActionHandler = withGuards(deleteAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});
