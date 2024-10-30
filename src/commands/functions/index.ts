import type { Command } from 'commander';

import { t } from '../../utils/translation';
import { createActionHandler } from './create';
import { deleteActionHandler } from './delete';
import { deployActionHandler } from './deploy';
import { listActionHandler } from './list';
import { listDeploymentsActionHandler } from './listDeployments';
import { updateActionHandler } from './update';

type DeployOptions = {
  path?: string;
  name?: string;
  bundle: string;
  private: boolean;
  env?: string[];
  envFile?: string;
  sgx?: boolean;
  assets?: string;
};

export default (program: Command): Command => {
  const cmd = program
    .command('functions')
    .description(t('functionsDescription'));

  cmd
    .command('create')
    .option('-n, --name <functionName>', t('functionName'))
    .option('--site <siteId>', t('functionsSite'))
    .description(t('functionsCreateDescription'))
    .action((options: { name?: string; site?: string }) =>
      createActionHandler({ name: options.name, siteId: options.site }),
    );

  cmd
    .command('delete')
    .description(t('functionsDeleteDescription'))
    .option('-n, --name <functionName>', t('functionName'))
    .action((options: { name?: string }) =>
      deleteActionHandler({ name: options.name }),
    );

  cmd
    .command('update')
    .description(t('functionsUpdateDescription'))
    .option('-n, --functionName <functionName>', t('functionName'))
    .option('--name <newName>', t('functionName'))
    .option('--slug <newSlug>', t('functionSlug'))
    .option('--status <newStatus>', t('functionStatus'))
    .action(
      (options: {
        functionName?: string;
        name?: string;
        slug?: string;
        status?: string;
      }) =>
        updateActionHandler({
          functionName: options.functionName,
          name: options.name,
          slug: options.slug,
          status: options.status,
        }),
    );

  cmd
    .command('deploy')
    .description(t('deployFunction'))
    .option('-p, --path <functionCodePath>', t('functionCodePath'))
    .option('-n, --name <functionName>', t('functionName'))
    .option('-b, --bundle <bundle>', t('bundleCmd'), true)
    .option('--private', t('functionDeployToPrivateStorage'), false)
    .option('-e, --env <environmentVariables...>', t('environmentVariables'))
    .option('--sgx', t('functionsUseSgx'), false)
    .option('-a --assets <assetsPath>', t('functionsUseAssets'), false)
    .option(
      '--envFile <environmentVariablesFilePath>',
      t('environmentVariablesFile'),
    )
    .action((options: DeployOptions) =>
      deployActionHandler({
        filePath: options.path,
        name: options.name,
        bundle: options.bundle,
        private: options.private,
        env: options.env ?? [],
        envFile: options.envFile,
        sgx: options.sgx,
        assetsPath: options.assets,
      }),
    );

  cmd
    .command('list')
    .description(t('listFunctionsDesc'))
    .action(() => listActionHandler());

  cmd
    .command('deployments')
    .option('-n, --name <functionName>', t('functionName'))
    .description(t('deploymentsListForSelectedFunction'))
    .action((options: { name?: string }) =>
      listDeploymentsActionHandler(options),
    );

  return cmd;
};
