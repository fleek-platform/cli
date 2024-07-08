import { confirmPrompt } from '../../../prompts/confirmPrompt';
import { t } from '../../../utils/translation';

type ConfirmWorkflowCustomPathPromptArgs = { path: string };

export const confirmWorkflowCustomPathPrompt = async ({
  path,
}: ConfirmWorkflowCustomPathPromptArgs): Promise<boolean> =>
  confirmPrompt({
    message: t('workflowToBeSavePathOrOther', { path }),
    initial: false,
  });
