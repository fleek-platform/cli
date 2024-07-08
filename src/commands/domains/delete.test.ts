import { DomainNotFoundError } from '@fleek-platform/errors';
import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk';
import { type Mock, describe, expect, it, vi } from 'vitest';

import { output as fakeOutput } from '../../cli';
import { checkPeriodicallyUntil as fakeCheckPeriodicallyUntil } from '../../utils/checkPeriodicallyUntil';
import { deleteDomainAction } from './delete';

vi.mock('./prompts/getDomainOrPrompt', () => ({
  getDomainOrPrompt: vi.fn().mockResolvedValue({
    id: 'firstDomainId',
    hostname: 'first.xyz',
  }),
}));

vi.mock('../../utils/checkPeriodicallyUntil', () => ({
  checkPeriodicallyUntil: vi
    .fn()
    .mockImplementation(
      async <T>({
        conditionFn,
      }: { conditionFn: () => Promise<T> }): Promise<T> => {
        return conditionFn();
      },
    ),
}));

vi.mock('../../cli', () => {
  const output = {
    error: vi.fn(),
    quoted: vi.fn().mockImplementation((message: string) => `"${message}"`),
    spinner: vi.fn(),
    success: vi.fn(),
    printNewLine: vi.fn(),
  };

  return { output };
});

vi.mock('@fleek-platform/sdk', () => {
  const FleekSdkMock = vi.fn();

  const domains = {
    get: vi
      .fn()
      .mockRejectedValue(
        new DomainNotFoundError({ domain: { id: 'firstDomainId' } }),
      ),
    deleteDomain: vi.fn().mockResolvedValue(undefined),
  };

  FleekSdkMock.prototype.domains = () => domains;

  return { FleekSdk: FleekSdkMock, PersonalAccessTokenService: vi.fn() };
});

describe('Delete domain', () => {
  it('Domain was deleted', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(
      deleteDomainAction({ sdk: fakeSdk, args: { hostname: 'first.xyz' } }),
    ).resolves.toBeUndefined();

    expect(fakeSdk.domains().get).toHaveBeenCalledWith({
      domainId: 'firstDomainId',
    });
    expect(fakeSdk.domains().deleteDomain).toHaveBeenCalledWith({
      domainId: 'firstDomainId',
    });
    expect(fakeCheckPeriodicallyUntil).toHaveBeenCalledOnce();

    expect(fakeOutput.success).toHaveBeenCalledWith(
      `The domain "first.xyz" has been successfully deleted.`,
    );
    expect(fakeOutput.error).not.toHaveBeenCalled();
  });

  it(`Domain wasn't deleted`, async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });
    (fakeSdk.domains().get as Mock).mockResolvedValueOnce({
      id: 'firstDomainId',
      hostname: 'first.xyz',
    });

    await expect(
      deleteDomainAction({ sdk: fakeSdk, args: { hostname: 'fleek.xyz' } }),
    ).resolves.toBeUndefined();

    expect(fakeSdk.domains().get).toHaveBeenCalledWith({
      domainId: 'firstDomainId',
    });
    expect(fakeSdk.domains().deleteDomain).toHaveBeenCalledWith({
      domainId: 'firstDomainId',
    });

    expect(fakeOutput.success).not.toHaveBeenCalled();
    expect(fakeOutput.error).toHaveBeenCalledWith(
      `Unable to delete domain "first.xyz".`,
    );
  });
});
