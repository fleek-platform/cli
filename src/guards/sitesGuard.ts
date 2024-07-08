import type { FleekError } from '@fleek-platform/errors';

import { output } from '../cli';
import { initConfiguration } from '../commands/sites/utils/initCongifuration';
import { loadConfiguration } from '../utils/configuration/loadConfiguration';
import { t } from '../utils/translation';
import { getSdkClient } from './sdkGuard';

export const sitesGuard = async ({
  predefinedConfigPath,
}: { predefinedConfigPath?: string }) => {
  const isConfigValid = await loadConfiguration({ predefinedConfigPath })
    .then(() => true)
    .catch((e: FleekError<unknown>) => {
      output.error(e.toString());

      return false;
    });

  if (!isConfigValid) {
    output.hint(t('createValidConfAsInstruct'));
    output.printNewLine();

    const sdk = getSdkClient();

    if (!sdk) {
      output.error(t('unexpectedError'));

      return false;
    }

    await initConfiguration({ sdk });
  }
};
