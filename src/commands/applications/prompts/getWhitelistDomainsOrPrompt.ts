import { output } from '../../../cli';
import { listPrompt } from '../../../prompts/listPrompt';
import { t } from '../../../utils/translation';

type GetWhitelistDomainsOrPromptArgs = {
  whitelistDomains?: string[];
  whitelistDomainsToUpdate?: string[];
};

export const getWhitelistDomainsOrPrompt = async ({
  whitelistDomains,
  whitelistDomainsToUpdate,
}: GetWhitelistDomainsOrPromptArgs): Promise<string[]> => {
  if (whitelistDomains) {
    return whitelistDomains;
  }

  const list = await listPrompt({
    message: t('typeWhitelistDomainsSepByComma'),
    initial: whitelistDomainsToUpdate,
  });

  const domains = list.filter((hostname) => hostname.length > 0);

  if (!domains.length) {
    output.warn(t('warnProvideValidDomainName'));
    output.printNewLine();

    return getWhitelistDomainsOrPrompt({
      whitelistDomains,
      whitelistDomainsToUpdate,
    });
  }

  return domains;
};
