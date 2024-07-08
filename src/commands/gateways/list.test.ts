import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk';
import { type Mock, describe, expect, it, vi } from 'vitest';

import { output } from '../../cli';
import { listPrivateGatewaysAction } from './list';

vi.mock('../../cli', () => {
  const output = {
    table: vi.fn(),
    log: vi.fn(),
  };

  return { output };
});

vi.mock('@fleek-platform/sdk', () => {
  const FleekSdkMock = vi.fn();

  const privateGateways = {
    list: vi.fn().mockResolvedValue([
      {
        id: 'firstPrivateGatewayId',
        slug: 'one-blue-fish',
        name: 'first',
        createdAt: '2023-02-01T00:00:00.000Z',
      },
      {
        id: 'secondPrivateGatewayId',
        slug: 'two-green-fix',
        name: 'second',
        createdAt: '2023-02-02T00:00:00.000Z',
      },
    ]),
  };

  FleekSdkMock.prototype.privateGateways = () => privateGateways;

  return { FleekSdk: FleekSdkMock, PersonalAccessTokenService: vi.fn() };
});

describe('List all private gateways', () => {
  it('List 2 private gateways assigned to selected project', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(
      listPrivateGatewaysAction({ sdk: fakeSdk, args: {} }),
    ).resolves.toBeUndefined();

    expect(output.log).not.toHaveBeenCalled();
    expect(output.table).toHaveBeenCalledWith([
      {
        ID: 'firstPrivateGatewayId',
        Slug: 'one-blue-fish',
        Name: 'first',
        'Created At': '2023-02-01T00:00:00.000Z',
      },
      {
        ID: 'secondPrivateGatewayId',
        Slug: 'two-green-fix',
        Name: 'second',
        'Created At': '2023-02-02T00:00:00.000Z',
      },
    ]);
  });

  it('Show message that no private gateways exist', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });
    (fakeSdk.privateGateways().list as Mock).mockResolvedValueOnce([]);

    await expect(
      listPrivateGatewaysAction({ sdk: fakeSdk, args: {} }),
    ).resolves.toBeUndefined();

    expect(output.log).toHaveBeenCalledWith(
      'You currently do not have any private gateways configured.',
    );
    expect(output.table).not.toHaveBeenCalled();
  });
});
