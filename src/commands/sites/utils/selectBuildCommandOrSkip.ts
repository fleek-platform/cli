import { confirmIncludeBuildCommandPrompt } from '../prompts/confirmIncludeBuildCommandPrompt';
import { enterBuildCommandPrompt } from '../prompts/enterBuildCommandPrompt';

export const selectBuildCommandOrSkip = async () => {
  const includeBuildCommand = await confirmIncludeBuildCommandPrompt();

  if (!includeBuildCommand) {
    return;
  }

  const buildCommand = await enterBuildCommandPrompt();

  return buildCommand;
};
