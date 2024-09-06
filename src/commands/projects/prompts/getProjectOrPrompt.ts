import { ProjectsNotFoundError } from '@fleek-platform/errors';
import type { FleekSdk, Project } from '@fleek-platform/sdk/node';

import { selectPrompt } from '../../../prompts/selectPrompt';
import { t } from '../../../utils/translation';

type GetProjectOrPromptArgs = {
  sdk: FleekSdk;
  id?: string;
};

export const getProjectOrPrompt = async ({
  sdk,
  id,
}: GetProjectOrPromptArgs): Promise<Project | undefined> => {
  if (id) {
    return await sdk.projects().get({ id });
  }

  const projects = await sdk.projects().list();

  if (projects.length === 0) {
    throw new ProjectsNotFoundError();
  }

  const projectId = await selectPrompt({
    message: `${t('commonSelectXFromList', { subject: t('aProject') })}:`,
    choices: projects.map((project) => ({
      title: project.name,
      value: project.id,
    })),
  });

  const matchProject = projects.find((project) => project.id === projectId);

  if (!matchProject) return;

  return matchProject;
};
