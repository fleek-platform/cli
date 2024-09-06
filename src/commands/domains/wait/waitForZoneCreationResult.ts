import type { FleekSdk, Zone } from '@fleek-platform/sdk/node';

import { checkPeriodicallyUntil } from '../../../utils/checkPeriodicallyUntil';

type WaitForZoneCreationResultArgs = {
  sdk: FleekSdk;
  zone: Pick<Zone, 'id'>;
};

export const waitForZoneCreationResult = async ({
  zone,
  sdk,
}: WaitForZoneCreationResultArgs) => {
  return checkPeriodicallyUntil({
    conditionFn: async () => {
      const checkedZone = await sdk.domains().getZone({ id: zone.id });

      return checkedZone.status === 'CREATED' ||
        checkedZone.status === 'CREATING_FAILED'
        ? checkedZone.status
        : null;
    },
    period: 6_000,
    tries: 10,
  });
};
