import type { Command } from 'commander';

import { output } from '../../cli';
import { t } from '../../utils/translation';
import { addStorageActionHandler } from './add';
import { deleteStorageActionHandler } from './delete';
import { getStorageActionHandler } from './get';
import { listStorageActionHandler } from './list';

export default (program: Command) => {
  const cmd = program
    .command('storage')
    .description(t('storageCmdDescription'));

  cmd
    .command('list')
    .description(t('storageListDescription'))
    .action(() => listStorageActionHandler());

  const getStorage = cmd
    .command('get')
    .description(t('storageDescription', { action: t('get') }))
    .option('-c, --cid <cid>', t('storageCidOption', { action: t('get') }))
    .option(
      '-n, --name <filenameWithExtension>',
      t('storageNameOption', { action: t('get') }),
    );

  getStorage.action((options: { cid?: string; name?: string }) => {
    if ((!options.name && !options.cid) || (options.name && options.cid)) {
      if (
        !getStorage.args.includes('help') &&
        !getStorage.optsWithGlobals().help
      ) {
        output.error(t('storageMissingOptCidOrName'));
      }

      output.printNewLine();
      getStorage.outputHelp();

      return;
    }

    return getStorageActionHandler({ cid: options.cid, name: options.name });
  });

  const deleteStorage = cmd
    .command('delete')
    .description(t('storageDescription', { action: t('delete') }))
    .option('-c, --cid <cid>', t('storageCidOption', { action: t('delete') }))
    .option(
      '-n, --name <filenameWithExtension>',
      t('storageNameOption', { action: t('delete') }),
    );

  deleteStorage.action((options: { cid?: string; name?: string }) => {
    if ((!options.name && !options.cid) || (options.name && options.cid)) {
      if (
        !getStorage.args.includes('help') &&
        !getStorage.optsWithGlobals().help
      ) {
        output.error(t('storageMissingOptCidOrName'));
      }

      output.printNewLine();
      deleteStorage.outputHelp();

      return;
    }

    return deleteStorageActionHandler({ cid: options.cid, name: options.name });
  });

  cmd
    .command('add')
    .description(t('storageAddDescription'))
    .argument('<path>', t('ipfsAddPathDescription'))
    .action((path: string) => addStorageActionHandler({ path }));
};
