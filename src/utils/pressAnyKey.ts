type HandlerArgs = Buffer;

export const usePressAnyKey = () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const cancel = { current: () => {} };

  const waitForAnyKey = async () =>
    new Promise((resolve, reject) => {
      const stopWaiting = () => {
        process.stdin.removeListener('data', handler);

        if (process.stdin.isTTY) {
          process.stdin.setRawMode(false);
        }

        process.stdin.pause();
      };

      const handler = (buffer: HandlerArgs) => {
        stopWaiting();

        const bytes = Array.from(buffer);

        if (bytes.length && bytes[0] === 3) {
          process.exit(1);
        }

        process.nextTick(resolve);
      };

      cancel.current = () => {
        stopWaiting();
        reject('Canceled');
      };

      process.stdin.resume();

      if (process.stdin.isTTY) {
        process.stdin.setRawMode(true);
      }

      process.stdin.once('data', handler);
    });

  return { waitForAnyKey, cancel: () => cancel.current() };
};
