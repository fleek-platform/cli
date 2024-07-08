import { join as joinPath } from 'node:path';

import { t } from '../../../utils/translation';
import { confirmWorkflowCustomPathPrompt } from '../prompts/confirmWorkflowCustomPathPrompt';
import { enterDirectoryPathPrompt } from '../prompts/enterDirectoryPathPrompt';
import {
  ghActionsDeploySitesYamlPath,
  ghWorkflowFilename,
} from './prepareGitHubActionsIntegration';

export const getDeploymentWorkflowYamlLocation = async (): Promise<string> => {
  const useCustomLocation = await confirmWorkflowCustomPathPrompt({
    path: ghActionsDeploySitesYamlPath,
  });

  if (useCustomLocation === false) {
    return ghActionsDeploySitesYamlPath;
  }

  const directory = await enterDirectoryPathPrompt({
    message: t('specifyDirToSaveWorkConf'),
  });
  const yamlPath = joinPath(directory, ghWorkflowFilename);

  return yamlPath;
};
