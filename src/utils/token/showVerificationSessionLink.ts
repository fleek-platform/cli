import type { Output } from '../../output/Output';

import { t } from '../../utils/translation';

type ShowVerificationSessionLinkArgs = {
  output: Output;
  uiAppUrl: string;
  verificationSessionId: string;
};

export const getVerificationSessionLink = ({
  verificationSessionId,
  uiAppUrl,
}: { verificationSessionId: string; uiAppUrl: string }) =>
  `${uiAppUrl}/login/${verificationSessionId}`;

export const showVerificationSessionLink = ({
  output,
  uiAppUrl,
  verificationSessionId,
}: ShowVerificationSessionLinkArgs) => {
  const url = getVerificationSessionLink({
    uiAppUrl,
    verificationSessionId,
  });

  output.spinner(url);
  output.chore(t('followLinkToLogin'));
  output.link(url);
  output.printNewLine();
};
