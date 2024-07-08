import { confirmPrompt } from '../../../prompts/confirmPrompt';
import { t } from '../../../utils/translation';

export const confirmUserWantsToSpecifyInstallCommandPrompt = async () =>
  confirmPrompt({
    message: t('specifyinstallCmdOpt'),
    initial: true,
  });
