import { textPrompt } from '../../../prompts/textPrompt';
import { t } from '../../../utils/translation';

// TODO: All these prompts should be transformed into a generic method
export const enterInstallCommandPrompt = async () =>
  textPrompt({
    message: `${t('specifyInstallCmd')}:`,
  });
