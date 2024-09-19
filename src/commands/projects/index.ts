import type { Command } from 'commander';

import { t } from '../../utils/translation';
import { createProjectActionHandler } from './create';
import { listProjectsActionHandler } from './list';
import { switchProjectActionHandler } from './switch';

export default (program: Command) => {
  const cmd = program
    .command('projects')
    .option('-h, --help', t('printHelp'))
    .description(t('projectsDescription'))
    .addHelpCommand();

  cmd
    .command('list')
    .description(t('projectsListDesc'))
    .action(() => listProjectsActionHandler())
    .addHelpCommand();

  cmd
    .command('switch')
    .option('--id <string>', t('projectsSwitchOptId'))
    .description(t('projectsSwitchBetween'))
    .action((options: { id?: string }) => switchProjectActionHandler(options))
    .addHelpCommand();

  cmd
    .command('create')
    .option('--name <string>', t('projectsWhatNameOfProject'))
    .description(t('projectsCreateNewDesc'))
    .action((options: { name: string }) => createProjectActionHandler(options))
    .addHelpCommand();
};
