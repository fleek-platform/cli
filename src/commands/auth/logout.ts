import { output } from '../../cli';
import { config } from '../../config';
import { t } from '../../utils/translation';

export const logoutActionHandler = async () => {
  const secretToken = config.personalAccessToken.get();

  if (!secretToken) {
    return;
  }

  config.clear();
  output.success(t('logged', { status: t('loggedOutOf') }));
};
