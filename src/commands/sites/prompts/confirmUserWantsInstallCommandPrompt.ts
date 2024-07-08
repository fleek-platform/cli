import { confirmPrompt } from '../../../prompts/confirmPrompt';
import { t } from '../../../utils/translation';

export const confirmUserWantsInstallCommandPrompt = async () =>
  confirmPrompt({
    message: t('runInstallCmdBeforeBuild'),
    initial: false,
  });
