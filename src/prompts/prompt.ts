// eslint-disable-next-line no-restricted-imports
import prompts, { type PromptObject } from 'prompts';

export type PromptArgs = Omit<PromptObject, 'name'> & {
  onCancel?: () => void;
};

export const prompt = async <T = string>({
  onCancel,
  ...args
}: PromptArgs): Promise<T> => {
  const { value }: { value?: T } = await prompts(
    {
      ...args,
      name: 'value',
    },
    {
      onCancel: () => {
        onCancel?.();
        process.exit(0);
      },
    },
  );

  return value as T;
};
