import { promises as fs } from 'node:fs';

import type { Output } from '../../../output/Output';
import { t } from '../../../utils/translation';
import { directoryExists } from './directoryExists';

type InitializeDeploymentWorkflowDirectoryArgs = {
  output: Output;
  ghActionsWorflowsDirectory: string;
};

export const initializeDeploymentWorkflowDirectory = async ({
  output,
  ghActionsWorflowsDirectory,
}: InitializeDeploymentWorkflowDirectoryArgs) => {
  const exists = await directoryExists(ghActionsWorflowsDirectory);

  if (exists) {
    return;
  }

  output.warn(t('cantFindGithubWorkfl'));
  output.warn(t('creatingGithubWorkflDir'));
  await fs.mkdir(ghActionsWorflowsDirectory, { recursive: true });
};
