import type { Client } from '@fleek-platform/sdk';

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
          createPersonalAccessTokenFromVerificationSession: [
            { where: { id: verificationSessionId }, data: { name } },
          ],
        })
        .catch(() => null);

      return response?.createPersonalAccessTokenFromVerificationSession ?? null;
    },
    period: 2_000,
    tries: 500,
  });
