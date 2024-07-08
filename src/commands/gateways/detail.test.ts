import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk';
import { type Mock, describe, expect, it, vi } from 'vitest';

import { output } from '../../cli';
import { detailPrivateGatewayAction } from './detail';
import { getPrivateGatewayOrPrompt } from './prompts/getPrivateGatewayOrPrompt';

vi.mock('../../cli', () => {
  const output = {
    log: vi.fn(),
    link: vi.fn(),
    printNewLine: vi.fn(),
    table: vi.fn(),
  };

  return { output };
});

vi.mock('./prompts/getPrivateGatewayOrPrompt', () => ({
  getPrivateGatewayOrPrompt: vi.fn().mockResolvedValue({
    id: 'firstPrivateGatewayId',
    slug: 'one-blue-fish',
    name: 'first',
    createdAt: '2023-02-01T00:00:00.000Z',
    zone: { id: 'firstZoneId' },
  }),
}));

vi.mock('@fleek-platform/sdk', () => {
  const FleekSdkMock = vi.fn();

  const domains = {
    listByZoneId: vi.fn().mockResolvedValue([
      { id: 'firstDomainId', hostname: 'first.xyz' },
      { id: 'secondDomainId', hostname: 'second.xyz' },
    ]),
  };

  FleekSdkMock.prototype.domains = () => domains;

  return { FleekSdk: FleekSdkMock, PersonalAccessTokenService: vi.fn() };
});

describe('Show private gateway detailed information', () => {
  it('should show detail with 2 domains', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(
      detailPrivateGatewayAction({
        sdk: fakeSdk,
        args: { id: 'firstPrivateGatewayId' },
      }),
    ).resolves.toBeUndefined();

    expect(getPrivateGatewayOrPrompt).toHaveBeenCalledWith({
      sdk: fakeSdk,
      id: 'firstPrivateGatewayId',
    });

    expect(output.table).toHaveBeenCalledWith([
      {
        ID: 'firstPrivateGatewayId',
        Slug: 'one-blue-fish',
        Name: 'first',
        'Created At': '2023-02-01T00:00:00.000Z',
      },
    ]);
    expect(output.log).toHaveBeenCalledWith(
      'You can access your content through the following domains:',
    );
    expect(output.link).toHaveBeenCalledWith('https://first.xyz/ipfs/<cid>');
    expect(output.link).toHaveBeenCalledWith('https://second.xyz/ipfs/<cid>');
    expect(output.printNewLine).toHaveBeenCalledOnce();
  });

  it('should show basic info and message that no private gateways exist', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });
    (fakeSdk.domains().listByZoneId as Mock).mockResolvedValueOnce([]);

    await expect(
      detailPrivateGatewayAction({
        sdk: fakeSdk,
        args: { slug: 'one-blue-fish' },
      }),
    ).resolves.toBeUndefined();

    expect(getPrivateGatewayOrPrompt).toHaveBeenCalledWith({
      sdk: fakeSdk,
      slug: 'one-blue-fish',
    });

    expect(output.table).toHaveBeenCalledWith([
      {
        ID: 'firstPrivateGatewayId',
        Slug: 'one-blue-fish',
        Name: 'first',
        'Created At': '2023-02-01T00:00:00.000Z',
      },
    ]);
    expect(output.log).toHaveBeenCalledWith(
      'The private gateway currently has no assigned domains.',
    );
    expect(output.link).not.toHaveBeenCalled();
  });
});
