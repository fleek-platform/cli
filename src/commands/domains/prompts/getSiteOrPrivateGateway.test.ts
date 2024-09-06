import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk/node';
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';

import { selectPrompt } from '../../../prompts/selectPrompt';
import { getPrivateGatewayOrPrompt } from '../../gateways/prompts/getPrivateGatewayOrPrompt';
import { getSiteOrPrompt } from '../../sites/prompts/getSiteOrPrompt';
import { getSiteOrPrivateGateway } from './getSiteOrPrivateGateway';

vi.mock('../../../prompts/selectPrompt', () => ({
  selectPrompt: vi.fn().mockResolvedValue('PRIVATE_GATEWAY'),
}));

vi.mock('../../gateways/prompts/getPrivateGatewayOrPrompt', () => ({
  getPrivateGatewayOrPrompt: vi.fn().mockImplementation(({ id, slug }) => {
    if (id === 'firstPrivateGatewayId') {
      return {
        id: 'firstPrivateGatewayId',
        slug: 'one-blue-fish',
        name: 'first gateway',
      };
    }

    if (slug === 'two-green-fox') {
      return {
        id: 'secondPrivateGatewayId',
        slug: 'two-green-fox',
        name: 'second gateway',
      };
    }

    return {
      id: 'thirdPrivateGatewayId',
      slug: 'three-black-bus',
      name: 'third gateway',
    };
  }),
}));

vi.mock('../../sites/prompts/getSiteOrPrompt', () => ({
  getSiteOrPrompt: vi.fn().mockImplementation(({ id, slug }) => {
    if (id === 'firstSiteId') {
      return { id: 'firstSiteId', slug: 'one-yellow-car' };
    }

    if (slug === 'two-gold-plane') {
      return { id: 'secondSiteId', slug: 'two-gold-plane' };
    }

    return { id: 'thirdSiteId', slug: 'three-silver-sword' };
  }),
}));

vi.mock('@fleek-platform/sdk/node', () => ({
  FleekSdk: vi.fn(),
  PersonalAccessTokenService: vi.fn(),
}));

type TestContext = {
  fakeSdk: FleekSdk;
};

describe('Get private gateway or site by id or slug. When nothing passed let the user decide between private gateway or site and show him list accordingly', () => {
  beforeEach<TestContext>((context) => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });

    context.fakeSdk = new FleekSdk({ accessTokenService });
  });

  it<TestContext>('Return private gateway by its id', async (context) => {
    await expect(
      getSiteOrPrivateGateway({
        sdk: context.fakeSdk,
        privateGatewayId: 'firstPrivateGatewayId',
      }),
    ).resolves.toEqual({
      privateGateway: {
        id: 'firstPrivateGatewayId',
        slug: 'one-blue-fish',
        name: 'first gateway',
      },
    });

    expect(selectPrompt).not.toHaveBeenCalled();
    expect(getPrivateGatewayOrPrompt).toHaveBeenCalledWith({
      id: 'firstPrivateGatewayId',
      sdk: context.fakeSdk,
    });
    expect(getSiteOrPrompt).not.toHaveBeenCalled();
  });

  it<TestContext>('Return private gateway by its slug', async (context) => {
    await expect(
      getSiteOrPrivateGateway({
        sdk: context.fakeSdk,
        privateGatewaySlug: 'two-green-fox',
      }),
    ).resolves.toEqual({
      privateGateway: {
        id: 'secondPrivateGatewayId',
        slug: 'two-green-fox',
        name: 'second gateway',
      },
    });

    expect(selectPrompt).not.toHaveBeenCalled();
    expect(getPrivateGatewayOrPrompt).toHaveBeenCalledWith({
      slug: 'two-green-fox',
      sdk: context.fakeSdk,
    });
    expect(getSiteOrPrompt).not.toHaveBeenCalled();
  });

  it<TestContext>(`Return third private gateway based on user's selection`, async (context) => {
    await expect(
      getSiteOrPrivateGateway({ sdk: context.fakeSdk }),
    ).resolves.toEqual({
      privateGateway: {
        id: 'thirdPrivateGatewayId',
        slug: 'three-black-bus',
        name: 'third gateway',
      },
    });

    expect(selectPrompt).toHaveBeenCalledOnce();
    expect(getPrivateGatewayOrPrompt).toHaveBeenCalledWith({
      sdk: context.fakeSdk,
    });
    expect(getSiteOrPrompt).not.toHaveBeenCalled();
  });

  it<TestContext>('Return site by its id', async (context) => {
    await expect(
      getSiteOrPrivateGateway({ sdk: context.fakeSdk, siteId: 'firstSiteId' }),
    ).resolves.toEqual({
      site: {
        id: 'firstSiteId',
        slug: 'one-yellow-car',
      },
    });

    expect(selectPrompt).not.toHaveBeenCalled();
    expect(getPrivateGatewayOrPrompt).not.toHaveBeenCalled();
    expect(getSiteOrPrompt).toHaveBeenCalledWith({
      sdk: context.fakeSdk,
      id: 'firstSiteId',
    });
  });

  it<TestContext>('Return site by its slug', async (context) => {
    await expect(
      getSiteOrPrivateGateway({
        sdk: context.fakeSdk,
        siteSlug: 'two-gold-plane',
      }),
    ).resolves.toEqual({
      site: {
        id: 'secondSiteId',
        slug: 'two-gold-plane',
      },
    });

    expect(selectPrompt).not.toHaveBeenCalled();
    expect(getPrivateGatewayOrPrompt).not.toHaveBeenCalled();
    expect(getSiteOrPrompt).toHaveBeenCalledWith({
      sdk: context.fakeSdk,
      slug: 'two-gold-plane',
    });
  });

  it<TestContext>(`Return third site based on users's selection`, async (context) => {
    (selectPrompt as Mock).mockResolvedValueOnce('SITE');

    await expect(
      getSiteOrPrivateGateway({ sdk: context.fakeSdk }),
    ).resolves.toEqual({
      site: {
        id: 'thirdSiteId',
        slug: 'three-silver-sword',
      },
    });

    expect(selectPrompt).toHaveBeenCalledOnce();
    expect(getPrivateGatewayOrPrompt).not.toHaveBeenCalled();
    expect(getSiteOrPrompt).toHaveBeenCalledWith({ sdk: context.fakeSdk });
  });
});
