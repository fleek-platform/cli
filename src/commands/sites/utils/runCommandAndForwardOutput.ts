import { exec as runCommand } from 'node:child_process';

export const runCommandAndForwardOutput = async (buildCommand: string) => {
  const buildCommandProcess = runCommand(buildCommand);

  buildCommandProcess.stdout?.on('data', console.log);
  buildCommandProcess.stderr?.on('data', console.log);

  return new Promise((resolve: (exitCode: number) => void) => {
    buildCommandProcess.on('close', (exitCode) => resolve(exitCode ?? 0));
  });
};
