import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk';
import { type Mock, describe, expect, it, vi } from 'vitest';

import { output } from '../../cli';
import type { CheckPeriodicallyUntilArgs } from '../../utils/checkPeriodicallyUntil';
import { createDomainAction } from '../domains/create';
import { createPrivateGatewayAction } from './create';

vi.mock('../../utils/checkPeriodicallyUntil', () => {
  const checkPeriodicallyUntil = async <T>({
    conditionFn,
  }: CheckPeriodicallyUntilArgs<T>): Promise<T> => {
    return conditionFn();
  };

  return { checkPeriodicallyUntil };
});

vi.mock('./prompts/getPrivateGatewayNameOrPrompt', () => ({
  getPrivateGatewayNameOrPrompt: vi.fn().mockResolvedValue('first'),
}));

vi.mock('../domains/create', () => ({ createDomainAction: vi.fn() }));

vi.mock('../../cli', () => {
  const output = {
    success: vi.fn(),
    error: vi.fn(),
    spinner: vi.fn(),
    quoted: vi.fn().mockImplementation((text: string) => `"${text}"`),
    printNewLine: vi.fn(),
  };

  return { output };
});

vi.mock('@fleek-platform/sdk', () => {
  const FleekSdkMock = vi.fn();

  const domains = {
    getZone: vi
      .fn()
      .mockResolvedValue({ id: 'firstZoneId', status: 'CREATED' }),
    createZoneForPrivateGateway: vi
      .fn()
      .mockResolvedValue({ id: 'firstZoneId' }),
  };

  FleekSdkMock.prototype.domains = () => domains;

  const privateGateways = {
    create: vi.fn().mockResolvedValue({ id: 'firstPrivateGatewayId' }),
  };

  FleekSdkMock.prototype.privateGateways = () => privateGateways;

  return { FleekSdk: FleekSdkMock, PersonalAccessTokenService: vi.fn() };
});

describe('Create private gateway', () => {
  it('should successfully create private gateway', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(
      createPrivateGatewayAction({ sdk: fakeSdk, args: { name: 'first' } }),
    ).resolves.toBeUndefined();

    expect(
      fakeSdk.domains().createZoneForPrivateGateway,
    ).toHaveBeenCalledOnce();
    expect(fakeSdk.privateGateways().create).toHaveBeenCalledWith({
      name: 'first',
      zoneId: 'firstZoneId',
    });

    expect(output.spinner).toHaveBeenCalledWith(
      'Creating a new private gateway...',
    );
    expect(output.success).toHaveBeenCalledWith(
      'The Private Gateway "first" has been successfully created.',
    );
    expect(output.error).not.toHaveBeenCalled();

    expect(createDomainAction).toHaveBeenCalledWith({
      sdk: fakeSdk,
      args: { privateGatewayId: 'firstPrivateGatewayId' },
    });
  });

  it('should not create private gateway because creating of zone failed', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });
    (fakeSdk.domains().getZone as Mock).mockResolvedValueOnce({
      id: 'firstZoneId',
      status: 'CREATING_FAILED',
    });

    await expect(
      createPrivateGatewayAction({ sdk: fakeSdk, args: { name: 'first' } }),
    ).resolves.toBeUndefined();

    expect(output.success).not.toHaveBeenCalled();
    expect(output.error).toHaveBeenCalledWith(
      'Failed to create the private gateway. Please try again.',
    );
  });
});
