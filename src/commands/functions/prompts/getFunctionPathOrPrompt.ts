import { FleekFunctionPathNotValidError } from '@fleek-platform/errors';
import {
  isFunctionPathValid,
  isValidFolder,
} from '@fleek-platform/utils-validation';

import { textPrompt } from '../../../prompts/textPrompt';
import { t } from '../../../utils/translation';

type GetFunctionPathOrPromptArgs = {
  path?: string;
};

const isValidPath = async (path: string) =>
  await isFunctionPathValid({ fileOrFolderPath: path });

export const getFunctionPathOrPrompt = async ({
  path,
}: GetFunctionPathOrPromptArgs): Promise<string> => {
  let result = path;

  if (!result) {
    const p = await textPrompt({
      message: t('typeFunctionCodePath'),
      validate: (path) =>
        isFunctionPathValid({ fileOrFolderPath: path }) ||
        t('filePathValidWarning'),
    });

    result = p;
  }

  const hasValidPath = await isValidPath(result);

  if (!hasValidPath) {
    throw new FleekFunctionPathNotValidError({ path: result });
  }

  const isFolder = await isValidFolder(result);

  if (isFolder) {
    return `${result}/index.js`;
  }

  return result;
};
