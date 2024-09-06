import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk/node';
import { type Mock, describe, expect, it, vi } from 'vitest';

import {
  getAllActivePrivateGatewayDomains,
  getAllPrivateGatewayDomains,
} from './getAllPrivateGatewayDomains';

vi.mock('@fleek-platform/sdk/node', () => {
  const FleekSdkMock = vi.fn();

  const privateGateways = {
    list: vi.fn().mockResolvedValue([
      { id: 'firstGatewayId', zone: { id: 'firstZoneId' } },
      { id: 'secondGatewayId', zone: { id: 'secondZoneId' } },
    ]),
  };

  FleekSdkMock.prototype.privateGateways = () => privateGateways;

  const domains = {
    listByZoneId: vi.fn().mockImplementation(({ zoneId }) => {
      if (zoneId === 'firstZoneId') {
        return [
          { id: 'firstDomainId', hostname: 'first.xyz', status: 'ACTIVE' },
          { id: 'secondDomainId', hostname: 'second.xyz' },
        ];
      }

      return [
        { id: 'thirdDomainId', hostname: 'third.xyz', status: 'ACTIVE' },
        { id: 'fourthDomainId', hostname: 'fourth.xyz' },
      ];
    }),
  };

  FleekSdkMock.prototype.domains = () => domains;

  return { FleekSdk: FleekSdkMock, PersonalAccessTokenService: vi.fn() };
});

describe('Get domains assigned to all private gateways under current project', () => {
  it('should return 4 domains for 2 gateways', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });

    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(
      getAllPrivateGatewayDomains({ sdk: fakeSdk }),
    ).resolves.toEqual([
      { id: 'firstDomainId', hostname: 'first.xyz', status: 'ACTIVE' },
      { id: 'secondDomainId', hostname: 'second.xyz' },
      { id: 'thirdDomainId', hostname: 'third.xyz', status: 'ACTIVE' },
      { id: 'fourthDomainId', hostname: 'fourth.xyz' },
    ]);

    expect(fakeSdk.privateGateways().list).toHaveBeenCalledOnce();
    expect(fakeSdk.domains().listByZoneId).toHaveBeenCalledWith({
      zoneId: 'firstZoneId',
    });
    expect(fakeSdk.domains().listByZoneId).toHaveBeenCalledWith({
      zoneId: 'secondZoneId',
    });
  });

  it('should return 1 active domain for both gateways', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });

    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(
      getAllActivePrivateGatewayDomains({ sdk: fakeSdk }),
    ).resolves.toEqual([
      { id: 'firstDomainId', hostname: 'first.xyz', status: 'ACTIVE' },
      { id: 'thirdDomainId', hostname: 'third.xyz', status: 'ACTIVE' },
    ]);

    expect(fakeSdk.privateGateways().list).toHaveBeenCalledOnce();
    expect(fakeSdk.domains().listByZoneId).toHaveBeenCalledWith({
      zoneId: 'firstZoneId',
    });
    expect(fakeSdk.domains().listByZoneId).toHaveBeenCalledWith({
      zoneId: 'secondZoneId',
    });
  });

  it('should return no domains because no gateway exists for current project', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });

    const fakeSdk = new FleekSdk({ accessTokenService });
    (fakeSdk.privateGateways().list as Mock).mockResolvedValueOnce([]);

    await expect(
      getAllPrivateGatewayDomains({ sdk: fakeSdk }),
    ).resolves.toEqual([]);

    expect(fakeSdk.privateGateways().list).toHaveBeenCalledOnce();
    expect(fakeSdk.domains().listByZoneId).not.toHaveBeenCalled();
  });
});
