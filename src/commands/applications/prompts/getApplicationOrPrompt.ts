import { ApplicationsNotFoundError } from '@fleek-platform/errors';
import type { FleekSdk } from '@fleek-platform/sdk';

import { selectPrompt } from '../../../prompts/selectPrompt';
import { t } from '../../../utils/translation';

type GetApplicationOrPromptArgs = {
  id?: string;
  sdk: FleekSdk;
};

export const getApplicationOrPrompt = async ({
  id,
  sdk,
}: GetApplicationOrPromptArgs) => {
  if (id) {
    return sdk.applications().get({ id });
  }

  const applications = await sdk.applications().list();

  if (applications.length === 0) {
    throw new ApplicationsNotFoundError({});
  }

  const selectedApplicationId = await selectPrompt({
    message: `${t('selectApp')}:`,
    choices: applications.map((application) => ({
      title: application.name,
      value: application.id,
    })),
  });

  const appMatch = applications.find(
    (application) => application.id === selectedApplicationId,
  );

  if (!appMatch) return;

  return appMatch;
};
