import fs from 'node:fs/promises';
import { uploadOnProgress } from '../../../output/utils/uploadOnProgress';
import {
 getFileLikeObject,
} from './getJsCodeFromPath';

import type { FleekSdk, UploadPinResponse } from '@fleek-platform/sdk/node';
import type { Bar as ProgressBar, SingleBar as ProgressSingleBar } from 'cli-progress';

export type FileLike = {
  name: string;
  stream: () => ReadableStream<Uint8Array>;
  size: number;
};

export const getUploadResult = async ({
  filePath,
  functionName,
  isPrivate,
  progressBar,
  sdk,
  onFailure,
}: {
  filePath: string;
  functionName: string;
  isPrivate: boolean;
  progressBar: ProgressBar;
  sdk: FleekSdk;
  onFailure?: () => void;
}) => {
  try {
    if (isPrivate) {
      return await sdk.storage().uploadPrivateFile({
        filePath,
        onUploadProgress: uploadOnProgress(progressBar),
      });
    }

    const fileLikeObject = await getFileLikeObject(filePath);
    return await sdk.storage().uploadFile({
      file: fileLikeObject,
      options: { functionName },
      onUploadProgress: uploadOnProgress(progressBar),
    });
  } catch {
    progressBar.stop();
    if (typeof onFailure === 'function') {
      onFailure();
    }
  }

  return;
}

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
    if (typeof onFailure === 'function') {
      onFailure();
    }
  }

  return;
}
