import type { Command } from 'commander';

import { t } from '../../utils/translation';
import { createEnsActionHandler } from './create';
import { deleteEnsActionHandler } from './delete';
import { detailEnsRecordsActionHandler } from './detail';
import { listEnsRecordsActionHandler } from './list';
import { verifyEnsRecordActionHandler } from './verify';

export default (program: Command) => {
  const cmd = program
    .command('ens')
    .option('-h, --help', t('printHelp'))
    .description(t('ensCmdDescription'))
    .addHelpCommand();

  cmd
    .command('create')
    .option('--siteId <string>', t('siteIdOf'))
    .option('--siteSlug <string>', t('siteSlugOf'))
    .option('--name <string>', t('ensCreateName'))
    .option('--ipnsName <string>', t('ensIPNSNameToLink'))
    .description(t('ensCreateRecord'))
    .action(
      (options: {
        siteId?: string;
        siteSlug?: string;
        name?: string;
        ipns?: string;
      }) => createEnsActionHandler(options),
    )
    .addHelpCommand();

  cmd
    .command('detail')
    .option(
      '--id <string>',
      t('nameOfSubjectForDetails', { name: t('id'), subject: t('ens') }),
    )
    .option(
      '--name <string>',
      t('nameOfSubjectForDetails', { name: t('name'), subject: t('ens') }),
    )
    .description(t('ensShowDetails'))
    .action((options: { id?: string; name?: string }) =>
      detailEnsRecordsActionHandler(options),
    )
    .addHelpCommand();

  cmd
    .command('list')
    .option('--siteId <string>', t('siteIdOf'))
    .description(t('ensListAllForProject'))
    .action((options: { siteId?: string }) =>
      listEnsRecordsActionHandler(options),
    )
    .addHelpCommand();

  cmd
    .command('delete')
    .option(
      '--id <string>',
      t('commonNameOfSubjectToAction', {
        name: t('id'),
        subject: t('ens'),
        action: t('delete'),
      }),
    )
    .option(
      '--name <string>',
      t('commonNameOfSubjectToAction', {
        name: t('name'),
        subject: t('ens'),
        action: t('delete'),
      }),
    )
    .description(t('ensDelete'))
    .action((options: { id?: string; name?: string }) =>
      deleteEnsActionHandler(options),
    )
    .addHelpCommand();

  cmd
    .command('verify')
    .option(
      '--id <string>',
      t('commonNameOfSubjectToAction', {
        name: t('id'),
        subject: t('ens'),
        action: t('verify'),
      }),
    )
    .option(
      '--name <string>',
      t('commonNameOfSubjectToAction', {
        name: t('name'),
        subject: t('ens'),
        action: t('verify'),
      }),
    )
    .description(t('ensVerifyIsConfig'))
    .action((options: { id?: string; name?: string }) =>
      verifyEnsRecordActionHandler(options),
    )
    .addHelpCommand();

  cmd.command('help').description(t('printHelp'));
};
