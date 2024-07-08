import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk';
import { type Mock, describe, expect, it, vi } from 'vitest';

import { output } from '../../cli';
import { listProjectsAction } from './list';

vi.mock('../../cli', () => {
  const output = {
    log: vi.fn(),
    table: vi.fn(),
    checkmark: vi.fn().mockReturnValue('V'),
  };

  return { output };
});

vi.mock('../../config', () => {
  const config = {
    projectId: { get: vi.fn().mockReturnValue('firstProjectId') },
  };

  return { config };
});

vi.mock('@fleek-platform/sdk', () => {
  const FleekSdkMock = vi.fn();

  const projects = {
    list: vi.fn().mockResolvedValue([
      {
        id: 'firstProjectId',
        name: 'first project',
        createdAt: '2023-02-01T00:00:00.000Z',
      },
      {
        id: 'secondProjectId',
        name: 'second project',
        createdAt: '2023-02-02T00:00:00.000Z',
      },
    ]),
  };

  FleekSdkMock.prototype.projects = () => projects;

  return { FleekSdk: FleekSdkMock, PersonalAccessTokenService: vi.fn() };
});

describe('List projects in which the user has memebership', () => {
  it('should show project list', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(
      listProjectsAction({ sdk: fakeSdk, args: {} }),
    ).resolves.toBeUndefined();

    expect(fakeSdk.projects().list).toHaveBeenCalledWith();
    expect(output.log).not.toHaveBeenCalled();
    expect(output.table).toHaveBeenCalledWith([
      {
        ID: 'firstProjectId',
        Name: 'first project',
        'Created At': '2023-02-01T00:00:00.000Z',
        Current: '✅',
      },
      {
        ID: 'secondProjectId',
        Name: 'second project',
        'Created At': '2023-02-02T00:00:00.000Z',
        Current: '',
      },
    ]);
  });

  it('should show message that no projects exist', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });
    (fakeSdk.projects().list as Mock).mockResolvedValueOnce([]);

    await expect(
      listProjectsAction({ sdk: fakeSdk, args: {} }),
    ).resolves.toBeUndefined();

    expect(fakeSdk.projects().list).toHaveBeenCalled();
    expect(output.log).toHaveBeenCalledWith(
      'You do not have any projects yet.',
    );
    expect(output.table).not.toHaveBeenCalled();
  });
});
