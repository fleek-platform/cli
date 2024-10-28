import { FleekSdk } from '@fleek-platform/sdk/node';
import { output } from '../../../cli';
import { t } from '../../../utils/translation';

export const uploadFunctionAssets = async ({
  sdk,
  assetsPath,
  functionName,
}: {
  sdk: FleekSdk;
  assetsPath: string;
  functionName: string;
}): Promise<string> => {
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
