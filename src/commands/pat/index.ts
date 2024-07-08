import { MissingExpectedDataError } from '@fleek-platform/errors';
import type { Command } from 'commander';

import { getDefined } from '../../defined';
import { t } from '../../utils/translation';
import { createPersonalAccessTokenActionHandler } from './create';
import { deletePersonalAccessTokenActionHandler } from './delete';
import { listPersonalAccessTokensActionHandler } from './list';

export default (program: Command) => {
  const cmd = program
    .command('pat')
    .option('-h, --help', t('printHelp'))
    .description(t('patDescription'));

  cmd
    .command('list') //
    .description(t('patListDesc'))
    .action(listPersonalAccessTokensActionHandler);

  cmd
    .command('create')
    .description(t('createNewPat'))
    .option('-n, --name <name>', t('patName'))
    .action(async (args) => {
      const uiAppUrl = getDefined('UI__APP_URL');
      const authApiUrl = getDefined('SDK__GRAPHQL_API_URL');

      if (!uiAppUrl || !authApiUrl) {
        throw new MissingExpectedDataError();
      }

      await createPersonalAccessTokenActionHandler({
        uiAppUrl,
        authApiUrl,
        ...args,
      });
    });

  cmd
    .command('delete')
    .description(t('patDelete'))
    .argument(
      '<personalAccessTokenId>',
      t('commonNameOfSubjectToAction', {
        name: t('id'),
        subject: t('personalAccessToken'),
        action: t('delete'),
      }),
    )
    .action((personalAccessTokenId: string) =>
      deletePersonalAccessTokenActionHandler({ personalAccessTokenId }),
    );

  cmd.command('help').description(t('printHelp'));
};
