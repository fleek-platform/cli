import type { FleekSdk } from '@fleek-platform/sdk';

import type { Output } from '../../../output/Output';
import { t } from '../../../utils/translation';

type DeletePersonalAccessTokenArgs = {
  output: Output;
  sdk: FleekSdk;
  id: string;
};

export const deletePersonalAccessToken = async ({
  output,
  sdk,
  id,
}: DeletePersonalAccessTokenArgs) => {
  const success = await sdk
    .user()
    .deletePersonalAccessToken({ id })
    .catch(() => false);

  if (!success) {
    output.error(t('patIdNotExistForUsr'));

    return;
  }

  output.printNewLine();
  output.success(
    t('commonItemActionSuccess', {
      subject: t('personalAccessToken'),
      action: t('deleted'),
    }),
  );
};
