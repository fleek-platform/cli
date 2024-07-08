import { InvalidCidError } from '@fleek-platform/errors';
import { CID } from 'multiformats';

import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { processPromisesBatch } from '../../utils/processPromisesBatch';
import { t } from '../../utils/translation';

type DeleteActionArgs = {
  cid?: string;
  name?: string;
};

export const deleteStorageAction: SdkGuardedFunction<
  DeleteActionArgs
> = async ({ sdk, args }) => {
  const { cid, name } = args;

  const cidsToDelete = [];

  if (typeof name === 'string') {
    const splitFilename = name.split('.');
    const extension = (splitFilename.length > 1 && splitFilename.pop()) || '';
    const filename = splitFilename.join('.');
    const storage = await sdk.storage().getByFilename({ filename, extension });
    for (const s of storage) {
      cidsToDelete.push(s.cid);
    }
  } else if (cid) {
    try {
      CID.parse(cid);
    } catch (err) {
      throw new InvalidCidError({ name: cid });
    }

    cidsToDelete.push(cid);
  }

  try {
    await processPromisesBatch(
      cidsToDelete,
      async (cid: string): Promise<undefined> => {
        const response = await sdk.storage().delete({ cid });
        output.log(
          `${t('processing')}${cid ? ` cid: ${cid}` : ''}${name ? ` name: ${name}` : ''}`,
        );

        if (response.status === 200) {
          output.success(
            t('commonItemActionSuccess', {
              subject: cid ? `CID ${cid}` : `filename ${name}`,
              action: t('deleted'),
            }),
          );
        } else if (response.status === 500) {
          // 500 status should be caught and should not affect other deletes in case of multiple deletes
          output.error(
            t('commonItemActionFailure', {
              action: t('delete'),
              subject: `${t('storage')} "`,
              message: `${response.body.message}`,
            }),
          );
        } else {
          // eslint-disable-next-line fleek-custom/no-default-error
          throw new Error(response.body.message);
        }

        return;
      },
    );
  } catch (error) {
    if (error instanceof Error) {
      output.error(error.message);
    } else {
      console.error(error);
    }
  }
};

export const deleteStorageActionHandler = withGuards(deleteStorageAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});
