import { IpnsRecordsNotFoundError } from '@fleek-platform/errors';
import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk/node';
import { type Mock, describe, expect, it, vi } from 'vitest';

import { selectPrompt } from '../../../prompts/selectPrompt';
import { getRecordOrPrompt } from './getRecordOrPrompt';

vi.mock('../../../prompts/selectPrompt', () => ({
  selectPrompt: vi.fn().mockResolvedValue('secondRecordId'),
}));

vi.mock('@fleek-platform/sdk/node', () => {
  const FleekSdkMock = vi.fn();

  const ipns = {
    getRecord: vi
      .fn()
      .mockResolvedValue({ id: 'firstRecordId', name: 'first', hash: 'hash1' }),
    listRecords: vi.fn().mockResolvedValue([
      { id: 'firstRecordId', name: 'first', hash: 'hash1' },
      { id: 'secondRecordId', name: 'second', hash: 'hash2' },
    ]),
  };

  FleekSdkMock.prototype.ipns = () => ipns;

  return { FleekSdk: FleekSdkMock, PersonalAccessTokenService: vi.fn() };
});

describe('Get record by name or let the user choose from list', () => {
  it('Return record by its name', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(
      getRecordOrPrompt({ sdk: fakeSdk, name: 'first' }),
    ).resolves.toEqual({
      id: 'firstRecordId',
      name: 'first',
      hash: 'hash1',
    });

    expect(fakeSdk.ipns().getRecord).toHaveBeenCalledWith({ name: 'first' });
  });

  it('Let the user choose from list and return chosen record', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(getRecordOrPrompt({ sdk: fakeSdk })).resolves.toEqual({
      id: 'secondRecordId',
      name: 'second',
      hash: 'hash2',
    });

    expect(fakeSdk.ipns().listRecords).toHaveBeenCalledOnce();
    expect(selectPrompt).toHaveBeenCalledOnce();
  });

  it('should throw if no records are present', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });
    (fakeSdk.ipns().listRecords as Mock).mockResolvedValue([]);
    await expect(getRecordOrPrompt({ sdk: fakeSdk })).rejects.toThrowError(
      new IpnsRecordsNotFoundError(),
    );

    expect(fakeSdk.ipns().listRecords).toHaveBeenCalledOnce();
    expect(selectPrompt).not.toHaveBeenCalled();
  });
});
