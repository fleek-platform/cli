import { loadConfiguration } from '../../../utils/configuration/loadConfiguration';
import { confirmInstallCommandPrompt } from '../prompts/confirmInstallCommandPrompt';
import { confirmUserWantsInstallCommandPrompt } from '../prompts/confirmUserWantsInstallCommandPrompt';
import { confirmUserWantsToSpecifyInstallCommandPrompt } from '../prompts/confirmUserWantsToSpecifyInstallCommandPrompt';
import { enterInstallCommandPrompt } from '../prompts/enterInstallCommandPrompt';
import { deriveInstallCommandFromLockfile } from './deriveInstallCommandFromLockfile';

export const requestDeploymentWorkflowInstallCommand = async () => {
  const config = await loadConfiguration({}).catch(() => null);

  if (config === null || !config.sites[0]?.buildCommand) {
    return;
  }

  const wantsInstallCommand = await confirmUserWantsInstallCommandPrompt();

  if (!wantsInstallCommand) {
    return;
  }

  const wantsToSpecifyCommand =
    await confirmUserWantsToSpecifyInstallCommandPrompt();

  if (wantsToSpecifyCommand) {
    return enterInstallCommandPrompt();
  }

  const installCommand = await deriveInstallCommandFromLockfile();

  if (
    !installCommand ||
    !(await confirmInstallCommandPrompt({ installCommand }))
  ) {
    return enterInstallCommandPrompt();
  }

  return installCommand;
};
