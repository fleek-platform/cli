import type cliProgress from 'cli-progress';

export const uploadOnProgress = (progressBar: cliProgress.SingleBar) => {
  return ({
    loadedSize,
    totalSize,
  }: { loadedSize: number; totalSize?: number }) => {
    if (loadedSize === 0) {
      progressBar.start(totalSize ?? loadedSize, loadedSize);
    } else if (loadedSize === totalSize) {
      progressBar.update(loadedSize);
      progressBar.stop();
    } else {
      progressBar.update(loadedSize);
    }
  };
};
