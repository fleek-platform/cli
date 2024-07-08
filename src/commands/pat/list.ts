import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';

export const listPersonalAccessTokensAction: SdkGuardedFunction = async ({
  sdk,
}) => {
  const personalAccessTokens = await sdk.user().listPersonalAccessTokens();

  if (personalAccessTokens.length === 0) {
    output.warn(t('noYYet', { name: t('personalAccessToken') }));

    return;
  }

  output.table(
    personalAccessTokens.map(({ id, createdAt, name, maskedToken }) => ({
      ID: id,
      'Created At': createdAt,
      Name: name ?? '',
      Token: maskedToken,
    })),
  );
};

export const listPersonalAccessTokensActionHandler = withGuards(
  listPersonalAccessTokensAction,
  {
    scopes: {
      authenticated: true,
      project: false,
      site: false,
    },
  },
);
