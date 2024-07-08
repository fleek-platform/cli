import { FleekFunctionNameNotValidError } from '@fleek-platform/errors';
import { isFunctionNameValid } from '@fleek-platform/utils-validation';

import { enterFunctionNamePrompt } from './enterFunctionNamePrompt';

type GetFunctionNameOrPromptArgs = {
  name?: string;
};

export const getFunctionNameOrPrompt = async ({
  name,
}: GetFunctionNameOrPromptArgs): Promise<string> => {
  if (name && isFunctionNameValid({ name })) {
    return name;
  }

  if (name && !isFunctionNameValid({ name })) {
    throw new FleekFunctionNameNotValidError({ name });
  }

  return enterFunctionNamePrompt();
};
