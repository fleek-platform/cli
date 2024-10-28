import type { Command } from 'commander';

import { t } from '../../utils/translation';
import { ciActionHandler } from './ci';
import { deployActionHandler } from './deploy';
import { initActionHandler } from './init';
import { listActionHandler } from './list';
import { listDeploymentsActionHandler } from './listDeployments';

export default (program: Command): Command => {
  const cmd = program
    .command('sites')
    .option('-h, --help', t('printHelp'))
    .description(t('sitesDescription'));

  cmd
    .command('init')
    .description(t('sitesInitDescription'))
    .action(() => initActionHandler())
    .addHelpCommand();

  cmd
    .command('ci')
    .description(t('genConfForCIProviders'))
    .option('-c, --config <fleekConfigPath>', t('specifyFleekJsonPath'))
    .option('-p, --provider <provider>', t('specifyCIProvider'))
    .action((options: { config?: string; provider?: string }) =>
      ciActionHandler({
        predefinedConfigPath: options.config,
        provider: options.provider,
      }),
    )
    .addHelpCommand();

  cmd
    .command('deploy')
    .description(t('deploySite'))
    .option('-c, --config <fleekConfigPath>', t('deploySpecifyPathJson'))
    .action((options: { config?: string }) =>
      deployActionHandler({ predefinedConfigPath: options.config }),
    )
    .addHelpCommand();

  cmd
    .command('list')
    .description(t('listSitesDesc'))
    .action(() => listActionHandler())
    .addHelpCommand();

  cmd
    .command('deployments')
    .option(
      '--slug <string>',
      t('nameOfWichDeploymentsBelong', { name: t('humanReadableSlugDesc') }),
    )
    .option(
      '--id <string>',
      t('nameOfWichDeploymentsBelong', { name: t('uniqueIdentifier') }),
    )
    .description(t('deploymentsListForSelectedSite'))
    .action((options: { id?: string; slug?: string }) =>
      listDeploymentsActionHandler(options),
    )
    .addHelpCommand();

  return cmd;
};
