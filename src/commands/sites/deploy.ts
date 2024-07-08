import { output } from '../../cli';
import type { SdkGuardedFunction } from '../../guards/types';
import { withGuards } from '../../guards/withGuards';
import { loadConfiguration } from '../../utils/configuration/loadConfiguration';
import { t } from '../../utils/translation';
import { runCommandAndForwardOutput } from './utils/runCommandAndForwardOutput';
import { waitUntilDeploymentFinishedAndInformUser } from './utils/waitUntilDeploymentFinishedAndInformUser';

type DeployActionArgs = {
  predefinedConfigPath?: string;
};

const deployAction: SdkGuardedFunction<DeployActionArgs> = async ({
  sdk,
  args: { predefinedConfigPath },
}) => {
  const config = await loadConfiguration({ predefinedConfigPath });

  const siteConfig = config.sites[0];

  const site = await sdk.sites().getBySlug({ slug: siteConfig.slug });

  if (siteConfig.buildCommand) {
    const exitCode = await runCommandAndForwardOutput(siteConfig.buildCommand);

    if (exitCode !== 0) {
      output.error(t('buildCmdFailedSeeErr', { cmd: siteConfig.buildCommand }));
      output.printNewLine();
      process.exit(exitCode);
    }
  }

  output.spinner(t('uploadingFiles'));

  const uploadResults = await sdk.ipfs().addSitesToIpfs(siteConfig.distDir, {
    wrapWithDirectory: true,
    // We must pass plain object instead of URLSearchParams because of ipfs-http-client bug
    searchParams: { site_id: site.id } as unknown as URLSearchParams,
  });

  const root = uploadResults.pop();

  if (!root) {
    output.error(t('somethingWrongDurUpload'));
    output.printNewLine();

    return;
  }

  output.spinner(t('startingSiteDeployment'));

  const hash = root.cid.toString();

  const deployment = await sdk
    .sites()
    .createCustomIpfsDeployment({ cid: hash, siteId: site.id });

  await waitUntilDeploymentFinishedAndInformUser({
    sdk,
    deploymentId: deployment.id,
    siteId: site.id,
    slug: site.slug,
    hostname: site.primaryDomain?.hostname,
    hash,
    output,
  });
};

export const deployActionHandler = withGuards(deployAction, {
  scopes: {
    authenticated: true,
    project: true,
    site: true,
  },
});
