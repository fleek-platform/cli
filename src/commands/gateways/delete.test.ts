import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk/node';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { output } from '../../cli';
import type { CheckPeriodicallyUntilArgs } from '../../utils/checkPeriodicallyUntil';
import { deletePrivateGatewayAction } from './delete';
import { getPrivateGatewayOrPrompt } from './prompts/getPrivateGatewayOrPrompt';

vi.mock('../../utils/checkPeriodicallyUntil', () => {
  const checkPeriodicallyUntil = async <T>({
    conditionFn,
  }: CheckPeriodicallyUntilArgs<T>): Promise<T> => {
    return conditionFn();
  };

  return { checkPeriodicallyUntil };
});

vi.mock('./prompts/getPrivateGatewayOrPrompt', () => ({
  getPrivateGatewayOrPrompt: vi.fn().mockResolvedValue({
    id: 'firstPrivateGatewayId',
    slug: 'first-blue-fish',
    name: 'first gateway',
    zone: { id: 'firstZoneId' },
  }),
}));

vi.mock('../../cli', () => {
  const output = {
    success: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    spinner: vi.fn(),
    quoted: vi.fn().mockImplementation((text: string) => `"${text}"`),
    printNewLine: vi.fn(),
  };

  return { output };
});

vi.mock('@fleek-platform/sdk/node', () => {
  const FleekSdkMock = vi.fn();

  const privateGateways = {
    delete: vi.fn(),
  };

  FleekSdkMock.prototype.privateGateways = () => privateGateways;

  return { FleekSdk: FleekSdkMock, PersonalAccessTokenService: vi.fn() };
});

type TestContext = {
  fakeSdk: FleekSdk;
};

describe('Delete private gateway', () => {
  beforeEach<TestContext>(async (context) => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });

    context.fakeSdk = new FleekSdk({ accessTokenService });
  });

  it<TestContext>('should delete private gateway by its id', async (context) => {
    await expect(
      deletePrivateGatewayAction({
        sdk: context.fakeSdk,
        args: { id: 'firstPrivateGatewayId' },
      }),
    ).resolves.toBeUndefined();

    expect(getPrivateGatewayOrPrompt).toHaveBeenCalledWith({
      sdk: context.fakeSdk,
      id: 'firstPrivateGatewayId',
    });
    expect(context.fakeSdk.privateGateways().delete).toHaveBeenCalledWith({
      id: 'firstPrivateGatewayId',
    });

    expect(output.spinner).toHaveBeenCalledWith('Deleting private gateway');
    expect(output.success).toHaveBeenCalledWith(
      'The Private Gateway "first gateway" has been successfully deleted.',
    );
    expect(output.error).not.toHaveBeenCalled();
  });

  it<TestContext>('should delete private gateway by its slug', async (context) => {
    await expect(
      deletePrivateGatewayAction({
        sdk: context.fakeSdk,
        args: { slug: 'first-blue-fish' },
      }),
    ).resolves.toBeUndefined();

    expect(getPrivateGatewayOrPrompt).toHaveBeenCalledWith({
      sdk: context.fakeSdk,
      slug: 'first-blue-fish',
    });
    expect(context.fakeSdk.privateGateways().delete).toHaveBeenCalledWith({
      id: 'firstPrivateGatewayId',
    });

    expect(output.spinner).toHaveBeenCalledWith('Deleting private gateway');
    expect(output.success).toHaveBeenCalledWith(
      'The Private Gateway "first gateway" has been successfully deleted.',
    );
    expect(output.error).not.toHaveBeenCalled();
  });
});
