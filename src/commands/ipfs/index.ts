import type { Command } from 'commander';

import { t } from '../../utils/translation';
import { addActionHandler } from './add';

export default (program: Command): Command => {
  const cmd = program.command('ipfs').description(t('ipfsDescription'));

  cmd
    .command('add')
    .description(t('ipfsAddDescription'))
    .argument('<path>', t('ipfsAddPathDescription'))
    .action((path: string) => addActionHandler({ path }));

  return cmd;
};
