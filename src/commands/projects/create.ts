import { output } from '../../cli';
import { config } from '../../config';
import { sdkGuard } from '../../guards/sdkGuard';
import type { SdkGuardedFunction } from '../../guards/types';
import { t } from '../../utils/translation';
import { getProjectNameOrPrompt } from './prompts/getProjectNameOrPrompt';

type CreateProjectActionArgs = {
  name?: string;
};

export const createProjectAction: SdkGuardedFunction<
  CreateProjectActionArgs
> = async ({ sdk, args }) => {
  const name = await getProjectNameOrPrompt({ name: args.name });

  output.spinner(`${t('projectCreating')}...`);

  const response = await sdk.projects().create({ name });

  config.projectId.set(response.id);

  output.printNewLine();
  output.success(
    t('projectCreatedAndSwitched', { name, projectId: response.id }),
  );
  output.printNewLine();
};

export const createProjectActionHandler = sdkGuard(createProjectAction);
