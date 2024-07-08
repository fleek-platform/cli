import { ProjectInvalidNameError } from '@fleek-platform/errors';
import { describe, expect, it, vi } from 'vitest';

import { getProjectNameOrPrompt } from './getProjectNameOrPrompt';

vi.mock('prompts', () => ({
  default: vi.fn().mockResolvedValue({ value: 'second-project' }),
}));

describe('Validate given project name or let the user enter name', () => {
  it('Get valid project name', async () => {
    await expect(
      getProjectNameOrPrompt({ name: 'first project' }),
    ).resolves.toEqual('first project');
  });

  it('Throw an error on invalid project name', async () => {
    const invalidProjectName = '_!_';
    await expect(
      getProjectNameOrPrompt({ name: invalidProjectName }),
    ).rejects.toThrowError(
      new ProjectInvalidNameError({ name: invalidProjectName }),
    );
  });

  it('Let the user enter project name and return it', async () => {
    await expect(getProjectNameOrPrompt({})).resolves.toEqual('second-project');
  });
});
