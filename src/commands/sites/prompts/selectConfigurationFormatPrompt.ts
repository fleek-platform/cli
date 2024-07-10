import { selectPrompt } from '../../../prompts/selectPrompt';
import { t } from '../../../utils/translation';
import { getConfigFileByTypeValue } from '../../../utils/configuration';

import { FleekSiteConfigFormats } from '../../../utils/configuration/types';

const choices = Object.keys(FleekSiteConfigFormats).map((name) => {
  const value =
    FleekSiteConfigFormats[name as keyof typeof FleekSiteConfigFormats];

  const configFile = getConfigFileByTypeValue(value);

  return {
    title: `${name} (${configFile})`,
    value,
  };
});

export const selectConfigurationFormatPrompt = async () =>
  selectPrompt<(typeof choices)[number]['value']>({
    message: `${t('selectFormatForSiteConf')}:`,
    choices,
  });
