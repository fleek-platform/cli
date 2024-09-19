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
};

export default (program: Command) => {
  const cmd = program
    .command('functions')
    .option('-h, --help', t('printHelp'))
    .description(t('functionsDescription'));

  cmd
    .command('create')
    .option('-n, --name <functionName>', t('functionName'))
    .description(t('functionsCreateDescription'))
    .action((options: { name?: string }) =>
      createActionHandler({ name: options.name }),
    )
    .addHelpCommand();

  cmd
    .command('delete')
    .description(t('functionsDeleteDescription'))
    .option('-n, --name <functionName>', t('functionName'))
    .action((options: { name?: string }) =>
      deleteActionHandler({ name: options.name }),
    )
    .addHelpCommand();

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
    )
    .addHelpCommand();

  cmd
    .command('deploy')
    .description(t('deployFunction'))
    .option('-p, --path <functionCodePath>', t('functionCodePath'))
    .option('-n, --name <functionName>', t('functionName'))
    .option('-b, --bundle <bundle>', t('bundleCmd'), true)
    .option('--private', t('functionDeployToPrivateStorage'), false)
    .option('-e, --env <environmentVariables...>', t('environmentVariables'))
    .option('--sgx', t('functionsUseSgx'), false)
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
      }),
    )
    .addHelpCommand();

  cmd
    .command('list')
    .description(t('listFunctionsDesc'))
    .action(() => listActionHandler())
    .addHelpCommand();

  cmd
    .command('deployments')
    .option('-n, --name <functionName>', t('functionName'))
    .description(t('deploymentsListForSelectedFunction'))
    .action((options: { name?: string }) =>
      listDeploymentsActionHandler(options),
    )
    .addHelpCommand();

  cmd
    .command('help')
    .description(t('printHelp'))
    .action(() => cmd.help())
    .addHelpCommand();
};
