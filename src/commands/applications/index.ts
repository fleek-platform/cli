import type { Command } from 'commander';

import { t } from '../../utils/translation';
import { createApplicationActionHandler } from './create';
import { deleteApplicationActionHandler } from './delete';
import { listApplicationsActionHandler } from './list';
import { updateApplicationActionHandler } from './update';

export default (program: Command) => {
  const cmd = program
    .command('applications')
    .description(t('appCmdDescription'));

  cmd
    .command('list')
    .description(t('listAllAppForProject'))
    .action(listApplicationsActionHandler)
    .addHelpCommand();

  cmd
    .command('create')
    .option('--name <string>')
    .option('--whitelistDomains <string...>', t('whitelistDomainsSepBySp'))
    .description(t('createNewAppClient'))
    .action((options: { name?: string; whitelistDomains?: string[] }) =>
      createApplicationActionHandler(options),
    )
    .addHelpCommand();

  cmd
    .command('update')
    .option(
      '--id <string>',
      t('commonNameOfSubjectToAction', {
        name: t('clientId'),
        subject: t('sdkPoweredApp'),
        action: t('update'),
      }),
    )
    .option('--name <string>', t('newNameOfAppClient'))
    .option('--whitelistDomains <string...>', t('whitelistDomainsSepBySp'))
    .description(t('updateAppClient'))
    .action(
      (options: { id?: string; name?: string; whitelistDomains?: string[] }) =>
        updateApplicationActionHandler(options),
    )
    .addHelpCommand();

  cmd
    .command('delete')
    .description(t('deleteAppClient'))
    .option(
      '--id <string>',
      t('commonNameOfSubjectToAction', {
        name: t('clientId'),
        subject: t('sdkPoweredApp'),
        action: t('delete'),
      }),
    )
    .action((options: { id?: string }) =>
      deleteApplicationActionHandler(options),
    )
    .addHelpCommand();
};
