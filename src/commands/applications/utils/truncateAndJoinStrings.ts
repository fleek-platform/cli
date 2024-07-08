type TruncateAndJoinStringsArgs = {
  input: string[];
  truncateOnPosition?: number;
};

export const truncateAndJoinStrings = (args: TruncateAndJoinStringsArgs) => {
  const truncatedArray = args.truncateOnPosition
    ? args.input.slice(0, args.truncateOnPosition)
    : args.input;

  const stringifiedArray = truncatedArray.join(',');

  return args.input.length > truncatedArray.length
    ? `${stringifiedArray},...`
    : stringifiedArray;
};
