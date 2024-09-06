import { FleekFunctionsNotFoundError } from '@fleek-platform/errors';
import type { FleekFunction, FleekSdk } from '@fleek-platform/sdk/node';

import { selectPrompt } from '../../../prompts/selectPrompt';
import { t } from '../../../utils/translation';

type GetFunctionOrPromptArgs = {
  name?: string;
  sdk: FleekSdk;
};

export const getFunctionOrPrompt = async ({
  name,
  sdk,
}: GetFunctionOrPromptArgs): Promise<FleekFunction | undefined> => {
  if (name) {
    return sdk.functions().get({ name });
  }

  const functions = await sdk.functions().list();

  if (!functions.length) {
    throw new FleekFunctionsNotFoundError({});
  }

  const selectedFunctionId = await selectPrompt({
    message: t('commonSelectXFromList', { subject: t('function') }),
    choices: functions.map((f) => ({ title: f.name, value: f.id })),
  });

  const fnMatch = functions.find((f) => f.id === selectedFunctionId);

  if (!fnMatch) return;

  return fnMatch;
};
