import { PrivateGatewaysNotFoundError } from '@fleek-platform/errors';
import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk';
// eslint-disable-next-line no-restricted-imports
import prompts from 'prompts';
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';

import { getPrivateGatewayOrPrompt } from './getPrivateGatewayOrPrompt';

vi.mock('prompts', () => ({
  default: vi.fn().mockResolvedValue({ value: 'secondPrivateGatewayId' }),
}));

vi.mock('@fleek-platform/sdk', () => {
  const FleekSdkMock = vi.fn();

  const privateGateways = {
    get: vi.fn().mockResolvedValue({
      id: 'thirdPrivateGatewayId',
      slug: 'three-white-apple',
      name: 'third gateway',
    }),
    getBySlug: vi.fn().mockResolvedValue({
      id: 'firstPrivateGatewayId',
      slug: 'one-green-fish',
      name: 'first gateway',
    }),
    list: vi.fn().mockResolvedValue([
      {
        id: 'firstPrivateGatewayId',
        slug: 'one-green-fish',
        name: 'first gateway',
      },
      {
        id: 'secondPrivateGatewayId',
        slug: 'two-blue-fox',
        name: 'second gateway',
      },
      {
        id: 'thirdPrivateGatewayId',
        slug: 'three-white-apple',
        name: 'third gateway',
      },
    ]),
  };

  FleekSdkMock.prototype.privateGateways = () => privateGateways;

  return { FleekSdk: FleekSdkMock, PersonalAccessTokenService: vi.fn() };
});

type TestContext = {
  fakeSdk: FleekSdk;
};

describe('Get private gateway by id or slug. When nothing passed let the user choose from list', () => {
  beforeEach<TestContext>((context) => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });

    context.fakeSdk = new FleekSdk({ accessTokenService });
  });

  it<TestContext>('Return private gateway by its id', async (context) => {
    await expect(
      getPrivateGatewayOrPrompt({
        sdk: context.fakeSdk,
        id: 'thirdPrivateGatewayId',
      }),
    ).resolves.toEqual({
      id: 'thirdPrivateGatewayId',
      slug: 'three-white-apple',
      name: 'third gateway',
    });

    expect(context.fakeSdk.privateGateways().get).toHaveBeenCalledWith({
      id: 'thirdPrivateGatewayId',
    });
    expect(context.fakeSdk.privateGateways().getBySlug).not.toHaveBeenCalled();
    expect(context.fakeSdk.privateGateways().list).not.toHaveBeenCalled();
    expect(prompts).not.toHaveBeenCalled();
  });

  it<TestContext>('Return private gateway by its slug', async (context) => {
    await expect(
      getPrivateGatewayOrPrompt({
        sdk: context.fakeSdk,
        slug: 'one-green-fish',
      }),
    ).resolves.toEqual({
      id: 'firstPrivateGatewayId',
      slug: 'one-green-fish',
      name: 'first gateway',
    });

    expect(context.fakeSdk.privateGateways().get).not.toHaveBeenCalled();
    expect(context.fakeSdk.privateGateways().getBySlug).toHaveBeenCalledWith({
      slug: 'one-green-fish',
    });
    expect(context.fakeSdk.privateGateways().list).not.toHaveBeenCalled();
    expect(prompts).not.toHaveBeenCalled();
  });

  it<TestContext>('Let the user choose from private gateways and return chosen private gateway', async (context) => {
    await expect(
      getPrivateGatewayOrPrompt({ sdk: context.fakeSdk }),
    ).resolves.toEqual({
      id: 'secondPrivateGatewayId',
      slug: 'two-blue-fox',
      name: 'second gateway',
    });

    expect(context.fakeSdk.privateGateways().get).not.toHaveBeenCalled();
    expect(context.fakeSdk.privateGateways().getBySlug).not.toHaveBeenCalled();
    expect(context.fakeSdk.privateGateways().list).toHaveBeenCalledOnce();
    expect(prompts).toHaveBeenCalledOnce();
  });

  it<TestContext>('Throw an error because no private gateways available under current project', async (context) => {
    (context.fakeSdk.privateGateways().list as Mock).mockResolvedValue([]);

    await expect(
      getPrivateGatewayOrPrompt({ sdk: context.fakeSdk }),
    ).rejects.toEqual(new PrivateGatewaysNotFoundError({}));

    expect(context.fakeSdk.privateGateways().get).not.toHaveBeenCalled();
    expect(context.fakeSdk.privateGateways().getBySlug).not.toHaveBeenCalled();
    expect(context.fakeSdk.privateGateways().list).toHaveBeenCalledOnce();
    expect(prompts).not.toHaveBeenCalled();
  });
});
