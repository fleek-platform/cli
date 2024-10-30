import { FleekSdk } from '@fleek-platform/sdk/node';

export const isSiteIdValid = ({ siteId, sdk }: { siteId: string; sdk: FleekSdk }) => {
  if (!siteId) return true;

  return sdk
    .sites()
    .get({ id: siteId })
    .then(() => true)
    .catch(() => false);
};
