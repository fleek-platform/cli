import { selectPrompt } from '../../../prompts/selectPrompt';
import { t } from '../../../utils/translation';

export const selectConfigurationFormatPrompt = async () => {
  const choices = [
    { title: 'Typescript (fleek.config.ts)', value: 'ts' } as const,
    { title: 'Javascript (fleek.config.js)', value: 'js' } as const,
    { title: 'JSON (fleek.config.json)', value: 'json' } as const,
  ];

  return selectPrompt<(typeof choices)[number]['value']>({
    message: `${t('selectFormatForSiteConf')}:`,
    choices,
  });
};
