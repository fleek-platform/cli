import { output } from '../../cli';
import { config } from '../../config';
import { sdkGuard } from '../../guards/sdkGuard';
import type { SdkGuardedFunction } from '../../guards/types';
import { t } from '../../utils/translation';
import { createProjectActionHandler } from './create';
import { getProjectOrPrompt } from './prompts/getProjectOrPrompt';

type SwitchProjectActionArgs = {
  id?: string;
};

export const switchProjectAction: SdkGuardedFunction<
  SwitchProjectActionArgs
> = async ({ sdk, args }) => {
  const project = await getProjectOrPrompt({ sdk, id: args.id }).catch(
    () => null,
  );

  if (project === null) {
    output.log(t('projectsSwitchNeedCreateFirst'));
    await createProjectActionHandler();

    return;
  }

  if (!project) {
    output.log(t('noProjectIdFoundUnexpectedly'));

    return;
  }

  config.projectId.set(project.id);

  output.printNewLine();
  output.success(t('projectsSwitchSuccess', { name: project.name }));
  output.printNewLine();
};

export const switchProjectActionHandler = sdkGuard(switchProjectAction);
