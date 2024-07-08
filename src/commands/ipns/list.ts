import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';

const listAction: SdkGuardedFunction = async ({ sdk }) => {
  const records = await sdk.ipns().listRecords();

  if (records.length > 0) {
    return output.table(
      records.map((record) => ({
        Name: record.name,
        CID: record.hash,
        ID: record.id,
      })),
    );
  }

  return output.log(t('recordsNotFound'));
};

export const listActionHandler = withGuards(listAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});
