import { promises as fs } from 'node:fs';

import { output } from '../../../cli';
import { t } from '../../../utils/translation';

const lockToInstallCommandMap: { [key: string]: string } = {
  'yarn.lock': 'npm install -g yarn && yarn install',
  'pnpm-lock.yaml': 'npm install -g pnpm && pnpm install',
  'package-lock.json': 'npm install',
};

export const deriveInstallCommandFromLockfile = async () => {
  const directoryContents = await fs.readdir(process.cwd());
  const lockFile = directoryContents.find((file) => file.includes('lock'));

  if (!lockFile) {
    output.warn(t('noLockfileFound'));

    return;
  }

  return lockToInstallCommandMap[lockFile];
};
