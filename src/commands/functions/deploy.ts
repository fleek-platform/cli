import fs from 'node:fs';
import cliProgress from 'cli-progress';

import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { uploadOnProgress } from '../../output/utils/uploadOnProgress';
import { t } from '../../utils/translation';
import { getFunctionOrPrompt } from './prompts/getFunctionOrPrompt';
import { getFunctionPathOrPrompt } from './prompts/getFunctionPathOrPrompt';
import { getCodeFromPath, getFileLikeObject } from './utils/getCodeFromPath';
import { getEnvironmentVariables } from './utils/parseEnvironmentVariables';
import { waitUntilFileAvailable } from './wait/waitUntilFileAvailable';

import type { UploadPinResponse } from '@fleek-platform/sdk';

type DeployActionArgs = {
  filePath?: string;
  name?: string;
  noBundle: boolean;
  private: boolean;
  env: string[];
  envFile?: string;
};

const deployAction: SdkGuardedFunction<DeployActionArgs> = async ({
  sdk,
  args,
}) => {
  const env = getEnvironmentVariables({ env: args.env, envFile: args.envFile });
  const functionToDeploy = await getFunctionOrPrompt({ name: args.name, sdk });
  const filePath = await getFunctionPathOrPrompt({ path: args.filePath });
  const bundledFilePath = await getCodeFromPath({
    filePath,
    bundle: args.noBundle,
    env,
  });

  if (!functionToDeploy) {
    output.error(t('expectedNotFoundGeneric', { name: 'function' }));
    return;
  }

  output.printNewLine();

  const progressBar = new cliProgress.SingleBar(
    {
      format: t('uploadProgress', { action: t('uploadCodeToIpfs') }),
    },
    cliProgress.Presets.shades_grey,
  );

  let uploadResult: UploadPinResponse;

  if (args.private) {
    uploadResult = await sdk.storage().uploadPrivateFile({
      filePath: bundledFilePath,
      onUploadProgress: uploadOnProgress(progressBar),
    });
  } else {
    const fileLikeObject = await getFileLikeObject(bundledFilePath);
    uploadResult = await sdk.storage().uploadFile({
      file: fileLikeObject,
      options: { functionName: functionToDeploy.name },
      onUploadProgress: uploadOnProgress(progressBar),
    });
  }

  if (!output.debugEnabled && !args.noBundle) {
    fs.rmSync(bundledFilePath);
  }

  if (!uploadResult.pin.cid) {
    output.error(
      t('commonFunctionActionFailure', {
        action: 'deploy',
        tryAgain: t('tryAgain'),
        message: t('uploadToIpfsFailed'),
      }),
    );

    return;
  }

  if (
    uploadResult.duplicate &&
    functionToDeploy.currentDeployment &&
    uploadResult.pin &&
    functionToDeploy.currentDeployment.cid === uploadResult.pin.cid
  ) {
    output.chore(t('noChangesDetected'));

    return;
  }

  if (!args.private) {
    output.printNewLine();
    output.spinner(t('runningAvailabilityCheck'));

    const isAvailable = await waitUntilFileAvailable({
      cid: uploadResult.pin.cid,
    });

    if (!isAvailable) {
      output.error(t('availabilityCheckFailed'));

      return;
    }
  }

  await sdk
    .functions()
    .deploy({ functionId: functionToDeploy.id, cid: uploadResult.pin.cid });

  output.success(t('commonNameCreateSuccess', { name: 'deployment' }));
  output.printNewLine();
  output.log(t('callFleekFunctionByUrlReq'));
  output.link(functionToDeploy.invokeUrl);

  if (!args.private) {
    output.log(t('callFleekFunctionByNetworkUrlReq'));
    // TODO: Add a secret
    output.link(
      `https://fleek-test.network/services/1/ipfs/${uploadResult.pin.cid}`,
    );
  }
};

export const deployActionHandler = withGuards(deployAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});
