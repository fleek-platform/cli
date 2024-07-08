import { isFunctionNameValid } from '@fleek-platform/utils-validation';

import { textPrompt } from '../../../prompts/textPrompt';
import { t } from '../../../utils/translation';

export const enterFunctionNamePrompt = async (): Promise<string> =>
  textPrompt({
    message: `${t('typeNewFunctionName')}:`,
    validate: (partialName: string) =>
      isFunctionNameValid({ name: partialName }) || t('functionInvalidName'),
  });
