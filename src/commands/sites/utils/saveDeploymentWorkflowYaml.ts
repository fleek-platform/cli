import { promises as fs } from 'node:fs';
import chalk from 'chalk';

import type { Output } from '../../../output/Output';
import { t } from '../../../utils/translation';

type SaveDeploymentWorkflowYamlArgs = {
  yamlPath: string;
  yamlContent: string;
  projectId: string;
  personalAccessToken: string;
  output: Output;
};

export const saveDeploymentWorkflowYaml = async ({
  yamlContent,
  yamlPath,
  personalAccessToken,
  projectId,
  output,
}: SaveDeploymentWorkflowYamlArgs) => {
  try {
    await fs.writeFile(yamlPath, yamlContent);
    output.printNewLine();
    output.success(
      t('githubActionWrkflSavedTo', {
        path: chalk.underline(chalk.cyan(yamlPath)),
      }),
    );
    output.printNewLine();

    output.chore(`${t('setSecretsInGithugRepoSettings')}:`);
    output.table([
      {
        Name: 'FLEEK_TOKEN',
        Value: personalAccessToken,
      },
      {
        Name: 'FLEEK_PROJECT_ID',
        Value: projectId,
      },
    ]);

    output.printNewLine();
  } catch (e) {
    output.error(t('failSaveGenYaml', { yamlPath }));
  }
};
