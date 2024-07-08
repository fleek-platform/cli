import { DomainsNotFoundError } from '@fleek-platform/errors';
import {
  type Domain,
  FleekSdk,
  PersonalAccessTokenService,
} from '@fleek-platform/sdk';
import { type Mock, describe, expect, it, vi } from 'vitest';

import { selectPrompt } from '../../../prompts/selectPrompt';
import { getDomainOrPrompt } from './getDomainOrPrompt';

vi.mock('../../../prompts/selectPrompt', () => ({
  selectPrompt: vi.fn().mockResolvedValue('secondDomainId'),
}));

vi.mock('@fleek-platform/sdk', () => {
  const FleekSdkMock = vi.fn();

  const domains = {
    get: vi
      .fn()
      .mockResolvedValue({ id: 'firstDomainId', hostname: 'first.xyz' }),
    getByHostname: vi.fn().mockResolvedValue({
      id: 'secondDomainId',
      hostname: 'second.xyz',
      isVerified: false,
    }),
    list: vi.fn().mockResolvedValue([
      { id: 'firstDomainId', hostname: 'first.xyz', isVerified: false },
      { id: 'secondDomainId', hostname: 'second.xyz', isVerified: false },
      { id: 'thirdDomainId', hostname: 'third.xyz', isVerified: true },
    ] as Domain[]),
  };

  FleekSdkMock.prototype.domains = () => domains;

  return { FleekSdk: FleekSdkMock, PersonalAccessTokenService: vi.fn() };
});

describe('Get domain by id, hostname or let the user choose from list', () => {
  it('Return domain by its id', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(
      getDomainOrPrompt({ sdk: fakeSdk, id: 'firstDomainId' }),
    ).resolves.toEqual({ id: 'firstDomainId', hostname: 'first.xyz' });

    expect(fakeSdk.domains().get).toHaveBeenCalledWith({
      domainId: 'firstDomainId',
    });
  });

  it('Return domain by its hostname', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(
      getDomainOrPrompt({ sdk: fakeSdk, hostname: 'second.xyz' }),
    ).resolves.toEqual({
      id: 'secondDomainId',
      hostname: 'second.xyz',
      isVerified: false,
    });

    expect(fakeSdk.domains().getByHostname).toHaveBeenCalledWith({
      hostname: 'second.xyz',
    });
  });

  it('Let the user choose from unverified domains and return chosen domain', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(
      getDomainOrPrompt({
        sdk: fakeSdk,
        choicesFilter: (domain) => !domain.isVerified,
      }),
    ).resolves.toEqual({
      id: 'secondDomainId',
      hostname: 'second.xyz',
      isVerified: false,
    });

    expect(fakeSdk.domains().list).toHaveBeenCalledOnce();
    expect(selectPrompt).toHaveBeenCalledWith({
      choices: [
        { value: 'firstDomainId', title: 'first.xyz' },
        { value: 'secondDomainId', title: 'second.xyz' },
      ],
      message: 'Select a domain:',
    });
  });

  it('should throw if no domains are present', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });
    (fakeSdk.domains().list as Mock).mockResolvedValue([]);
    await expect(getDomainOrPrompt({ sdk: fakeSdk })).rejects.toThrowError(
      new DomainsNotFoundError(),
    );

    expect(fakeSdk.domains().list).toHaveBeenCalledOnce();
    expect(selectPrompt).not.toHaveBeenCalled();
  });
});
