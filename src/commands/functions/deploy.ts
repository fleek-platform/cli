import fs from 'node:fs';
import cliProgress from 'cli-progress';

import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { calculateBlake3Hash } from '../../utils/blake3';
import { t } from '../../utils/translation';
import { getFunctionOrPrompt } from './prompts/getFunctionOrPrompt';
import { getFunctionPathOrPrompt } from './prompts/getFunctionPathOrPrompt';
import { getJsCodeFromPath } from './utils/getJsCodeFromPath';
import { getEnvironmentVariables } from './utils/parseEnvironmentVariables';
import { getUploadResult } from './utils/upload';
import { waitUntilFileAvailable } from './wait/waitUntilFileAvailable';

import { getWasmCodeFromPath } from './utils/getWasmCodeFromPath';

type DeployActionArgs = {
  filePath?: string;
  name?: string;
  bundle: string;
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
  const bundle = args.bundle !== 'false';
  const isSGX = !!args.sgx;
  const isTrustedPrivateEnvironment = isSGX && args.private;
  const isUntrustedPublicEnvironment = !isSGX && !args.private;

  if (isTrustedPrivateEnvironment) {
    output.error(t('pvtFunctionInSgxNotSupported', { name: 'function' }));
    return;
  }

  if (!functionToDeploy) {
    output.error(t('expectedNotFoundGeneric', { name: 'function' }));
    return;
  }

  const filePathToUpload = isSGX
    ? await getWasmCodeFromPath({ filePath })
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

  const uploadResult = await getUploadResult({
    filePath: filePathToUpload,
    functionName: functionToDeploy.name,
    isPrivate: args.private,
    progressBar,
    sdk,
    onFailure: () => {
      progressBar.stop();
    },
  });

  if (!uploadResult) {
    output.error(
      t('commonFunctionActionFailure', {
        action: 'deploy',
        tryAgain: t('tryAgain'),
        message: t('uploadToIpfsFailed'),
      }),
    );

    return;
  }

  const blake3Hash = isSGX
    ? await calculateBlake3Hash({
        filePath: filePathToUpload,
        onFailure: () => {
          output.error(t('failedCalculateBlake3Hash'));
          process.exit(1);
        },
      })
    : undefined;

  if (!output.debugEnabled && !args.bundle) {
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

  try {
    await sdk.functions().deploy({
      functionId: functionToDeploy.id,
      cid: uploadResult.pin.cid,
      sgx: isSGX,
      blake3Hash,
    });
  } catch {
    output.error(t('failedDeployFleekFunction'));
    process.exit(1);
  }

  // TODO: This should probably happen just after uploadResult
  // looks more like a post upload process due to propagation
  if (isSGX) {
    // We need to make a request to the network so the network can have a mapping to the blake3 hash.
    // this is a temporarily hack until dalton comes up with a fix on network
    // TODO: Check status of supposed fix
    output.spinner(t('networkFetchMappings'));
    try {
      // TODO: The `fleek-test` address should be an env var
      await fetch(
        `https://fleek-test.network/services/0/ipfs/${uploadResult.pin.cid}`,
      );
    } catch {
      output.error(t('networkFetchFailed'));
      return;
    }
  }

  output.success(t('commonNameCreateSuccess', { name: 'deployment' }));
  output.printNewLine();
  output.log(t('callFleekFunctionByUrlReq'));
  output.link(functionToDeploy.invokeUrl);

  if (isSGX) {
    output.log(t('callFleekFunctionByNetworkUrlReq'));
    output.link('https://fleek-test.network/services/3');
    output.printNewLine();
    output.log(`Blake3 Hash: ${blake3Hash} `);
    output.log(
      `Invoke by sending request to https://fleek-test.network/services/3 with payload of {hash: <Blake3Hash>, decrypt: true, inputs: "foo"}`,
    );
    output.printNewLine();
    output.hint(`Here's an example:`);
    output.link(
      `curl ${functionToDeploy.invokeUrl} --data '{"hash": "${blake3Hash}", "decrypt": true, "input": "foo"}'`,
    );
  }

  if (isUntrustedPublicEnvironment) {
    output.log(t('callFleekFunctionByNetworkUrlReq'));
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
