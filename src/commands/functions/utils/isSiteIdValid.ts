import type { FleekSdk } from '@fleek-platform/sdk/node';

export const isSiteIdValid = async ({
  siteId,
  sdk,
}: {
  siteId: string;
  sdk: FleekSdk;
}) => {
  try {
    await sdk.sites().get({ id: siteId });
    return true;
  } catch {
    return false;
  }
};
