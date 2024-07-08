import type { FleekSdk } from '@fleek-platform/sdk';
import { describe, expect, it, vi } from 'vitest';

import { output as fakeOutput } from '../../cli';
import { detailEnsRecordsAction } from './detail';

vi.mock('../../cli', () => {
  const output = {
    log: vi.fn(),
    table: vi.fn(),
    cross: vi.fn().mockReturnValue('X'),
    checkmark: vi.fn().mockReturnValue('V'),
    printNewLine: vi.fn(),
  };

  return { output };
});

vi.mock('./prompts/getEnsRecordOrPrompt', () => ({
  getEnsRecordOrPrompt: vi.fn().mockResolvedValue({
    id: 'firstEnsId',
    name: 'first.eth',
    status: 'ACTIVE',
    createdAt: '2023-02-01T00:00:00.000Z',
    ipnsRecord: { name: 'ipnsName' },
  }),
}));

describe('Show ENS record detailed information', () => {
  it('Find by name', async () => {
    await expect(
      detailEnsRecordsAction({
        sdk: {} as FleekSdk,
        args: { name: 'first.eth' },
      }),
    ).resolves.toBeUndefined();

    expect(fakeOutput.log).toHaveBeenCalledOnce();

    expect(fakeOutput.table).toBeCalledTimes(2);
    expect(fakeOutput.table).toHaveBeenNthCalledWith(1, [
      {
        ENS: 'first.eth',
        Status: 'ACTIVE',
        'Created At': '2023-02-01T00:00:00.000Z',
      },
    ]);
    expect(fakeOutput.table).toHaveBeenNthCalledWith(2, [
      { Name: 'Content Hash', Value: 'ipns://ipnsName' },
    ]);
  });
});
