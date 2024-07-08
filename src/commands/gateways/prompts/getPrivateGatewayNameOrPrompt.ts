import { PrivateGatewayNameInvalidError } from '@fleek-platform/errors';
import { isPrivateGatewayNameValid } from '@fleek-platform/utils-validation';

import { textPrompt } from '../../../prompts/textPrompt';
import { t } from '../../../utils/translation';

type GetPrivateGatewayNameOrPromptArgs = {
  name?: string;
};

export const getPrivateGatewayNameOrPrompt = async ({
  name,
}: GetPrivateGatewayNameOrPromptArgs) => {
  if (name && isPrivateGatewayNameValid({ name })) {
    return name;
  }

  if (name && !isPrivateGatewayNameValid({ name })) {
    throw new PrivateGatewayNameInvalidError({ name });
  }

  return textPrompt({
    message: t('gatewayEnterName'),
    validate: (partialName: string) =>
      isPrivateGatewayNameValid({ name: partialName }) ||
      t('gatewayNameIncorrectForm'),
  });
};
