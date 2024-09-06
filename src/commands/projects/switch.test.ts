import { ProjectsNotFoundError } from '@fleek-platform/errors';
import type { FleekSdk } from '@fleek-platform/sdk/node';
import { type Mock, describe, expect, it, vi } from 'vitest';

import { output } from '../../cli';
import { config } from '../../config';
import { createProjectActionHandler } from './create';
import { getProjectOrPrompt } from './prompts/getProjectOrPrompt';
import { switchProjectAction } from './switch';

vi.mock('../../cli', () => {
  const output = {
    log: vi.fn(),
    success: vi.fn(),
    printNewLine: vi.fn(),
  };

  return { output };
});

vi.mock('../../config', () => {
  const config = { projectId: { set: vi.fn() } };

  return { config };
});

vi.mock('./prompts/getProjectOrPrompt', () => ({
  getProjectOrPrompt: vi
    .fn()
    .mockResolvedValue({ id: 'firstProjectId', name: 'first project' }),
}));

vi.mock('./create', () => ({
  createProjectActionHandler: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('@fleek-platform/sdk/node', () => ({}));

describe('Switch between projects', () => {
  it('should switch to project by given id', async () => {
    await expect(
      switchProjectAction({
        sdk: {} as FleekSdk,
        args: { id: 'firstProjectId' },
      }),
    ).resolves.toBeUndefined();

    expect(getProjectOrPrompt).toHaveBeenCalledWith({
      sdk: {} as FleekSdk,
      id: 'firstProjectId',
    });
    expect(config.projectId.set).toHaveBeenCalledWith('firstProjectId');
    expect(output.success).toHaveBeenCalledWith(
      'You have switched to project "first project".',
    );
  });

  it('should let the user choose project and switch to that project', async () => {
    (getProjectOrPrompt as Mock).mockResolvedValueOnce({
      id: 'secondProjetId',
      name: 'second project',
    });

    await expect(
      switchProjectAction({ sdk: {} as FleekSdk, args: {} }),
    ).resolves.toBeUndefined();

    expect(getProjectOrPrompt).toHaveBeenCalledWith({ sdk: {} as FleekSdk });
    expect(config.projectId.set).toHaveBeenCalledWith('secondProjetId');
    expect(output.success).toHaveBeenCalledWith(
      'You have switched to project "second project".',
    );
  });

  it('should run creating new project flow because of no project exist', async () => {
    (getProjectOrPrompt as Mock).mockRejectedValueOnce(
      new ProjectsNotFoundError(),
    );

    await expect(
      switchProjectAction({ sdk: {} as FleekSdk, args: {} }),
    ).resolves.toBeUndefined();

    expect(output.log).toHaveBeenCalledWith(`Let's start by creating one.`);
    expect(createProjectActionHandler).toHaveBeenCalledOnce();
    expect(config.projectId.set).not.toHaveBeenCalled();
  });
});
