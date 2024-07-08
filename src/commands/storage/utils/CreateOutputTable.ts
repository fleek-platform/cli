import type { FleekSdk, StoragePin } from '@fleek-platform/sdk';
import {
  getCfIpfsGatewayUrl,
  getPrivateIpfsGatewayUrl,
} from '@fleek-platform/utils-ipfs';

import { getAllActivePrivateGatewayDomains } from '../../gateways/utils/getAllPrivateGatewayDomains';

type CreateOutputTableArgs = {
  sdk: FleekSdk;
  storage: StoragePin[];
};

type TableCoulmns = {
  filename: string;
  cid: string;
  'filecoin id'?: string;
  'arweave id'?: string;
  link: string;
};

export const createOutputTable = async ({
  sdk,
  storage,
}: CreateOutputTableArgs): Promise<TableCoulmns[]> => {
  const privateGatewayDomains = await getAllActivePrivateGatewayDomains({
    sdk,
  });
  const privateGatewayExists = privateGatewayDomains.length > 0;

  return storage.flatMap((s) => {
    const filename = `${s.filename}${s.extension ? `.${s.extension}` : ''}`;
    const gatewayUrls = privateGatewayExists
      ? privateGatewayDomains.map((privateGatewayDomain) =>
          getPrivateIpfsGatewayUrl({
            hostname: privateGatewayDomain.hostname,
            hash: s.cid,
          }),
        )
      : [getCfIpfsGatewayUrl(s.cid)];

    return gatewayUrls.map((link) => ({
      filename,
      cid: s.cid,
      'filecoin id': s.filecoinDealIds,
      'arweave id': s.arweaveId,
      link,
    }));
  });
};
