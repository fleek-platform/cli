import { promises as fs, existsSync } from 'node:fs';
import { basename } from 'node:path';

import {
  getFleekXyzIpfsGatewayUrl,
  getPrivateIpfsGatewayUrl,
} from '@fleek-platform/utils-ipfs';
import cliProgress from 'cli-progress';
import { filesFromPaths } from 'files-from-path';

import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';
import { getAllActivePrivateGatewayDomains } from '../gateways/utils/getAllPrivateGatewayDomains';
import type { FileLike } from './utils/upload';
import { uploadStorage } from './utils/upload';

type AddStorageActionArgs = {
  path: string;
};

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
    onFailure: () => {
      progressBar.stop();
    },
  });

  if (!storage) {
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
    output.link(getFleekXyzIpfsGatewayUrl(hash));

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
