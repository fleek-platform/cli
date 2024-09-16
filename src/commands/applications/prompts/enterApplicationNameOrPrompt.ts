import { ApplicationNameInvalidError } from '@fleek-platform/errors';
import type { Application } from '@fleek-platform/sdk';

import { textPrompt } from '../../../prompts/textPrompt';
import { t } from '../../../utils/translation';
import { isNameValid } from '../utils/isNameValid';

type EnterApplicationNameOrPromptArgs = {
  name?: string;
  application?: Pick<Application, 'name'>;
};

export const enterApplicationNameOrPrompt = async (
  args: EnterApplicationNameOrPromptArgs,
): Promise<string> => {
  if (args.name && isNameValid({ name: args.name })) {
    return args.name;
  }

  if (args.name && !isNameValid({ name: args.name })) {
    throw new ApplicationNameInvalidError({ name: args.name });
  }

  return textPrompt({
    message: `${t('typeAppName')}:`,
    validate: (name) =>
      isNameValid({ name })
        ? true
        : t('invalidNameUseXofYAndRegex', {
            min: '3',
            max: '30',
          }),
    initial: args.application?.name,
  });
};
