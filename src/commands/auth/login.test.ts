import { createClient } from '@fleek-platform/sdk/node';
import { describe, expect, it, vi } from 'vitest';

import { output } from '../../cli';
import { config } from '../../config';
import { getVerificationSessionLink } from '../../utils/token/showVerificationSessionLink';
import { waitForPersonalAccessTokenFromVerificationSession } from '../../utils/token/waitForPersonalAccessTokenFromVerificationSession';
import { loginActionHandler } from './login';

vi.mock('crypto', () => ({
  randomBytes: vi.fn().mockReturnValue({
    toString: vi.fn().mockReturnValue('mockVerificationSession'),
  }),
}));

vi.mock('../../cli', () => {
  const output = {
    chore: vi.fn(),
    log: vi.fn(),
    link: vi.fn(),
    success: vi.fn(),
    spinner: vi.fn(),
    printNewLine: vi.fn(),
  };

  return { output };
});

vi.mock('../../config', () => ({
  config: {
    personalAccessToken: {
      set: vi.fn(),
      clear: vi.fn(),
    },
    projectId: {
      clear: vi.fn(),
    },
  },
}));

// Assumes user goes ahead with the flow and logs in
vi.mock('@fleek-platform/sdk/node', () => {
  const MockClient = vi.fn();
  MockClient.prototype.mutation = vi.fn().mockResolvedValue({
    createPersonalAccessTokenFromVerificationSession: 'mockPat',
  });

  const createClientMock = vi.fn().mockReturnValue(new MockClient());

  return { createClient: createClientMock };
});

describe('Login', async () => {
  it('should request token from verification session', async () => {
    const mockClient = createClient({ url: '' });
    const result = await waitForPersonalAccessTokenFromVerificationSession({
      verificationSessionId: 'mockVerificationSession',
      client: mockClient,
    });

    expect(result).toBe('mockPat');
    expect(mockClient.mutation).toHaveBeenCalledWith({
      createPersonalAccessTokenFromVerificationSession: {
        __args: {
          data: {
            name: undefined,
            clientAppType: 'CLI',
          },
          where: {
            id: 'mockVerificationSession',
          },
        },
      },
    });
  });

  it('should log the messages correctly', async () => {
    await loginActionHandler({
      uiAppUrl: '',
      authApiUrl: '',
    });

    expect(output.chore).toHaveBeenCalledWith(
      'Please follow the link to log in to Fleek Platform.',
    );

    expect(output.spinner).toHaveBeenCalledWith(
      getVerificationSessionLink({
        uiAppUrl: '',
        verificationSessionId: 'mockVerificationSession',
      }),
    );
    expect(output.success).toHaveBeenCalledWith(
      'You are now logged in to the Fleek Platform.',
    );
  });

  it('should update config correctly', async () => {
    await loginActionHandler({
      uiAppUrl: '',
      authApiUrl: '',
    });

    expect(config.personalAccessToken.set).toHaveBeenCalledWith('mockPat');
    expect(config.projectId.clear).toHaveBeenCalled();
  });
});
