import type { Command } from 'commander';

import { t } from '../../utils/translation';
import { createActionHandler } from './create';
import { deleteActionHandler } from './delete';
import { listActionHandler } from './list';
import { publishActionHandler } from './publish';
import { resolveActionHandler } from './resolve';

export default (program: Command) => {
  const cmd = program
    .command('ipns')
    .option('-h, --help', 'Print help')
    .description(t('ipnsDescription'))
    .addHelpCommand();

  cmd
    .command('create')
    .description(t('ipnsCreateDescription'))
    .option(
      '--siteSlug <string>',
      t('commonIdentifierXAssignedToSubjectY', {
        name: 'humanReadableSlugDesc',
        subject: t('ipnsRecord'),
      }),
    )
    .option(
      '--siteId <string>',
      t('commonIdentifierXAssignedToSubjectY', {
        name: t('uniqueIdentifier'),
        subject: t('ipnsRecord'),
      }),
    )
    .action((options: { siteId?: string; siteSlug?: string }) =>
      createActionHandler(options),
    )
    .addHelpCommand();

  cmd
    .command('publish')
    .description(t('ipnsPublishDescription'))
    .option('--name <string>', t('ipnsPublishOptionNameDesc'))
    .option('--hash <string>', t('ipnsPublishOptionHashDesc'))
    .action((options: { name: string; hash: string }) =>
      publishActionHandler(options),
    )
    .addHelpCommand();

  cmd
    .command('list')
    .description(t('ipnsListDescription'))
    .action(() => listActionHandler())
    .addHelpCommand();

  cmd
    .command('delete')
    .description(t('ipnsDeleteDescription'))
    .option(
      '--name <string>',
      t('commonNameOfSubjectToAction', {
        name: t('name'),
        subject: t('ipnsRecord'),
        action: t('delete'),
      }),
    )
    .action((options: { name: string }) => deleteActionHandler(options))
    .addHelpCommand();

  cmd
    .command('resolve')
    .description(t('ipnsResolveDescription'))
    .argument('<name>', t('ipnsResolveArgName'))
    .action((name: string) => resolveActionHandler({ name }))
    .addHelpCommand();

  cmd
    .command('help')
    .description(t('printHelp'))
    .action(() => cmd.help());
};
