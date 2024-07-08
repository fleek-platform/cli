import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk';
import { type Mock, describe, expect, it, vi } from 'vitest';

import { output as fakeOutput } from '../../cli';
import { listDomainsAction } from './list';

vi.mock('../../cli', () => {
  const output = {
    table: vi.fn(),
    cross: vi.fn().mockReturnValue('X'),
    checkmark: vi.fn().mockReturnValue('V'),
    printNewLine: vi.fn(),
    mistake: vi.fn(),
  };

  return { output };
});

vi.mock('@fleek-platform/sdk', () => {
  const FleekSdkMock = vi.fn();

  const domains = {
    list: vi.fn().mockResolvedValue([
      {
        id: 'firstDomainId',
        hostname: 'first.xyz',
        status: 'ACTIVE',
        createdAt: '2023-02-01T00:00:00.000Z',
      },
      {
        id: 'secondDomainId',
        hostname: 'second.xyz',
        status: 'CREATED',
        createdAt: '2023-02-02T00:00:00.000Z',
      },
    ]),
    listByZoneId: vi.fn().mockResolvedValue([
      {
        id: 'firstDomainId',
        hostname: 'first.xyz',
        status: 'ACTIVE',
        createdAt: '2023-02-01T00:00:00.000Z',
      },
      {
        id: 'secondDomainId',
        hostname: 'second.xyz',
        status: 'CREATED',
        createdAt: '2023-02-02T00:00:00.000Z',
      },
    ]),
  };

  FleekSdkMock.prototype.domains = () => domains;

  const sites = {
    get: vi
      .fn()
      .mockResolvedValue({ id: 'testSiteId', zones: [{ id: 'testZoneId' }] }),
  };

  FleekSdkMock.prototype.sites = () => sites;

  return { FleekSdk: FleekSdkMock, PersonalAccessTokenService: vi.fn() };
});

describe('List all domains', () => {
  it('List all domains assigned to selected project', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(
      listDomainsAction({ sdk: fakeSdk, args: {} }),
    ).resolves.toBeUndefined();

    expect(fakeOutput.table).toHaveBeenCalledWith([
      {
        Hostname: 'first.xyz',
        Status: 'ACTIVE',
        'Created At': '2023-02-01T00:00:00.000Z',
      },
      {
        Hostname: 'second.xyz',
        Status: 'CREATED',
        'Created At': '2023-02-02T00:00:00.000Z',
      },
    ]);
  });

  it('List all domains for given siteId', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });
    (fakeSdk.domains().listByZoneId as Mock).mockResolvedValueOnce([
      {
        id: 'firstDomainId',
        hostname: 'first.xyz',
        status: 'ACTIVE',
        createdAt: '2023-02-01T00:00:00.000Z',
      },
    ]);

    await expect(
      listDomainsAction({ sdk: fakeSdk, args: { siteId: 'testSiteId' } }),
    ).resolves.toBeUndefined();

    expect(fakeSdk.sites().get as Mock).toHaveBeenNthCalledWith(1, {
      id: 'testSiteId',
    });
    expect(fakeSdk.domains().listByZoneId as Mock).toHaveBeenNthCalledWith(1, {
      zoneId: 'testZoneId',
    });
    expect(fakeOutput.table).toHaveBeenCalledWith([
      {
        Hostname: 'first.xyz',
        Status: 'ACTIVE',
        'Created At': '2023-02-01T00:00:00.000Z',
      },
    ]);
  });
});
