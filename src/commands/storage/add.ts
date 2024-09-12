import { promises as fs, existsSync } from 'node:fs';
import { basename } from 'node:path';
import {
  getCfIpfsGatewayUrl,
  getPrivateIpfsGatewayUrl,
} from '@fleek-platform/utils-ipfs';
import cliProgress from 'cli-progress';
import { filesFromPaths } from 'files-from-path';

import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { uploadOnProgress } from '../../output/utils/uploadOnProgress';
import { t } from '../../utils/translation';
import { getAllActivePrivateGatewayDomains } from '../gateways/utils/getAllPrivateGatewayDomains';

import type { FleekSdk, UploadPinResponse } from '@fleek-platform/sdk/node';

type AddStorageActionArgs = {
  path: string;
};

type FileLike = {
  name: string;
  stream: () => ReadableStream<Uint8Array>;
  size: number;
};

const uploadStorage = async ({
  path,
  sdk,
  files,
  directoryName,
  progressBar,
}: {
    path: string;
    sdk: FleekSdk,
    files: FileLike[],
    directoryName: string,
    progressBar: cliProgress.SingleBar,
}): Promise<UploadPinResponse | undefined> => {
  try {
    const stat = await fs.stat(path);

    if (stat.isDirectory()) {
      return await sdk.storage().uploadVirtualDirectory({
            files,
            directoryName,
            onUploadProgress: uploadOnProgress(progressBar),
          });
    }

    // TODO: The progressBar is displayed twice
    // seem like different instances
    // where one is initialized purposely on set 0
    // investigate why this is
    const response = await sdk.storage().uploadFile({
      file: files[0],
      onUploadProgress: uploadOnProgress(progressBar),
    });

    return response;
  } catch {
    progressBar.stop();
  }

  return;
}

export const addStorageAction: SdkGuardedFunction<
  AddStorageActionArgs
> = async ({ sdk, args }) => {
  if (!existsSync(args.path)) {
    output.error(t('filePathNotFound', { path: args.path }));

    return;
  }

  const progressBar = new cliProgress.SingleBar(
    {
      format:
        'Upload Progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}',
    },
    cliProgress.Presets.shades_grey,
  );
  const directoryName = basename(args.path);
  const files: FileLike[] = await filesFromPaths([args.path]);
  
  const storage = await uploadStorage({
    path: args.path,
    sdk,
    files,
    directoryName,
    progressBar,
  });

  if (!storage) {
    // TODO: Can this message be improved
    // include a try again later and report to support
    // if the issue persists?
    output.error(t('somethingWrongDurUpload'));

    return;
  }

  const hash = storage?.pin.cid.toString();

  if (storage.duplicate) {
    output.warn(t('fileAlreadyExistWarn', { path: args.path }));

    output.printNewLine();
  } else {
    output.success(t('storageUploadSuccessCid', { cid: hash }));
    output.printNewLine();
  }

  const privateGatewayDomains = await getAllActivePrivateGatewayDomains({
    sdk,
  });

  if (privateGatewayDomains.length === 0) {
    output.log(t('visitViaGateway'));
    output.link(getCfIpfsGatewayUrl(hash));

    return;
  }

  output.log(t('visitViaPvtGw'));

  for (const privateGatewayDomain of privateGatewayDomains) {
    output.link(
      getPrivateIpfsGatewayUrl({
        hostname: privateGatewayDomain.hostname,
        hash,
      }),
    );
  }

  output.printNewLine();
};

export const addStorageActionHandler = withGuards(addStorageAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});
