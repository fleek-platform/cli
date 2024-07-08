import { type PromptArgs, prompt } from './prompt';

type ConfirmPromptArgs = Omit<PromptArgs, 'type'> & { initial: boolean };

export const confirmPrompt = async ({
  message,
  initial,
  onCancel,
}: ConfirmPromptArgs): Promise<boolean> => {
  return prompt<boolean>({
    type: 'confirm',
    message,
    initial,
    onCancel,
  });
};
