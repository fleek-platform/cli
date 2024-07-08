import { listPrompt } from '../../../prompts/listPrompt';
import { t } from '../../../utils/translation';

type GetWhitelistDomainsOrPromptArgs = {
  whitelistDomains?: string[];
  whitelistDomainsToUpdate?: string[];
};

export const getWhitelistDomainsOrPrompt = async ({
  whitelistDomains,
  whitelistDomainsToUpdate,
}: GetWhitelistDomainsOrPromptArgs) => {
  if (whitelistDomains) {
    return whitelistDomains;
  }

  const list = await listPrompt({
    message: t('typeWhitelistDomainsSepByComma'),
    initial: whitelistDomainsToUpdate,
  });

  return list.filter((hostname) => hostname.length > 0);
};
