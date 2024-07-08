import { DomainHostnameInvalidError } from '@fleek-platform/errors';
import { isHostnameValid } from '@fleek-platform/utils-validation';

import { textPrompt } from '../../../prompts/textPrompt';
import { t } from '../../../utils/translation';

type GetHostnameOrPromptArgs = {
  hostname?: string;
};

export const getHostnameOrPrompt = async ({
  hostname,
}: GetHostnameOrPromptArgs) => {
  if (hostname && isHostnameValid({ hostname })) {
    return hostname;
  }

  if (hostname && !isHostnameValid({ hostname })) {
    throw new DomainHostnameInvalidError({ hostname });
  }

  return textPrompt({
    message: `${t('enterDomainName')}:`,
    validate: (partialHostname) =>
      isHostnameValid({ hostname: partialHostname }) ||
      t('hostnameIncorrectForm'),
  });
};
