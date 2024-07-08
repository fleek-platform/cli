import fs from 'node:fs';
import {
  getIpfsGatewayUrl,
  getPrivateIpfsGatewayUrl,
} from '@fleek-platform/utils-ipfs';

import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';
import { getAllActivePrivateGatewayDomains } from '../gateways/utils/getAllPrivateGatewayDomains';
import { uploadPathOnIpfs } from './utils/uploadPathOnIpfs';

type AddActionArgs = {
  path: string;
};

const addAction: SdkGuardedFunction<AddActionArgs> = async ({ sdk, args }) => {
  if (!fs.existsSync(args.path)) {
    output.error(t('filePathNotFound', { path: args.path }));
    output.printNewLine();

    return;
  }

  output.spinner(t('uploadingFiles'));

  const root = await uploadPathOnIpfs({ sdk, path: args.path });

  if (!root) {
    output.error(t('uploadFailureSomeReason'));
    output.printNewLine();

    return;
  }

  const privateGatewayDomains = await getAllActivePrivateGatewayDomains({
    sdk,
  });

  const hash = root.cid.toString();
  const successMsg = t('uploadPathSuccessWithCID', { path: args.path, hash });

  output.success(successMsg);
  output.printNewLine();

  if (privateGatewayDomains.length === 0) {
    output.hint(`${t('getFileFromPubAddr')}:`);
    output.link(getIpfsGatewayUrl(hash));

    return;
  }

  output.log(`${t('visitViaPvtGw')}:`);

  for (const privateGatewayDomain of privateGatewayDomains) {
    output.link(
      getPrivateIpfsGatewayUrl({
        hostname: privateGatewayDomain.hostname,
        hash,
      }),
    );
  }
};

export const addActionHandler = withGuards(addAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});
