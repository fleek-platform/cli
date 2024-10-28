/**
 * Show prompt handler until the validator returns true.
 *
 * @param handler - Async function that prompts for user input
 * @param validator - Async function that validates the handler's response
 *
 * @returns The validated data from the handler
 *
 * @example
 * const result = await promptUntil({
 *   handler: async () => prompt('Enter a number > 5'),
 *   validator: async (num) => parseInt(num) > 5
 * });
 */
export const promptUntil = async <T>({
  handler,
  validator,
}: {
  handler: () => Promise<T>;
  validator: (data: T) => Promise<boolean>;
}): Promise<T> => {
  const data = await handler();
  if (!(await validator(data))) {
    return promptUntil({ handler, validator });
  }

  return data;
};
