import type { Domain, FleekSdk } from '@fleek-platform/sdk/node';

import { checkPeriodicallyUntil } from '../../../utils/checkPeriodicallyUntil';

type WaitForDomainVerificationResultArgs = {
  domain: Domain;
  sdk: FleekSdk;
};

export const waitForDomainVerificationResult = async ({
  domain,
  sdk,
}: WaitForDomainVerificationResultArgs) => {
  return checkPeriodicallyUntil({
    conditionFn: async () => {
      const checkedDomain = await sdk.domains().get({ domainId: domain.id });

      return checkedDomain.status === 'ACTIVE' ||
        checkedDomain.status === 'VERIFYING_FAILED'
        ? checkedDomain.status
        : null;
    },
    period: 6_000,
    tries: 10,
  });
};
