import { type PromptArgs, prompt } from './prompt';

type ListPromptArgs = Omit<PromptArgs, 'type' | 'initial'> & {
  initial?: string[];
};

export const listPrompt = async ({
  message,
  initial,
  onCancel,
}: ListPromptArgs): Promise<string[]> => {
  return prompt<string[]>({
    type: 'list',
    message,
    initial: initial?.join(', '),
    onCancel,
  });
};
