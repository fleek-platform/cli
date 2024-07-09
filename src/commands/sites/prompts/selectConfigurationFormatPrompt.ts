import { selectPrompt } from '../../../prompts/selectPrompt';
import { t } from '../../../utils/translation';

import { FleekSiteConfigFormats } from '../../../utils/configuration/types';

const choices = Object.keys(FleekSiteConfigFormats).map((name) => {
  const value = FleekSiteConfigFormats[name as keyof typeof FleekSiteConfigFormats];

  return {
    title: `${name} (fleek.config.${value})`,
    value,
  };
});

export const selectConfigurationFormatPrompt = async () => selectPrompt<(typeof choices)[number]['value']>({
    message: `${t('selectFormatForSiteConf')}:`,
    choices,
  });
