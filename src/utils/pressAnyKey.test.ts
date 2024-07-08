import { type MockSTDIN, stdin } from 'mock-stdin';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockProcessExit } from 'vitest-mock-process';

import { usePressAnyKey } from './pressAnyKey';

describe('Waiting for any key', () => {
  // eslint-disable-next-line
  let fakeStdin: MockSTDIN;
  // eslint-disable-next-line
  let fakeProcessExit: ReturnType<typeof mockProcessExit>;
  beforeEach(() => {
    fakeStdin = stdin();
    fakeProcessExit = mockProcessExit();
  });

  afterEach(() => {
    fakeProcessExit.mockRestore();
    fakeStdin.restore();
  });

  it('Simulate some key press', async () => {
    const { waitForAnyKey } = usePressAnyKey();
    const promise = waitForAnyKey();
    fakeStdin.send('a');
    await expect(promise).resolves.toBeUndefined();

    expect(fakeProcessExit).not.toHaveBeenCalled();
  });

  it('Simulate Ctrl+C to exit process', async () => {
    const { waitForAnyKey } = usePressAnyKey();
    const promise = waitForAnyKey();

    fakeStdin.send(Buffer.from([3]));

    await promise;

    expect(fakeProcessExit).toHaveBeenCalledOnce();
  });

  it('Cancel waiting for key', async () => {
    const { waitForAnyKey, cancel } = usePressAnyKey();
    const promise = waitForAnyKey();

    setTimeout(() => cancel(), 100);

    await expect(promise).rejects.toThrowError('Canceled');
  });
});
