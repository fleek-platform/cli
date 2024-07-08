import { textPrompt } from '../../prompts/textPrompt';

type GetPersonalAccessTokenNameOrPromptArgs = { name?: string };

export const getPersonalAccessTokenNameOrPrompt = async ({
  name,
}: GetPersonalAccessTokenNameOrPromptArgs) => {
  if (name) {
    return name;
  }

  const personalAccessTokenName = await textPrompt({
    message:
      'Do you want to name your new personal access token? Keep empty to skip.',
  });

  return personalAccessTokenName;
};
