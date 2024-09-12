import { uploadOnProgress } from '../output/utils/uploadOnProgress';
import {
 getFileLikeObject,
} from '../commands/functions/utils/getJsCodeFromPath';

import type { FleekSdk } from '@fleek-platform/sdk/node';
import type { Bar as ProgressBar } from 'cli-progress';

export const getUploadResult = async ({
  filePath,
  functionName,
  isPrivate,
  progressBar,
  sdk,
}: {
  filePath: string;
  functionName: string;
  isPrivate: boolean;
  progressBar: ProgressBar;
  sdk: FleekSdk;
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
  }

  return;
}
