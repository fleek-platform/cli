import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { deletePersonalAccessToken } from './utils/deletePersonalAccessToken';

type DeletePersonalAccessTokenArgs = {
  personalAccessTokenId: string;
};

const deletePersonalAccessTokenAction: SdkGuardedFunction<
  DeletePersonalAccessTokenArgs
> = async ({ sdk, args }) => {
  await deletePersonalAccessToken({
    id: args.personalAccessTokenId,
    output,
    sdk,
  });
};

export const deletePersonalAccessTokenActionHandler = withGuards(
  deletePersonalAccessTokenAction,
  {
    scopes: {
      authenticated: true,
      project: false,
      site: false,
    },
  },
);
