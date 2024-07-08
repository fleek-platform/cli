import type { FleekSdk } from '@fleek-platform/sdk';
import { describe, expect, it, vi } from 'vitest';

import { output as fakeOutput } from '../../cli';
import { detailDomainAction } from './detail';

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

vi.mock('./prompts/getDomainOrPrompt', () => ({
  getDomainOrPrompt: vi.fn().mockResolvedValue({
    id: 'firstDomainId',
    hostname: 'first.xyz',
    status: 'ACTIVE',
    createdAt: '2023-02-01T00:00:00.000Z',
    dnsConfigs: [
      {
        type: 'CNAME',
        name: 'hostname',
        value: 'clee640yh0000l808a1nzrogc.b-cdn.net',
      },
    ],
  }),
}));

describe('Show domain detailed information', () => {
  it('Find by hostname', async () => {
    await expect(
      detailDomainAction({
        sdk: {} as FleekSdk,
        args: { hostname: 'first.xyz' },
      }),
    ).resolves.toBeUndefined();

    expect(fakeOutput.log).toHaveBeenCalledOnce();

    expect(fakeOutput.table).toBeCalledTimes(2);
    expect(fakeOutput.table).toHaveBeenNthCalledWith(1, [
      {
        Hostname: 'first.xyz',
        Status: 'ACTIVE',
        'Created At': '2023-02-01T00:00:00.000Z',
      },
    ]);
    expect(fakeOutput.table).toHaveBeenNthCalledWith(2, [
      {
        Type: 'CNAME',
        Name: 'hostname',
        Value: 'clee640yh0000l808a1nzrogc.b-cdn.net',
      },
    ]);
  });
});
