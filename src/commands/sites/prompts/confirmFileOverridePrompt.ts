import { confirmPrompt } from '../../../prompts/confirmPrompt';
import { t } from '../../../utils/translation';

type ConfirmFileOverridePromptArgs = { path: string };

export const confirmFileOverridePrompt = async ({
  path,
}: ConfirmFileOverridePromptArgs): Promise<boolean> =>
  confirmPrompt({
    message: t('fileExistAskIfOverwrite', { path }),
    initial: true,
  });
