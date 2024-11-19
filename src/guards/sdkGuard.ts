import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk/node';
import { getDefined } from '../defined';

import { output } from '../cli';
import { config } from '../config';
import { t } from '../utils/translation';
import { loginGuard } from './loginGuard';

import type { Action, SdkGuardedFunction } from './types';

type SdkGuardArgs<T> = SdkGuardedFunction<T>;

export const getSdkClient = () => {
  const personalAccessToken = config.personalAccessToken.get();
  const projectId = config.projectId.get();

  if (!personalAccessToken) {
    output.error(t('missingPersonalAccessToken'));
    process.exit(1);
  }

  const accessTokenService = new PersonalAccessTokenService({
    projectId,
    personalAccessToken,
  });
  const sdk = new FleekSdk({
    accessTokenService,
    graphqlServiceApiUrl: getDefined('SDK__GRAPHQL_API_URL'),
    ipfsStorageApiUrl: getDefined('SDK__IPFS__STORAGE_API_URL'),
    uploadProxyApiUrl: getDefined('SDK__UPLOAD_PROXY_API_URL'),
  });

  return sdk;
};

export const sdkGuard = <T>(func: SdkGuardArgs<T>): Action<T> => {
  return async (args: T = {} as T) => {
    await loginGuard();

    const sdk = getSdkClient();

    if (!sdk) {
      output.error(t('failedAuthentication'));
      process.exit(1);
    }

    try {
      await func({ sdk, args });
    } catch (error) {
      if (error instanceof Error) {
        output.error(error?.toString());
        process.exit(1);
      }

      output.error(`Unknown Error: ${JSON.stringify(error)}`);
      process.exit(1);
    }
  };
};
