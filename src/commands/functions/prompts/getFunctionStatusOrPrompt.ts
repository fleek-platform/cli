import { FleekFunctionStatusNotValidError } from '@fleek-platform/errors';
import type { FleekFunctionStatus } from '@fleek-platform/sdk';
import { isFunctionStatusValid } from '@fleek-platform/utils-validation';

type GetFunctionStatusOrPromptArgs = {
  status?: string;
};

export const getFunctionStatusOrPrompt = async ({
  status,
}: GetFunctionStatusOrPromptArgs): Promise<FleekFunctionStatus> => {
  if (status && isFunctionStatusValid({ status })) {
    return status as FleekFunctionStatus;
  }

  throw new FleekFunctionStatusNotValidError({});
};
