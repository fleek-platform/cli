import { FleekFunctionsNotFoundError } from '@fleek-platform/errors';
import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk/node';
import { type Mock, describe, expect, it, vi } from 'vitest';

import { selectPrompt } from '../../../prompts/selectPrompt';
import { getFunctionOrPrompt } from './getFunctionOrPrompt';

vi.mock('../../../prompts/selectPrompt', () => ({
  selectPrompt: vi.fn().mockResolvedValue('secondFunctionId'),
}));

vi.mock('@fleek-platform/sdk/node', () => {
  const FleekSdkMock = vi.fn();

  const functions = {
    get: vi.fn().mockResolvedValue({
      name: 'firstFunctionName',
      slug: 'first-first-first',
      id: 'firstFunctionId',
    }),
    getBySlug: vi.fn().mockResolvedValue({
      name: 'secondFunctionName',
      slug: 'second-second-second',
      id: 'secondFunctionId',
    }),
    list: vi.fn().mockResolvedValue([
      {
        name: 'firstFunctionName',
        slug: 'first-first-first',
        id: 'firstFunctionId',
      },
      {
        name: 'secondFunctionName',
        slug: 'second-second-second',
        id: 'secondFunctionId',
      },
    ]),
  };

  FleekSdkMock.prototype.functions = () => functions;

  return { FleekSdk: FleekSdkMock, PersonalAccessTokenService: vi.fn() };
});

describe('Get function by name, or let the user choose from list', () => {
  it('Return function by its name', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(
      getFunctionOrPrompt({ sdk: fakeSdk, name: 'firstFunctionName' }),
    ).resolves.toEqual({
      name: 'firstFunctionName',
      slug: 'first-first-first',
      id: 'firstFunctionId',
    });

    expect(fakeSdk.functions().get).toHaveBeenCalledWith({
      name: 'firstFunctionName',
    });
  });

  it('Let the user choose from list and return chosen function', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(getFunctionOrPrompt({ sdk: fakeSdk })).resolves.toEqual({
      name: 'secondFunctionName',
      slug: 'second-second-second',
      id: 'secondFunctionId',
    });

    expect(fakeSdk.functions().list).toHaveBeenCalledOnce();
    expect(selectPrompt).toHaveBeenCalledOnce();
  });

  it('should throw if no functions exist', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });
    (fakeSdk.functions().list as Mock).mockResolvedValue([]);
    await expect(getFunctionOrPrompt({ sdk: fakeSdk })).rejects.toThrowError(
      new FleekFunctionsNotFoundError({}),
    );

    expect(fakeSdk.functions().list).toHaveBeenCalledOnce();
    expect(selectPrompt).not.toHaveBeenCalled();
  });
});
