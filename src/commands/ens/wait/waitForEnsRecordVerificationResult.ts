import type { FleekSdk } from '@fleek-platform/sdk';

import { checkPeriodicallyUntil } from '../../../utils/checkPeriodicallyUntil';

type WaitForEnsRecordVerificationResultArgs = {
  id: string;
  sdk: FleekSdk;
};

export const waitForEnsRecordVerificationResult = async ({
  id,
  sdk,
}: WaitForEnsRecordVerificationResultArgs) => {
  return checkPeriodicallyUntil({
    conditionFn: async () => {
      const checkedEns = await sdk.ens().get({ id });

      return checkedEns.status === 'ACTIVE' ||
        checkedEns.status === 'VERIFYING_FAILED'
        ? checkedEns.status
        : null;
    },
    period: 6_000,
    tries: 10,
  });
};
