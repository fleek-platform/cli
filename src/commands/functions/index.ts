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
  noBundle: boolean;
  private: boolean;
  env?: string[];
  envFile?: string;
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
    .option('--noBundle', t('noBundle'), false)
    .option('--private', t('functionDeployToPrivateStorage'), false)
    .option('-e, --env <environmentVariables...>', t('environmentVariables'))
    .option(
      '--envFile <environmentVariablesFilePath>',
      t('environmentVariablesFile'),
    )
    .action((options: DeployOptions) =>
      deployActionHandler({
        filePath: options.path,
        name: options.name,
        noBundle: options.noBundle,
        private: options.private,
        env: options.env ?? [],
        envFile: options.envFile,
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

  cmd
    .command('help')
    .description(t('printHelp'))
    .action(() => cmd.help());
};
