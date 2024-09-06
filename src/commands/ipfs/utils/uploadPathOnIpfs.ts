import { promises as fs } from 'node:fs';
import { basename } from 'node:path';
import type { FleekSdk } from '@fleek-platform/sdk/node';

type UploadPathOnIpfsArgs = {
  sdk: FleekSdk;
  path: string;
};

export const uploadPathOnIpfs = async ({ sdk, path }: UploadPathOnIpfsArgs) => {
  const stat = await fs.stat(path);

  if (stat.isDirectory()) {
    const uploadResults = await sdk.ipfs().addFromPath(path, {
      wrapWithDirectory: true,
      // We must pass plain object instead of URLSearchParams because of ipfs-http-client bug
      searchParams: { alias: basename(path) } as unknown as URLSearchParams,
    });

    return uploadResults.pop();
  }

  const content = await fs.readFile(path);

  return sdk.ipfs().add({ path, content });
};
