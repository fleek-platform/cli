import { confirmPrompt } from '../../../prompts/confirmPrompt';
import { t } from '../../../utils/translation';

export const confirmUseExistingSitePrompt = async (): Promise<boolean> =>
  confirmPrompt({
    message: t('foundSiteLinkToExisting'),
    initial: true,
  });
