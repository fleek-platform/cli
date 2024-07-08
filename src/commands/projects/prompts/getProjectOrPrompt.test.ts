import { ProjectsNotFoundError } from '@fleek-platform/errors';
import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk';
import { type Mock, describe, expect, it, vi } from 'vitest';

import { selectPrompt } from '../../../prompts/selectPrompt';
import { getProjectOrPrompt } from './getProjectOrPrompt';

vi.mock('../../../prompts/selectPrompt', () => ({
  selectPrompt: vi.fn().mockResolvedValue('secondProjectId'),
}));

vi.mock('@fleek-platform/sdk', () => {
  const FleekSdkMock = vi.fn();

  const projects = {
    get: vi
      .fn()
      .mockResolvedValue({ id: 'firstProjectId', name: 'first project' }),
    list: vi.fn().mockResolvedValue([
      { id: 'firstProjectId', name: 'first project' },
      { id: 'secondProjectId', name: 'second project' },
    ]),
  };

  FleekSdkMock.prototype.projects = () => projects;

  return { FleekSdk: FleekSdkMock, PersonalAccessTokenService: vi.fn() };
});

describe('Get project by its id or let the user choose from list', () => {
  it('Return project by its id', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(
      getProjectOrPrompt({ sdk: fakeSdk, id: 'firstProjectId' }),
    ).resolves.toEqual({
      id: 'firstProjectId',
      name: 'first project',
    });

    expect(fakeSdk.projects().get).toHaveBeenCalledWith({
      id: 'firstProjectId',
    });
    expect(fakeSdk.projects().list).not.toHaveBeenCalled();
    expect(selectPrompt).not.toHaveBeenCalled();
  });

  it('Throw an error because of no projects exist', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });
    (fakeSdk.projects().list as Mock).mockResolvedValueOnce([]);

    await expect(getProjectOrPrompt({ sdk: fakeSdk })).rejects.toThrowError(
      new ProjectsNotFoundError(),
    );

    expect(fakeSdk.projects().get).not.toHaveBeenCalled();
    expect(fakeSdk.projects().list).toHaveBeenCalledOnce();
    expect(selectPrompt).not.toHaveBeenCalled();
  });

  it('Let the user choose from list of existing projects and return chosen project', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(getProjectOrPrompt({ sdk: fakeSdk })).resolves.toEqual({
      id: 'secondProjectId',
      name: 'second project',
    });

    expect(fakeSdk.projects().get).not.toHaveBeenCalled();
    expect(fakeSdk.projects().list).toHaveBeenCalledOnce();
    expect(selectPrompt).toHaveBeenCalledOnce();
  });
});
