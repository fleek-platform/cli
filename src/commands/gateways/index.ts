import type { Command } from 'commander';

import { t } from '../../utils/translation';
import { createPrivateGatewayActionHandler } from './create';
import { deletePrivateGatewayActionHandler } from './delete';
import { detailPrivateGatewayActionHandler } from './detail';
import { listPrivateGatewaysActionHandler } from './list';

export default (program: Command) => {
  const cmd = program
    .command('gateways')
    .option('-h', '--help', t('printHelp'))
    .description(t('gatewaysCmdDescription'));

  cmd
    .command('list')
    .description(t('listAllPrvGwForSelectProject'))
    .action(() => listPrivateGatewaysActionHandler());

  cmd
    .command('detail')
    .option(
      '--id <string>',
      t('nameOfSubjectForDetails', {
        name: t('id'),
        subject: t('privateGateway'),
      }),
    )
    .option(
      '--slug <string>',
      t('nameOfSubjectForDetails', {
        name: t('sdkPoweredApp'),
        subject: t('privateGateway'),
      }),
    )
    .description(t('gatewayShowDetails'))
    .action((options: { id?: string; slug?: string }) =>
      detailPrivateGatewayActionHandler(options),
    );

  cmd
    .command('create')
    .option('--name <string>', t('gatewayCreateName'))
    .description(t('gatewayCreateCmdDesc'))
    .action((options: { name?: string }) =>
      createPrivateGatewayActionHandler(options),
    );

  cmd
    .command('delete')
    .option(
      '--id <string>',
      t('commonNameOfSubjectToAction', {
        name: t('id'),
        subject: t('privateGateway'),
        action: t('delete'),
      }),
    )
    .option(
      '--slug <string>',
      t('commonNameOfSubjectToAction', {
        name: t('humanReadableSlugDesc'),
        subject: t('privateGateway'),
        action: t('delete'),
      }),
    )
    .description(t('gatewayDelete'))
    .action((options: { id?: string; slug?: string }) =>
      deletePrivateGatewayActionHandler(options),
    );

  cmd.command('help').description(t('printHelp'));
};
