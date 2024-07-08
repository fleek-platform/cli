import { promises as fs } from 'node:fs';

import { textPrompt } from '../../../prompts/textPrompt';

export const enterBuildCommandPrompt = async (): Promise<string> =>
  textPrompt({
    message: 'Specify `build` command:',
    initial: await tryToGetBuildCommand(),
  });

const tryToGetBuildCommand = async () => {
  const filesInRootDir = await fs.readdir(process.cwd());

  // NPM
  if (filesInRootDir.includes('package-lock.json')) {
    return 'npm run build';
  }

  // PNPM
  if (
    filesInRootDir.includes('pnpm-lock.yaml') ||
    filesInRootDir.includes('pnpm-workspace.yaml')
  ) {
    return 'pnpm run build';
  }

  // YARN
  if (filesInRootDir.includes('yarn.lock')) {
    return 'yarn run build';
  }

  return;
};
