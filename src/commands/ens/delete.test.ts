import { EnsRecordNotFoundError } from '@fleek-platform/errors';
import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk';
import { type Mock, describe, expect, it, vi } from 'vitest';

import { output as fakeOutput } from '../../cli';
import { checkPeriodicallyUntil as fakeCheckPeriodicallyUntil } from '../../utils/checkPeriodicallyUntil';
import { deleteEnsAction } from './delete';

vi.mock('./prompts/getEnsRecordOrPrompt', () => ({
  getEnsRecordOrPrompt: vi.fn().mockResolvedValue({
    id: 'firstEnsId',
    name: 'first.eth',
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
    hint: vi.fn(),
    printNewLine: vi.fn(),
  };

  return { output };
});

vi.mock('@fleek-platform/sdk', () => {
  const FleekSdkMock = vi.fn();

  const ens = {
    get: vi
      .fn()
      .mockRejectedValue(
        new EnsRecordNotFoundError({ ensRecord: { id: 'firstEnsId' } }),
      ),
    delete: vi.fn().mockResolvedValue(undefined),
  };

  FleekSdkMock.prototype.ens = () => ens;

  return { FleekSdk: FleekSdkMock, PersonalAccessTokenService: vi.fn() };
});

describe('Delete ENS record', () => {
  it('ENS record was deleted', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(
      deleteEnsAction({ sdk: fakeSdk, args: { name: 'first.eth' } }),
    ).resolves.toBeUndefined();

    expect(fakeSdk.ens().get).toHaveBeenCalledWith({ id: 'firstEnsId' });
    expect(fakeSdk.ens().delete).toHaveBeenCalledWith({ id: 'firstEnsId' });
    expect(fakeCheckPeriodicallyUntil).toHaveBeenCalledOnce();

    expect(fakeOutput.success).toHaveBeenCalledWith(
      `The ENS "first.eth" has been successfully deleted.`,
    );
    expect(fakeOutput.error).not.toHaveBeenCalled();
  });

  it(`ENS record wasn't deleted`, async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });
    (fakeSdk.ens().get as Mock).mockResolvedValueOnce({
      id: 'firstEnsId',
      hostname: 'first.eth',
    });

    await expect(
      deleteEnsAction({ sdk: fakeSdk, args: { name: 'fleek.eth' } }),
    ).resolves.toBeUndefined();

    expect(fakeSdk.ens().get).toHaveBeenCalledWith({ id: 'firstEnsId' });
    expect(fakeSdk.ens().delete).toHaveBeenCalledWith({ id: 'firstEnsId' });

    expect(fakeOutput.success).not.toHaveBeenCalled();
    expect(fakeOutput.error).toHaveBeenCalledWith(
      `Cannot delete the ENS "first.eth".`,
    );
  });
});
