import { confirmPrompt } from '../../../prompts/confirmPrompt';
import { t } from '../../../utils/translation';

type ConfirmInstallCommandPromptArgs = { installCommand: string };

export const confirmInstallCommandPrompt = async ({
  installCommand,
}: ConfirmInstallCommandPromptArgs) =>
  confirmPrompt({
    message: t('isGenInstallCmdCorrect', { installCommand }),
    initial: true,
  });
