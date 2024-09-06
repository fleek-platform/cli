import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk/node';
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';

import { output as fakeOutput } from '../../cli';
import type { CheckPeriodicallyUntilArgs } from '../../utils/checkPeriodicallyUntil';
import { usePressAnyKey as fakeUsePressAnyKey } from '../../utils/pressAnyKey';
import { createDomainAction } from './create';
import { getHostnameOrPrompt as fakeGetHostnameOrPrompt } from './prompts/getHostnameOrPrompt';
import { getSiteOrPrivateGateway as fakeGetSiteOrPrivateGateway } from './prompts/getSiteOrPrivateGateway';

vi.mock('./prompts/getSiteOrPrivateGateway', () => ({
  getSiteOrPrivateGateway: vi.fn().mockResolvedValue({
    site: {
      id: 'firstSiteId',
      slug: 'first-first-first',
      zones: [],
    },
  }),
}));

vi.mock('./prompts/getHostnameOrPrompt', () => ({
  getHostnameOrPrompt: vi.fn().mockResolvedValue('first.xyz'),
}));

vi.mock('../../utils/checkPeriodicallyUntil', () => {
  const checkPeriodicallyUntil = async <T>({
    conditionFn,
  }: CheckPeriodicallyUntilArgs<T>): Promise<T> => {
    return conditionFn();
  };

  return { checkPeriodicallyUntil };
});

vi.mock('../../cli', () => {
  const output = {
    log: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    success: vi.fn(),
    spinner: vi.fn(),
    quoted: vi.fn().mockImplementation((text: string) => `"${text}"`),
    textColor: vi.fn(),
    printNewLine: vi.fn(),
    hint: vi.fn(),
  };

  return { output };
});

vi.mock('../../utils/pressAnyKey', () => {
  const waitForAnyKey = vi.fn().mockResolvedValue(undefined);

  return {
    usePressAnyKey: () => ({
      waitForAnyKey,
    }),
  };
});

vi.mock('@fleek-platform/sdk/node', () => {
  const FleekSdkMock = vi.fn();

  const domains = {
    createZoneForSite: vi
      .fn()
      .mockResolvedValue({ id: 'firstZoneId', status: 'CREATING' }),
    getZone: vi
      .fn()
      .mockResolvedValue({ id: 'firstZoneId', status: 'CREATED' }),
    createDomain: vi.fn(),
    verifyDomain: vi.fn(),
    get: vi.fn().mockResolvedValue({ id: 'firstDomainId', status: 'ACTIVE' }),
    getByHostname: vi.fn().mockResolvedValue({
      id: 'firstDomainId',
      status: 'CREATED',
      dnsConfigs: [{ type: 'CNAME', value: 'first-fleek.bunnycdn.net' }],
    }),
  };

  FleekSdkMock.prototype.domains = () => domains;

  return { FleekSdk: FleekSdkMock, PersonalAccessTokenService: vi.fn() };
});

type TestContext = {
  fakeSdk: FleekSdk;
};

