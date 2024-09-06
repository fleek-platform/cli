import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk/node';
import { type Mock, describe, expect, it, vi } from 'vitest';

import { output } from '../../cli';
import { checkPeriodicallyUntil as fakeCheckPeriodicallyUntil } from '../../utils/checkPeriodicallyUntil';
import { getDomainOrPrompt } from './prompts/getDomainOrPrompt';
import { verifyDomainAction } from './verify';

vi.mock('./prompts/getDomainOrPrompt', () => ({
  getDomainOrPrompt: vi.fn().mockResolvedValue({
    id: 'firstDomainId',
    hostname: 'first.xyz',
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
  };

  return { output };
});

vi.mock('@fleek-platform/sdk/node', () => {
  const FleekSdkMock = vi.fn();

  const domains = {
    verifyDomain: vi.fn().mockResolvedValue(undefined),
    get: vi.fn().mockResolvedValue({ id: 'firstDomainId', status: 'ACTIVE' }),
  };

  FleekSdkMock.prototype.domains = () => domains;

  return { FleekSdk: FleekSdkMock, PersonalAccessTokenService: vi.fn() };
});

describe('Verify domain', () => {
  it('Domain was successfully verified', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(
      verifyDomainAction({ sdk: fakeSdk, args: { id: 'firstDomainId' } }),
    ).resolves.toBeUndefined();

    expect(getDomainOrPrompt).toHaveBeenCalledWith({
      sdk: fakeSdk,
      id: 'firstDomainId',
      choicesFilter: expect.any(Function),
    });
    expect(fakeCheckPeriodicallyUntil).toHaveBeenCalledOnce();
    expect(fakeSdk.domains().verifyDomain).toHaveBeenCalledWith({
      domainId: 'firstDomainId',
    });
    expect(fakeSdk.domains().get).toHaveBeenCalledWith({
      domainId: 'firstDomainId',
    });

    expect(output.success).toHaveBeenCalledWith(
      `The domain "first.xyz" has been successfully verified.`,
    );
    expect(output.error).not.toHaveBeenCalled();
  });

  it('Domain is already verified', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });
    (getDomainOrPrompt as Mock).mockResolvedValueOnce({
      id: 'firstDomainId',
      hostname: 'first.xyz',
      status: 'ACTIVE',
      createdAt: '2023-02-01T00:00:00.000Z',
    });

    await expect(
      verifyDomainAction({ sdk: fakeSdk, args: { id: 'firstDomainId' } }),
    ).resolves.toBeUndefined();

    expect(fakeSdk.domains().verifyDomain).not.toHaveBeenCalled();

    expect(output.success).toHaveBeenCalledWith(
      `The domain "first.xyz" has already been verified.`,
    );
    expect(output.error).not.toHaveBeenCalled();
  });

  it(`Domain wasn't verified`, async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });
    (fakeSdk.domains().get as Mock).mockResolvedValue({
      id: 'firstDomainId',
      status: 'VERIFYING_FAILED',
    });

    await expect(
      verifyDomainAction({ sdk: fakeSdk, args: { hostname: 'first.xyz' } }),
    ).resolves.toBeUndefined();

    expect(getDomainOrPrompt).toHaveBeenCalledWith({
      sdk: fakeSdk,
      hostname: 'first.xyz',
      choicesFilter: expect.any(Function),
    });
    expect(output.success).not.toHaveBeenCalled();
    expect(output.error).toHaveBeenCalledWith(
      `The verification of domain "first.xyz" failed. Please ensure your provider has the correct DNS configuration.`,
    );
  });

  it('Domain verification takes too long and user must manually obtain result', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });
    (fakeSdk.domains().get as Mock).mockResolvedValue({
      id: 'firstDomainId',
      status: 'VERIFYING',
    });

    await expect(
      verifyDomainAction({ sdk: fakeSdk, args: {} }),
    ).resolves.toBeUndefined();

    expect(getDomainOrPrompt).toHaveBeenCalledWith({
      sdk: fakeSdk,
      choicesFilter: expect.any(Function),
    });
    expect(output.success).not.toHaveBeenCalled();
    expect(output.warn).toHaveBeenCalledWith(
      'The process of verifying your domain is taking longer than anticipated.',
    );
  });
});
