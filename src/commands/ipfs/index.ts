import type { Command } from 'commander';

import { t } from '../../utils/translation';
import { addActionHandler } from './add';

export default (program: Command) => {
  const cmd = program
    .command('ipfs')
    .option('-h, --help', t('printHelp'))
    .description(t('ipfsDescription'));

  cmd
    .command('add')
    .description(t('ipfsAddDescription'))
    .argument('<path>', t('ipfsAddPathDescription'))
    .action((path: string) => addActionHandler({ path }));

  cmd
    .command('help')
    .description(t('printHelp'))
    .action(() => program.help());
};
