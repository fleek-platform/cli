import type { FleekSdk } from '@fleek-platform/sdk/node';
import { isValidFolder } from '@fleek-platform/utils-validation';
import { output } from '../../../cli';
import { t } from '../../../utils/translation';

export const uploadFunctionAssets = async ({
  sdk,
  assetsPath,
  functionName,
}: {
  sdk: FleekSdk;
  functionName: string;
  assetsPath?: string;
}): Promise<string | undefined> => {
  if (!assetsPath) {
    return;
  }

  if (!(await isValidFolder(assetsPath))) {
    output.error(t('assetsPathIsNotAFolder'));
    return;
  }

  try {
    output.spinner(t('uploadingAssets'));
    const result = await sdk.storage().uploadDirectory({
      path: assetsPath,
      options: {
        functionName,
      },
    });
    output.success(t('assetsUploadSuccess'));
    return result.pin.cid;
  } catch (error) {
    output.error(t('uploadAssetsFailed'));
    throw error;
  }
};
