import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk/node';
import { type Mock, describe, expect, it, vi } from 'vitest';

import { output } from '../../cli';
import { config } from '../../config';
import { createProjectAction } from './create';
import { getProjectNameOrPrompt } from './prompts/getProjectNameOrPrompt';

vi.mock('../../cli', () => {
  const output = {
    spinner: vi.fn(),
    success: vi.fn(),
    log: vi.fn(),
    hint: vi.fn(),
    printNewLine: vi.fn(),
  };

  return { output };
});

vi.mock('./prompts/getProjectNameOrPrompt', () => ({
  getProjectNameOrPrompt: vi.fn().mockResolvedValue('first project'),
}));

vi.mock('../../config', () => {
  const config = { projectId: { set: vi.fn() } };

  return { config };
});

vi.mock('@fleek-platform/sdk/node', () => {
  const FleekSdkMock = vi.fn();

  const projects = {
    create: vi
      .fn()
      .mockResolvedValue({ id: 'firstProjectId', name: 'first project' }),
  };

  FleekSdkMock.prototype.projects = () => projects;

  return { FleekSdk: FleekSdkMock, PersonalAccessTokenService: vi.fn() };
});

describe('Create new project', () => {
  it('should create new project with given name', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(
      createProjectAction({ sdk: fakeSdk, args: { name: 'first project' } }),
    ).resolves.toBeUndefined();

    expect(getProjectNameOrPrompt).toHaveBeenCalledWith({
      name: 'first project',
    });
    expect(fakeSdk.projects().create).toHaveBeenCalledWith({
      name: 'first project',
    });
    expect(config.projectId.set).toHaveBeenCalledWith('firstProjectId');

    expect(output.spinner).toHaveBeenCalledWith('Creating a new project...');
    expect(output.success).toHaveBeenCalledWith(
      'The project "first project" has been successfully created with the project ID "firstProjectId", and you\'ve automatically been switched to it.',
    );
  });

  it('shoud let the user enter project name and create new project', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });
    (getProjectNameOrPrompt as Mock).mockResolvedValueOnce('second project');
    (fakeSdk.projects().create as Mock).mockResolvedValueOnce({
      id: 'secondProjectId',
      name: 'second project',
    });

    await expect(
      createProjectAction({ sdk: fakeSdk, args: {} }),
    ).resolves.toBeUndefined();

    expect(getProjectNameOrPrompt).toHaveBeenCalledWith({});
    expect(fakeSdk.projects().create).toHaveBeenCalledWith({
      name: 'second project',
    });
    expect(config.projectId.set).toHaveBeenCalledWith('secondProjectId');

    expect(output.spinner).toHaveBeenCalledWith('Creating a new project...');
    expect(output.success).toHaveBeenCalledWith(
      'The project "second project" has been successfully created with the project ID "secondProjectId", and you\'ve automatically been switched to it.',
    );
  });
});
