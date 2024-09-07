import { InvalidCidError } from '@fleek-platform/errors';
import { CID } from 'multiformats';

import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { t } from '../../utils/translation';
import { createOutputTable } from './utils/CreateOutputTable';

import type { StoragePin } from '@fleek-platform/sdk/node';

type GetActionArgs = {
  cid?: string;
  name?: string;
};

export const getStorageAction: SdkGuardedFunction<GetActionArgs> = async ({
  sdk,
  args,
}) => {
  const { cid, name } = args;
  let storage: StoragePin[] | undefined;

  if (typeof name === 'string') {
    const splitFilename = name.split('.');
    const extension = (splitFilename.length > 1 && splitFilename.pop()) || '';
    const filename = splitFilename.join('.');
    storage = await sdk.storage().getByFilename({ filename, extension });
  } else if (cid) {
    try {
      CID.parse(cid);
    } catch (err) {
      throw new InvalidCidError({ name: cid });
    }

    try {
      storage = [await sdk.storage().get({ cid })];
    } catch (err) {
      storage = undefined;
    }
  }

  if (!storage || storage?.length === 0) {
    output.warn(
      t('storageGetNotFound', {
        type: `${cid ? 'cid' : 'name'}`,
        value: cid || name || '',
      }),
    );
    output.log(t('storageAddSuggestion'));
    output.log('fleek storage add <file_path>');

    return;
  }

  const table = await createOutputTable({ sdk, storage });
  output.table(table);
};

export const getStorageActionHandler = withGuards(getStorageAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});
