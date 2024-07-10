import type { FleekError } from '@fleek-platform/errors';

import { output } from '../cli';
import { initConfiguration } from '../commands/sites/utils/initConfiguration';
import { loadConfiguration } from '../utils/configuration/loadConfiguration';
import { t } from '../utils/translation';
import { getSdkClient } from './sdkGuard';
import { chooseOrCreateSite } from '../commands/sites/utils/chooseOrCreateSite';

export const sitesGuard = async ({
  predefinedConfigPath,
}: { predefinedConfigPath?: string }) => {
  const isConfigValid = await (async () => {
    try {
      return !!await loadConfiguration({ predefinedConfigPath });
    } catch(_err) {
      return false;
    }
  })();

  if (!isConfigValid) {
    output.hint(t('createValidConfAsInstruct'));
    output.printNewLine();

    const sdk = getSdkClient();

    if (!sdk) {
      output.error(t('unexpectedError'));

      return false;
    }

    const site = await chooseOrCreateSite({ sdk });

    if (!site) {
      output.error(t('unexpectedError'));

      return false;
    }

    await initConfiguration({ site });
  }
};
