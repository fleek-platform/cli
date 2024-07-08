import { MissingExpectedDataError } from '@fleek-platform/errors';
import type { Command } from 'commander';

import { getDefined } from '../../defined';
import { t } from '../../utils/translation';
import { loginActionHandler } from './login';
import { logoutActionHandler } from './logout';

export default (program: Command) => {
  program
    .command('login')
    .description(t('loginToFlkPlt', { status: t('loginTo') }))
    .action(() => {
      const uiAppUrl = getDefined('UI__APP_URL');
      const authApiUrl = getDefined('SDK__GRAPHQL_API_URL');

      if (!uiAppUrl || !authApiUrl) {
        throw new MissingExpectedDataError();
      }

      return loginActionHandler({
        uiAppUrl,
        authApiUrl,
      });
    });

  program
    .command('logout')
    .description(t('loginToFlkPlt', { status: t('logoutOf') }))
    .action(logoutActionHandler);
};
