import { confirmPrompt } from '../../../prompts/confirmPrompt';

export const confirmDeleteRecordPrompt = async () =>
  confirmPrompt({
    message: 'Are you sure you want to delete the record?',
    initial: false,
  });
