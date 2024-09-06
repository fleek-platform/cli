import { createClient } from '@fleek-platform/sdk/node';

import { output } from '../../cli';
import { config } from '../../config';
import { generateVerificationSessionId } from '../../utils/token/generateVerificationSessionId';
import { showVerificationSessionLink } from '../../utils/token/showVerificationSessionLink';
import { waitForPersonalAccessTokenFromVerificationSession } from '../../utils/token/waitForPersonalAccessTokenFromVerificationSession';
import { t } from '../../utils/translation';

type LoginActionHandlerArgs = {
  uiAppUrl: string;
  authApiUrl: string;
};

export const loginActionHandler = async ({
  uiAppUrl,
  authApiUrl,
}: LoginActionHandlerArgs) => {
  const verificationSessionId = generateVerificationSessionId();

  showVerificationSessionLink({ output, uiAppUrl, verificationSessionId });

  const client = createClient({ url: authApiUrl });
  const personalAccessToken =
    await waitForPersonalAccessTokenFromVerificationSession({
      verificationSessionId,
      client,
    });

  if (!personalAccessToken) {
    output.error(t('timeoutPATfetch'));
    output.printNewLine();

    return;
  }

  config.personalAccessToken.set(personalAccessToken);
  config.projectId.clear();
  output.success(t('logged', { status: t('loggedInTo') }));
  output.printNewLine();
};
