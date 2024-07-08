import { output } from '../cli';
import { switchProjectAction } from '../commands/projects/switch';
import { config } from '../config';
import { t } from '../utils/translation';
import { sdkGuard } from './sdkGuard';

export const projectGuard = async () => {
  const projectId = config.projectId.get();

  if (projectId) {
    return;
  }

  output.warn(t('projectSelectRequiredStarPrjFlow'));
  output.printNewLine();

  await sdkGuard(switchProjectAction)();
};
