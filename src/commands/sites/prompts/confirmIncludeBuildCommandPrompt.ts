import { confirmPrompt } from '../../../prompts/confirmPrompt';
import { t } from '../../../utils/translation';

export const confirmIncludeBuildCommandPrompt = async (): Promise<boolean> =>
  confirmPrompt({
    message: t('includeOptBuildCmd', { build: 'build' }),
    initial: true,
  });
