import { checkPeriodicallyUntil } from '../../../utils/checkPeriodicallyUntil';

type WaitUntilFileAvailableArgs = {
  cid: string;
};

export const waitUntilFileAvailable = async ({
  cid,
}: WaitUntilFileAvailableArgs) => {
  const timeout = 10000;
  const gatewayPatterns = [
    'https://{cid}.ipfs.dweb.link',
    'https://{cid}.ipfs.w3s.link',
    'https://{cid}.ipfs.flk-ipfs.xyz',
    'https://ipfs.io/ipfs/{cid}',
    'https://fleek.ipfs.io/ipfs/{cid}',
  ];
  const createUrlPromises = () =>
    gatewayPatterns.map((pattern: string) => {
      const url = pattern.replace(/\{(\w+)\}/g, cid);
      const fetchPromise = fetch(url).then((response) => {
        if (!response.ok) {
          // eslint-disable-next-line fleek-custom/no-default-error
          throw new Error(`Request failed for ${url}`);
        }

        return response;
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error(`timeout fetching content from ${url}`)),
          timeout,
        ),
      );

      return Promise.race([fetchPromise, timeoutPromise]);
    });

  return checkPeriodicallyUntil({
    conditionFn: async () => {
      const urlPromises = createUrlPromises();
      try {
        await Promise.any(urlPromises);

        return true;
      } catch {
        return false;
      }
    },
    period: 6000,
    tries: 50,
  });
};
