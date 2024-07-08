import { output } from '../../cli';
import { config } from '../../config';
import { sdkGuard } from '../../guards/sdkGuard';
import type { SdkGuardedFunction } from '../../guards/types';
import { Icons } from '../../output/Output';
import { t } from '../../utils/translation';

export const listProjectsAction: SdkGuardedFunction<
  Record<string, never>
> = async ({ sdk }) => {
  const projects = await sdk.projects().list();

  if (projects.length === 0) {
    output.log(t('noYYet', { name: t('projects') }));

    return;
  }

  const currentProjectId = config.projectId.get();

  output.table(
    projects.map(({ id, name, createdAt }) => ({
      ID: id,
      Name: name,
      'Created At': createdAt,
      Current: currentProjectId === id ? Icons.Checkmark : '',
    })),
  );
};

export const listProjectsActionHandler = sdkGuard(listProjectsAction);
