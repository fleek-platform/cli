export type CheckPeriodicallyUntilArgs<T> = {
  conditionFn: () => Promise<T>;
  period: number;
  tries: number;
};

export const checkPeriodicallyUntil = async <T>({
  conditionFn,
  period,
  tries,
}: CheckPeriodicallyUntilArgs<T>): Promise<T> => {
  const result = await conditionFn();

  if (result || tries < 1) {
    return result;
  }

  return new Promise((resolve) => setTimeout(resolve, period)).then(() =>
    checkPeriodicallyUntil({ conditionFn, period, tries: tries - 1 }),
  );
};
