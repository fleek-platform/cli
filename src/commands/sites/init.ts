import {
  FleekConfigInvalidContentError,
  FleekConfigMissingFileError,
  type FleekError,
} from '@fleek-platform/errors';

import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { loadConfiguration } from '../../utils/configuration/loadConfiguration';
import { t } from '../../utils/translation';
import { confirmFileOverridePrompt } from './prompts/confirmFileOverridePrompt';
import { chooseOrCreateSite } from './utils/chooseOrCreateSite';
import { initConfiguration } from './utils/initConfiguration';

const initAction: SdkGuardedFunction = async ({ sdk }) => {
  const configLoadingResult = await loadConfiguration({})
    .then(() => {
      return { isContentValid: true, isFilePresent: true } as const;
    })
    .catch((e: FleekError<unknown>) => {
      if (e instanceof FleekConfigInvalidContentError) {
        return {
          isContentValid: false,
          isFilePresent: true,
          configPath: e.data.configPath,
        } as const;
      }

      if (e instanceof FleekConfigMissingFileError) {
        return { isContentValid: false, isFilePresent: false } as const;
      }

      throw e;
    });

  if (configLoadingResult.isContentValid && configLoadingResult.isFilePresent) {
    output.error(t('configFileExists'));
    output.printNewLine();
    output.log(t('siteAlreadyExists'));

    return;
  }

  if (
    !configLoadingResult.isContentValid &&
    configLoadingResult.isFilePresent
  ) {
    const overrideInvalidConfig = await confirmFileOverridePrompt({
      path: configLoadingResult.configPath,
    });

    if (!overrideInvalidConfig) {
      return;
    }
  }

  const site = await chooseOrCreateSite({ sdk });

  if (!site) {
    output.error(t('unexpectedError'));

    return;
  }

  await initConfiguration({
    site,
    onUnexpectedFormatError: (format: string) => {
      output.warn(t('unexpectedFileFormat', { format }));
      process.exit(1);
    },
    onSaveConfigurationError: () => {
      output.warn(t('fsFailedToWriteConfig'));
      process.exit(1);
    },
  });

  output.printNewLine();
  output.success(t('fleekConfigSaved'));
  output.printNewLine();
};

export const initActionHandler = withGuards(initAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});
