import type { Command } from 'commander';

import { t } from '../../utils/translation';
import { createDomainActionHandler } from './create';
import { deleteDomainActionHandler } from './delete';
import { detailDomainActionHandler } from './detail';
import { listDomainsActionHandler } from './list';
import { verifyDomainActionHandler } from './verify';

export default (program: Command): Command => {
  const cmd = program
    .command('domains')
    .option('-h, --help', t('printHelp'))
    .description(t('domainsDesc'))
    .addHelpCommand();

  cmd
    .command('list')
    .option('--siteId <string>', t('siteIDDomainAssignTo'))
    .description(t('listAllDomainsSelectProject'))
    .action((options: { siteId?: string }) => listDomainsActionHandler(options))
    .addHelpCommand();

  cmd
    .command('detail')
    .option('--id <string>', t('idOfDomainForDetails'))
    .option('--hostname <string>', t('hostnameOfDomainForDetails'))
    .description(t('showDomainDetails'))
    .action((options: { id?: string; hostname?: string }) =>
      detailDomainActionHandler(options),
    )
    .addHelpCommand();

  cmd
    .command('create')
    .option('--privateGatewayId <string>', t('idOfPvtGwToCreateDomainFor'))
    .option('--privateGatewaySlug <string>', t('slugOfPvtGwToCreateDomainFor'))
    .option('--siteId <string>', t('siteIdToCreateDomainFor'))
    .option('--siteSlug <string>', t('slugCreateDomainFor'))
    .option('--hostname <string>', t('hostnameCreateDomainFor'))
    .description(t('createDomainForSiteOrGw'))
    .action(
      (options: {
        privateGatewayName?: string;
        siteId?: string;
        siteSlug?: string;
        hostname?: string;
      }) => createDomainActionHandler(options),
    )
    .addHelpCommand();

  cmd
    .command('delete')
    .option(
      '--id <string>',
      t('commonNameOfSubjectToAction', {
        name: t('id'),
        subject: t('domain'),
        action: t('delete'),
      }),
    )
    .option(
      '--hostname <string>',
      t('commonNameOfSubjectToAction', {
        name: t('hostname'),
        subject: t('ens'),
        action: t('delete'),
      }),
    )
    .description(t('deleteDomain'))
    .action((options: { hostname?: string }) =>
      deleteDomainActionHandler(options),
    )
    .addHelpCommand();

  cmd
    .command('verify')
    .option('--id <string>', t('verifyDomainById'))
    .option('--hostname <string>', t('verifyDomainByHostname'))
    .description(t('verifyDomainConfig'))
    .action((options: { hostname?: string }) =>
      verifyDomainActionHandler(options),
    )
    .addHelpCommand();

  return cmd;
};
