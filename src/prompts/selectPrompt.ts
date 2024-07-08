import { eraseLines } from '../output/utils/eraseLines';
import { type PromptArgs, prompt } from './prompt';

type Choice<T> = {
  title: string;
  value?: T;
  disabled?: boolean | undefined;
  selected?: boolean | undefined;
  description?: string | undefined;
};

type SelectPromptArgs<T> = Omit<PromptArgs, 'type'> & {
  choices: Choice<T>[];
  initial?: number;
};

export const selectPrompt = async <T>({
  message,
  choices = [],
  initial,
  onCancel,
}: SelectPromptArgs<T>): Promise<T> => {
  while (true) {
    const selectedValue = await prompt({
      type: 'autocomplete',
      message,
      choices,
      initial,
      onCancel,
    });

    if (choices.some((choice) => choice.value === selectedValue)) {
      return selectedValue as T;
    }

    process.stdout.write(eraseLines(2));
  }
};
