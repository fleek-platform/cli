import { join as joinPath } from 'node:path';

import { output } from '../../../cli';
import { textPrompt } from '../../../prompts/textPrompt';
import { t } from '../../../utils/translation';
import { directoryExists } from '../utils/directoryExists';

type EnterDirectoryPathPromptArgs = { message: string };

export const enterDirectoryPathPrompt = async ({
  message,
}: EnterDirectoryPathPromptArgs): Promise<string> => {
  const path = await textPrompt({
    message,
    validate: async (path) => {
      if (!path) {
        return t('specifyValidDir');
      }

      const isDirectory = await directoryExists(joinPath(process.cwd(), path));

      return isDirectory ? true : t('specifyValidDir');
    },
    onCancel: () => {
      output.warn(t('specifyValidDir'));
      output.error(t('exiting'));
    },
  });

  return path;
};