describe('Create domain for site', () => {
  beforeEach<TestContext>((context) => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });

    context.fakeSdk = new FleekSdk({ accessTokenService });
  });

  it<TestContext>('Domain was created for private gateway and successfully verified', async (context) => {
    (fakeGetSiteOrPrivateGateway as Mock).mockResolvedValueOnce({
      privateGateway: {
        id: 'goldPrivateGatewayId',
        slug: 'first-blue-fish',
        name: 'gold',
        zone: { id: 'goldZoneId' },
      },
    });
    (fakeGetHostnameOrPrompt as Mock).mockResolvedValueOnce('gold.xyz');
    (context.fakeSdk.domains().get as Mock).mockResolvedValueOnce({
      id: 'goldDomainId',
      status: 'ACTIVE',
    });

    const fakeGetByHostnameResult = {
      id: 'goldDomainId',
      status: 'CREATED',
      dnsConfigs: [{ type: 'CNAME', value: 'gold-fleek.bunnycdn.net' }],
    };
    (context.fakeSdk.domains().getByHostname as Mock)
      .mockResolvedValueOnce(fakeGetByHostnameResult)
      .mockResolvedValueOnce(fakeGetByHostnameResult);

    await expect(
      createDomainAction({
        sdk: context.fakeSdk,
        args: { privateGatewaySlug: 'first-blue-fish', hostname: 'gold.xyz' },
      }),
    ).resolves.toBeUndefined();

    expect(fakeGetSiteOrPrivateGateway).toHaveBeenCalledWith({
      sdk: context.fakeSdk,
      privateGatewaySlug: 'first-blue-fish',
    });
    expect(fakeGetHostnameOrPrompt).toHaveBeenCalledWith({
      hostname: 'gold.xyz',
    });
    expect(context.fakeSdk.domains().createZoneForSite).not.toHaveBeenCalled();
    expect(context.fakeSdk.domains().createDomain).toHaveBeenCalledWith({
      zoneId: 'goldZoneId',
      hostname: 'gold.xyz',
    });
    expect(context.fakeSdk.domains().getByHostname).toHaveBeenCalledWith({
      hostname: 'gold.xyz',
    });
    expect(context.fakeSdk.domains().verifyDomain).toHaveBeenCalledWith({
      domainId: 'goldDomainId',
    });
    expect(context.fakeSdk.domains().get).toHaveBeenCalledWith({
      domainId: 'goldDomainId',
    });

    expect(fakeOutput.spinner).toHaveBeenCalledWith(
      'Creating new domain for chosen private gateway...',
    );

    const { waitForAnyKey } = fakeUsePressAnyKey();
    expect(waitForAnyKey).toHaveBeenCalledOnce();

    expect(fakeOutput.success).toHaveBeenCalledWith(
      `The domain "gold.xyz" has been successfully created.`,
    );
    expect(fakeOutput.success).toHaveBeenCalledWith(
      `Domain "gold.xyz" was verified.`,
    );
    expect(fakeOutput.warn).not.toHaveBeenCalled();
    expect(fakeOutput.error).not.toHaveBeenCalled();
    expect(fakeOutput.log).toHaveBeenCalledWith(
      'CNAME @ gold-fleek.bunnycdn.net',
    );
  });

  it<TestContext>('Zone was created for site, domain was created and successfully verified', async (context) => {
    await expect(
      createDomainAction({
        sdk: context.fakeSdk,
        args: { siteId: 'firstSiteId', hostname: 'first.xyz' },
      }),
    ).resolves.toBeUndefined();

    expect(fakeGetSiteOrPrivateGateway).toHaveBeenCalledWith({
      sdk: context.fakeSdk,
      siteId: 'firstSiteId',
    });
    expect(fakeGetHostnameOrPrompt).toHaveBeenCalledWith({
      hostname: 'first.xyz',
    });
    expect(context.fakeSdk.domains().createZoneForSite).toHaveBeenCalledWith({
      siteId: 'firstSiteId',
    });
    expect(context.fakeSdk.domains().createDomain).toHaveBeenCalledWith({
      zoneId: 'firstZoneId',
      hostname: 'first.xyz',
    });
    expect(context.fakeSdk.domains().getByHostname).toHaveBeenCalledWith({
      hostname: 'first.xyz',
    });
    expect(context.fakeSdk.domains().verifyDomain).toHaveBeenCalledWith({
      domainId: 'firstDomainId',
    });
    expect(context.fakeSdk.domains().get).toHaveBeenCalledWith({
      domainId: 'firstDomainId',
    });

    expect(fakeOutput.spinner).toHaveBeenCalledWith(
      'Creating new domain for chosen site',
    );

    const { waitForAnyKey } = fakeUsePressAnyKey();
    expect(waitForAnyKey).toHaveBeenCalledOnce();

    expect(fakeOutput.success).toHaveBeenCalledWith(
      `The domain "first.xyz" has been successfully created.`,
    );
    expect(fakeOutput.success).toHaveBeenCalledWith(
      `Domain "first.xyz" was verified.`,
    );
    expect(fakeOutput.warn).not.toHaveBeenCalled();
    expect(fakeOutput.error).not.toHaveBeenCalled();
  });

  it<TestContext>('Zone already exists for site, domain was created and successfully verified', async (context) => {
    (fakeGetSiteOrPrivateGateway as Mock).mockResolvedValueOnce({
      site: {
        id: 'firstSiteId',
        slug: 'first-first-first',
        zones: [{ id: 'firstZoneId', status: 'CREATED' }],
      },
    });

    await expect(
      createDomainAction({
        sdk: context.fakeSdk,
        args: { siteId: 'firstSiteId', hostname: 'first.xyz' },
      }),
    ).resolves.toBeUndefined();

    expect(context.fakeSdk.domains().createZoneForSite).not.toHaveBeenCalled();

    expect(fakeOutput.success).toHaveBeenCalledWith(
      `Domain "first.xyz" was verified.`,
    );
    expect(fakeOutput.warn).not.toHaveBeenCalled();
    expect(fakeOutput.error).not.toHaveBeenCalled();
  });

  it<TestContext>(`Zone for site wasn't created because of some issues`, async (context) => {
    (context.fakeSdk.domains().getZone as Mock).mockResolvedValueOnce({
      id: 'firstZoneId',
      status: 'CREATING_FAILED',
    });

    await expect(
      createDomainAction({
        sdk: context.fakeSdk,
        args: { siteId: 'firstSiteId', hostname: 'first.xyz' },
      }),
    ).resolves.toBeUndefined();

    expect(fakeOutput.success).not.toHaveBeenCalled();
    expect(fakeOutput.error).toHaveBeenCalledWith(
      `Your domain couldn't be created. Try it again.`,
    );
  });

  it<TestContext>('Creating of domain takes too long', async (context) => {
    (context.fakeSdk.domains().getByHostname as Mock).mockResolvedValueOnce({
      id: 'firstDomainId',
      status: 'CREATING',
    });

    await expect(
      createDomainAction({ sdk: context.fakeSdk, args: {} }),
    ).resolves.toBeUndefined();

    expect(fakeOutput.success).not.toHaveBeenCalled();
    expect(fakeOutput.warn).toHaveBeenCalledWith(
      'The DNS configuration is taking longer than anticipated.',
    );
    expect(fakeOutput.error).not.toHaveBeenCalled();
  });

  it<TestContext>(`Domain wasn't created for some reason`, async (context) => {
    (context.fakeSdk.domains().getByHostname as Mock).mockResolvedValueOnce({
      id: 'firstDomainId',
      status: 'CREATING_FAILED',
    });

    await expect(
      createDomainAction({ sdk: context.fakeSdk, args: {} }),
    ).resolves.toBeUndefined();

    expect(fakeOutput.success).not.toHaveBeenCalled();
    expect(fakeOutput.warn).not.toHaveBeenCalled();
    expect(fakeOutput.error).toHaveBeenCalledWith(
      `Your domain couldn't be created. Try it again.`,
    );
  });

  it<TestContext>('Verifying of domain takes too long', async (context) => {
    (context.fakeSdk.domains().get as Mock).mockResolvedValueOnce({
      id: 'firstDomainId',
      status: 'VERIFYING',
    });

    await expect(
      createDomainAction({ sdk: context.fakeSdk, args: {} }),
    ).resolves.toBeUndefined();

    expect(fakeOutput.success).toHaveBeenCalledOnce();
    expect(fakeOutput.warn).toHaveBeenCalledWith(
      'The DNS configuration is taking longer than anticipated.',
    );
    expect(fakeOutput.error).not.toHaveBeenCalled();
  });

  it<TestContext>(`Domain wasn't verified for some reason`, async (context) => {
    (context.fakeSdk.domains().get as Mock).mockResolvedValueOnce({
      id: 'firstDomainId',
      status: 'VERIFYING_FAILED',
    });

    const { waitForAnyKey } = fakeUsePressAnyKey();
    (waitForAnyKey as Mock).mockResolvedValueOnce(undefined);
    (waitForAnyKey as Mock).mockRejectedValue('Ctrl+C');

    await expect(
      createDomainAction({ sdk: context.fakeSdk, args: {} }),
    ).rejects.toThrowError('Ctrl+C');

    expect(waitForAnyKey).toHaveBeenCalledTimes(2);

    expect(fakeOutput.success).toHaveBeenCalledOnce();
    expect(fakeOutput.warn).not.toHaveBeenCalled();
    expect(fakeOutput.error).toHaveBeenCalledWith(
      `The verification of domain "first.xyz" failed. Please ensure your provider has the correct DNS configuration.`,
    );
  });
});
