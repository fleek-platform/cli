import type { FleekSdk } from '@fleek-platform/sdk';

import { checkPeriodicallyUntil } from '../../../utils/checkPeriodicallyUntil';

type WaitForDomainCreationResultArgs = {
  sdk: FleekSdk;
  hostname: string;
};

export const waitForDomainCreationResult = async ({
  hostname,
  sdk,
}: WaitForDomainCreationResultArgs) => {
  return checkPeriodicallyUntil({
    conditionFn: async () => {
      const domain = await sdk.domains().getByHostname({ hostname });

      return domain.status === 'CREATED' || domain.status === 'CREATING_FAILED'
        ? domain.status
        : null;
    },
    period: 6_000,
    tries: 10,
  });
};
