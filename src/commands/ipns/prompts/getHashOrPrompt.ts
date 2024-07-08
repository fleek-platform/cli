import { textPrompt } from '../../../prompts/textPrompt';
import { t } from '../../../utils/translation';

type GetHashOrPromptArgs = {
  hash?: string;
};

export const getHashOrPrompt = async ({ hash }: GetHashOrPromptArgs) => {
  if (hash) {
    return hash;
  }

  return textPrompt({ message: `${t('ipnsTypeValidIPFSHash')}:` });
};
