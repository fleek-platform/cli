import { ProjectInvalidNameError } from '@fleek-platform/errors';
import { isProjectNameValid } from '@fleek-platform/utils-validation';

import { textPrompt } from '../../../prompts/textPrompt';
import { t } from '../../../utils/translation';

type GetProjectNameOrPromptArgs = {
  name?: string;
};

export const getProjectNameOrPrompt = async ({
  name,
}: GetProjectNameOrPromptArgs) => {
  if (name && isProjectNameValid({ name })) {
    return name;
  }

  if (name && !isProjectNameValid({ name })) {
    throw new ProjectInvalidNameError({ name });
  }

  return textPrompt({
    message: `${t('enterProjectName')}:`,
    validate: (partialName) =>
      isProjectNameValid({ name: partialName }) ||
      t('mustHaveXandYValidChars', { min: '3', max: '30' }),
  });
};
