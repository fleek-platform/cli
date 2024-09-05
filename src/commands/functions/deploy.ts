import fs from 'node:fs';
import cliProgress from 'cli-progress';
import {blake3} from 'hash-wasm';

import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { uploadOnProgress } from '../../output/utils/uploadOnProgress';
import { t } from '../../utils/translation';
import { getFunctionOrPrompt } from './prompts/getFunctionOrPrompt';
import { getFunctionPathOrPrompt } from './prompts/getFunctionPathOrPrompt';
import { getJsCodeFromPath, getFileLikeObject } from './utils/getJsCodeFromPath';
import { getEnvironmentVariables } from './utils/parseEnvironmentVariables';
import { waitUntilFileAvailable } from './wait/waitUntilFileAvailable';

import type { UploadPinResponse } from '@fleek-platform/sdk';
import { getWasmCodeFromPath } from './utils/getWasmCodeFromPath';

const NETWORK_SERVICE = 1
const NETWORK_SERVICE_WITH_SGX = 3;

type DeployActionArgs = {
  filePath?: string;
  name?: string;
  noBundle: boolean;
  private: boolean;
  env: string[];
  envFile?: string;
  sgx?: boolean;
};

const deployAction: SdkGuardedFunction<DeployActionArgs> = async ({
  sdk,
  args,
}) => {
  const env = getEnvironmentVariables({ env: args.env, envFile: args.envFile });
  const functionToDeploy = await getFunctionOrPrompt({ name: args.name, sdk });
  const filePath = await getFunctionPathOrPrompt({ path: args.filePath });
  const bundle = !args.noBundle;
  const sgx = args.sgx ?? false;

  if (args.private && sgx) {
    output.error(t('pvtFunctionInSgxNotSupported', { name: 'function' }));
    return;
  }

  if (!functionToDeploy) {
    output.error(t('expectedNotFoundGeneric', { name: 'function' }));
    return;
  }

  const filePathToUpload = sgx ? await getWasmCodeFromPath({ filePath })
    : await getJsCodeFromPath({
      filePath,
      bundle,
      env,
    });

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
      filePath: filePathToUpload,
      onUploadProgress: uploadOnProgress(progressBar),
    });
  } else {
    const fileLikeObject = await getFileLikeObject(filePathToUpload);
    uploadResult = await sdk.storage().uploadFile({
      file: fileLikeObject,
      options: { functionName: functionToDeploy.name },
      onUploadProgress: uploadOnProgress(progressBar),
    });
  
  }

  let b3Hash; 
  if (sgx) {
    const buffer = await fs.promises.readFile(filePathToUpload);

    b3Hash = blake3(buffer);
  }

  if (!output.debugEnabled && !args.noBundle) {
    fs.rmSync(filePathToUpload);
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

  await sdk.functions().deploy({
    functionId: functionToDeploy.id,
    cid: uploadResult.pin.cid,
    sgx,
  });

  output.success(t('commonNameCreateSuccess', { name: 'deployment' }));
  output.printNewLine();
  output.log(t('callFleekFunctionByUrlReq'));
  output.link(functionToDeploy.invokeUrl);

  if (!args.private) {
    output.log(t('callFleekFunctionByNetworkUrlReq'));
    // TODO: Add a secret
    const networkServiceId = sgx ? NETWORK_SERVICE_WITH_SGX : NETWORK_SERVICE;
    output.link(
      `https://fleek-test.network/services/${networkServiceId}/ipfs/${uploadResult.pin.cid}`,
    );

    if (sgx){
      output.link("https://fleek-test.network/services/3");
      output.printNewLine();
      output.link(`Blake3 Hash: ${b3Hash} `)
      output.link(`Invoke by sending request to https://fleek-test.network/services/3 with payload of {hash: <Blake3Hash>, decrypt: true, inputs: "foo"}`)
      output.link(`Example: curl fleek-test.network/services/3 --data '{"hash": "${b3Hash}", "decrypt": true, "input": "foo"}'`)
    }
  }
};

export const deployActionHandler = withGuards(deployAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: false,
  },
});
