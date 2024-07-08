import { createClient } from '@fleek-platform/sdk';

import { output } from '../../cli';
import { getPersonalAccessTokenNameOrPrompt } from '../../utils/prompts/getPersonalAccessTokenNameOrPrompt';
import { generateVerificationSessionId } from '../../utils/token/generateVerificationSessionId';
import { showVerificationSessionLink } from '../../utils/token/showVerificationSessionLink';
import { waitForPersonalAccessTokenFromVerificationSession } from '../../utils/token/waitForPersonalAccessTokenFromVerificationSession';
import { t } from '../../utils/translation';

type CreatePersonalAccessTokenActionHandlerArgs = {
  name?: string;
  uiAppUrl: string;
  authApiUrl: string;
};

export const createPersonalAccessTokenActionHandler = async ({
  uiAppUrl,
  authApiUrl,
  ...args
}: CreatePersonalAccessTokenActionHandlerArgs) => {
  const verificationSessionId = generateVerificationSessionId();

  const name = await getPersonalAccessTokenNameOrPrompt({
    name: args?.name,
  });
  output.printNewLine();
  showVerificationSessionLink({ output, uiAppUrl, verificationSessionId });

  const personalAccessToken =
    await waitForPersonalAccessTokenFromVerificationSession({
      verificationSessionId,
      client: createClient({ url: authApiUrl }),
      name,
    });

  if (!personalAccessToken) {
    output.error(t('patFetchTimeout'));

    return;
  }

  output.success(
    t('newPatIs', { pat: output.textColor(personalAccessToken, 'redBright') }),
  );
};
