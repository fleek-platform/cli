import { SitesNotFoundError } from '@fleek-platform/errors';
import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk/node';
import { type Mock, describe, expect, it, vi } from 'vitest';

import { selectPrompt } from '../../../prompts/selectPrompt';
import { getSiteOrPrompt } from './getSiteOrPrompt';

vi.mock('../../../prompts/selectPrompt', () => ({
  selectPrompt: vi.fn().mockResolvedValue('secondSiteId'),
}));

vi.mock('@fleek-platform/sdk/node', () => {
  const FleekSdkMock = vi.fn();

  const sites = {
    get: vi
      .fn()
      .mockResolvedValue({ id: 'firstSiteId', slug: 'first-first-first' }),
    getBySlug: vi
      .fn()
      .mockResolvedValue({ id: 'secondSiteId', slug: 'second-second-second' }),
    list: vi.fn().mockResolvedValue([
      { id: 'firstSiteId', slug: 'first-first-first' },
      { id: 'secondSiteId', slug: 'second-second-second' },
    ]),
  };

  FleekSdkMock.prototype.sites = () => sites;

  return { FleekSdk: FleekSdkMock, PersonalAccessTokenService: vi.fn() };
});

describe('Get site by id, slug or let the user choose from list', () => {
  it('Return site by its id', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(
      getSiteOrPrompt({ sdk: fakeSdk, id: 'firstSiteId' }),
    ).resolves.toEqual({ id: 'firstSiteId', slug: 'first-first-first' });

    expect(fakeSdk.sites().get).toHaveBeenCalledWith({ id: 'firstSiteId' });
  });

  it('Return site by its slug', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(
      getSiteOrPrompt({ sdk: fakeSdk, slug: 'second-second-second' }),
    ).resolves.toEqual({
      id: 'secondSiteId',
      slug: 'second-second-second',
    });

    expect(fakeSdk.sites().getBySlug).toHaveBeenCalledWith({
      slug: 'second-second-second',
    });
  });

  it('Let the user choose from list and return chosen site', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(getSiteOrPrompt({ sdk: fakeSdk })).resolves.toEqual({
      id: 'secondSiteId',
      slug: 'second-second-second',
    });

    expect(fakeSdk.sites().list).toHaveBeenCalledOnce();
    expect(selectPrompt).toHaveBeenCalledOnce();
  });

  it('should throw if no sites exist', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });
    (fakeSdk.sites().list as Mock).mockResolvedValue([]);
    await expect(getSiteOrPrompt({ sdk: fakeSdk })).rejects.toThrowError(
      new SitesNotFoundError(),
    );

    expect(fakeSdk.sites().list).toHaveBeenCalledOnce();
    expect(selectPrompt).not.toHaveBeenCalled();
  });
});
