import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk/node';
import { type Mock, describe, expect, it, vi } from 'vitest';

import { output } from '../../cli';
import { checkPeriodicallyUntil as fakeCheckPeriodicallyUntil } from '../../utils/checkPeriodicallyUntil';
import { getEnsRecordOrPrompt } from './prompts/getEnsRecordOrPrompt';
import { verifyEnsRecordAction } from './verify';

vi.mock('./prompts/getEnsRecordOrPrompt', () => ({
  getEnsRecordOrPrompt: vi.fn().mockResolvedValue({
    id: 'firstEnsId',
    name: 'first.eth',
    status: 'CREATED',
    createdAt: '2023-02-01T00:00:00.000Z',
  }),
}));

vi.mock('../../utils/checkPeriodicallyUntil', () => ({
  checkPeriodicallyUntil: vi
    .fn()
    .mockImplementation(
      async <T>({
        conditionFn,
      }: { conditionFn: () => Promise<T> }): Promise<T> => {
        return await conditionFn();
      },
    ),
}));

vi.mock('../../cli', () => {
  const output = {
    textColor: vi.fn(),
    quoted: vi.fn().mockImplementation((text: string) => `"${text}"`),
    spinner: vi.fn(),
    printNewLine: vi.fn(),
    log: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    hint: vi.fn(),
  };

  return { output };
});

vi.mock('@fleek-platform/sdk/node', () => {
  const FleekSdkMock = vi.fn();

  const ens = {
    verify: vi.fn().mockResolvedValue(undefined),
    get: vi.fn().mockResolvedValue({ id: 'ensRecordId', status: 'ACTIVE' }),
  };

  FleekSdkMock.prototype.ens = () => ens;

  return { FleekSdk: FleekSdkMock, PersonalAccessTokenService: vi.fn() };
});

describe('Verify ENS record', () => {
  it('ENS record was successfully verified', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(
      verifyEnsRecordAction({ sdk: fakeSdk, args: { id: 'firstEnsId' } }),
    ).resolves.toBeUndefined();

    expect(getEnsRecordOrPrompt).toHaveBeenCalledWith({
      sdk: fakeSdk,
      id: 'firstEnsId',
      choicesFilter: expect.any(Function),
    });
    expect(fakeCheckPeriodicallyUntil).toHaveBeenCalledOnce();
    expect(fakeSdk.ens().verify).toHaveBeenCalledWith({ id: 'firstEnsId' });
    expect(fakeSdk.ens().get).toHaveBeenCalledWith({ id: 'firstEnsId' });

    expect(output.success).toHaveBeenCalledWith(
      `The ENS "first.eth" was verified.`,
    );
    expect(output.error).not.toHaveBeenCalled();
  });

  it('ENS record is already verified', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });
    (getEnsRecordOrPrompt as Mock).mockResolvedValueOnce({
      id: 'firstEnsId',
      name: 'first.eth',
      status: 'ACTIVE',
      createdAt: '2023-02-01T00:00:00.000Z',
    });

    await expect(
      verifyEnsRecordAction({ sdk: fakeSdk, args: { id: 'firstEnsId' } }),
    ).resolves.toBeUndefined();

    expect(fakeSdk.ens().verify).not.toHaveBeenCalled();

    expect(output.success).toHaveBeenCalledWith(
      `The ENS "first.eth" is already verified.`,
    );
    expect(output.error).not.toHaveBeenCalled();
  });

  it(`ENS record wasn't verified`, async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });
    (fakeSdk.ens().get as Mock).mockResolvedValue({
      id: 'firstEnsId',
      status: 'VERIFYING_FAILED',
    });

    await expect(
      verifyEnsRecordAction({ sdk: fakeSdk, args: { name: 'first.eth' } }),
    ).resolves.toBeUndefined();

    expect(getEnsRecordOrPrompt).toHaveBeenCalledWith({
      sdk: fakeSdk,
      name: 'first.eth',
      choicesFilter: expect.any(Function),
    });
    expect(output.success).not.toHaveBeenCalled();
    expect(output.error).toHaveBeenCalledWith(
      `ENS "first.eth" couldn't be verified! Check https://app.ens.domains/first.eth?tab=records "Content Hash" field.`,
    );
  });

  it('ENS record verification takes too long and user must manually obtain result', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });
    (fakeSdk.ens().get as Mock).mockResolvedValue({
      id: 'firstEnsId',
      status: 'VERIFYING',
    });

    await expect(
      verifyEnsRecordAction({ sdk: fakeSdk, args: {} }),
    ).resolves.toBeUndefined();

    expect(getEnsRecordOrPrompt).toHaveBeenCalledWith({
      sdk: fakeSdk,
      choicesFilter: expect.any(Function),
    });
    expect(output.success).not.toHaveBeenCalled();
    expect(output.warn).toHaveBeenCalledWith(
      'The process of verifying your ENS is taking longer than anticipated.',
    );
  });
});
