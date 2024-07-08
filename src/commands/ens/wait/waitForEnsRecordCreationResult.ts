import type { FleekSdk } from '@fleek-platform/sdk';

import { checkPeriodicallyUntil } from '../../../utils/checkPeriodicallyUntil';

type WaitForEnsRecordCreationResultArgs = {
  id: string;
  sdk: FleekSdk;
};

export const waitForEnsRecordCreationResult = async ({
  id,
  sdk,
}: WaitForEnsRecordCreationResultArgs) => {
  return checkPeriodicallyUntil({
    conditionFn: async () => {
      const ens = await sdk.ens().get({ id });

      return ens.status === 'CREATED' || null;
    },
    period: 6_000,
    tries: 10,
  });
};
