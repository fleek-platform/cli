import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';
import { createOutputTable } from './utils/CreateOutputTable';

export const listStorageAction: SdkGuardedFunction<
  Record<string, never>
> = async ({ sdk }) => {
  const storage = await sdk.storage().list();

  if (!storage?.length) {
    output.warn(t('storageListNotFound'));
    output.log(t('storageAddSuggestion'));
    output.log('fleek storage add <file_path>');

    return;
  }

  const table = await createOutputTable({ sdk, storage });
  output.table(table);
};

export const listStorageActionHandler = withGuards(listStorageAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});
