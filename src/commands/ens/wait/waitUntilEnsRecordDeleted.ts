import type { EnsRecord, FleekSdk } from '@fleek-platform/sdk/node';

import { checkPeriodicallyUntil } from '../../../utils/checkPeriodicallyUntil';

type WaitUntilEnsRecordDeletedArgs = {
  ensRecord: EnsRecord;
  sdk: FleekSdk;
};

export const waitUntilEnsRecordDeleted = async ({
  ensRecord,
  sdk,
}: WaitUntilEnsRecordDeletedArgs): Promise<boolean> => {
  return checkPeriodicallyUntil({
    conditionFn: async () =>
      sdk
        .ens()
        .get({ id: ensRecord.id })
        .then(() => false)
        .catch(() => true),
    period: 6_000,
    tries: 10,
  });
};
