import { selectPrompt } from '../../../prompts/selectPrompt';
import { t } from '../../../utils/translation';

enum AvailableFormats {
  JSON = 'json',
  Typescript = 'ts',
  Javascript = 'js',
};

const choices = Object.keys(AvailableFormats).map((name) => {
  const value = AvailableFormats[name as keyof typeof AvailableFormats];

  return {
    title: `${name} (fleek.config.${value})`,
    value,
  };
});

export const selectConfigurationFormatPrompt = async () => selectPrompt<(typeof choices)[number]['value']>({
    message: `${t('selectFormatForSiteConf')}:`,
    choices,
  });
