import type { Client } from '@fleek-platform/sdk/node';

import { checkPeriodicallyUntil } from '../checkPeriodicallyUntil';

type WaitForPersonalAccessTokenFromVerificationSessionArgs = {
  verificationSessionId: string;
  client: Client;
  name?: string;
};

export const waitForPersonalAccessTokenFromVerificationSession = async ({
  verificationSessionId,
  client,
  name,
}: WaitForPersonalAccessTokenFromVerificationSessionArgs): Promise<
  string | null
> =>
  checkPeriodicallyUntil({
    conditionFn: async () => {
      const response = await client
        .mutation({
          createPersonalAccessTokenFromVerificationSession: {
            __args: {
              where: {
                id: verificationSessionId,
              },
              data: {
                name,
                clientAppType: 'CLI',
              },
            },
          },
        })
        .catch(() => null);

      return response?.createPersonalAccessTokenFromVerificationSession ?? null;
    },
    period: 2_000,
    tries: 500,
  });
