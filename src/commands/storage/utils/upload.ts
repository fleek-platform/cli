import fs from 'node:fs/promises';
import { uploadOnProgress } from '../../../output/utils/uploadOnProgress';

import type { FleekSdk, UploadPinResponse } from '@fleek-platform/sdk/node';
import type { SingleBar as ProgressSingleBar } from 'cli-progress';

import type { ReadableStream } from 'node:stream/web';

export type FileLike = {
  name: string;
  stream: () => ReadableStream<Uint8Array>;
  size: number;
};

export const uploadStorage = async ({
  path,
  sdk,
  files,
  directoryName,
  progressBar,
  onFailure,
}: {
  path: string;
  sdk: FleekSdk;
  files: FileLike[];
  directoryName: string;
  progressBar: ProgressSingleBar;
  onFailure?: () => void;
}): Promise<UploadPinResponse | undefined> => {
  try {
    const stat = await fs.stat(path);

    if (stat.isDirectory()) {
      return sdk.storage().uploadVirtualDirectory({
        files,
        directoryName,
        onUploadProgress: uploadOnProgress(progressBar),
      });
    }

    // TODO: The progressBar is displayed twice
    // seem like different instances
    // where one is initialized purposely on set 0
    // investigate why this is
    return sdk.storage().uploadFile({
      file: files[0],
      onUploadProgress: uploadOnProgress(progressBar),
    });
  } catch {
    if (typeof onFailure === 'function') {
      onFailure();
    }
  }

  return;
};
