import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk/node';
import { type Mock, describe, expect, it, vi } from 'vitest';

import { output as fakeOutput } from '../../cli';
import type { CheckPeriodicallyUntilArgs } from '../../utils/checkPeriodicallyUntil';
import { usePressAnyKey as fakeUsePressAnyKey } from '../../utils/pressAnyKey';
import { getSiteOrPrompt as fakeGetSiteOrPrompt } from '../sites/prompts/getSiteOrPrompt';
import { createEnsAction } from './create';
import { getEnsNameOrPrompt as fakeGetEnsNameOrPrompt } from './prompts/getEnsNameOrPrompt';
import { getIpnsRecordOrPrompt as fakeGetIpnsOrPrompt } from './prompts/getIpnsRecordOrPrompt';

vi.mock('../sites/prompts/getSiteOrPrompt', () => ({
  getSiteOrPrompt: vi.fn().mockResolvedValue({ id: 'firstSiteId', zones: [] }),
}));

vi.mock('./prompts/getIpnsRecordOrPrompt', () => ({
  getIpnsRecordOrPrompt: vi
    .fn()
    .mockResolvedValue({ name: 'ipnsName', id: 'ipnsRecordId' }),
}));

vi.mock('./prompts/getEnsNameOrPrompt', () => ({
  getEnsNameOrPrompt: vi.fn().mockResolvedValue('first.eth'),
}));

vi.mock('../../utils/checkPeriodicallyUntil', () => {
  const checkPeriodicallyUntil = async <T>({
    conditionFn,
  }: CheckPeriodicallyUntilArgs<T>): Promise<T> => {
    return conditionFn();
  };

  return { checkPeriodicallyUntil };
});

vi.mock('../../cli', () => {
  const output = {
    log: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    success: vi.fn(),
    spinner: vi.fn(),
    quoted: vi.fn().mockImplementation((text: string) => `"${text}"`),
    textColor: vi.fn(),
    printNewLine: vi.fn(),
    link: vi.fn(),
    hint: vi.fn(),
  };

  return { output };
});

vi.mock('../../utils/pressAnyKey', () => {
  const waitForAnyKey = vi.fn().mockResolvedValue(undefined);

  return {
    usePressAnyKey: () => ({
      waitForAnyKey,
    }),
  };
});

vi.mock('@fleek-platform/sdk/node', () => {
  const FleekSdkMock = vi.fn();

  const ipns = {
    createRecordForSite: vi
      .fn()
      .mockResolvedValue({ id: 'ipnsRecordId', name: 'ipnsName' }),
    getRecord: vi
      .fn()
      .mockResolvedValue({ id: 'ipnsRecordId', name: 'ipnsName' }),
    listRecords: vi.fn().mockResolvedValue([]),
  };

  const ens = {
    create: vi.fn().mockResolvedValue({
      id: 'ensRecordId',
      name: 'first.eth',
      ipnsRecord: { id: 'ipnsRecordId', name: 'ipnsName' },
      status: 'CREATED',
    }),
    verify: vi.fn(),
    get: vi.fn().mockResolvedValue({ id: 'ensRecordId', status: 'ACTIVE' }),
  };

  FleekSdkMock.prototype.ipns = () => ipns;
  FleekSdkMock.prototype.ens = () => ens;

  return { FleekSdk: FleekSdkMock, PersonalAccessTokenService: vi.fn() };
});

describe('Create ENS record for site', () => {
  it('ENS record was created and successfully verified', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });
    (fakeSdk.ens().get as Mock).mockResolvedValueOnce({
      id: 'ensRecordId',
      status: 'CREATED',
    });

    await expect(
      createEnsAction({
        sdk: fakeSdk,
        args: { siteId: 'firstSiteId', name: 'first.eth' },
      }),
    ).resolves.toBeUndefined();
    expect(fakeGetSiteOrPrompt).toHaveBeenCalledWith({
      sdk: fakeSdk,
      id: 'firstSiteId',
    });
    expect(fakeGetEnsNameOrPrompt).toHaveBeenCalledWith({ name: 'first.eth' });
    expect(fakeGetIpnsOrPrompt).toHaveBeenCalledWith({
      sdk: fakeSdk,
      siteId: 'firstSiteId',
    });

    expect(fakeSdk.ens().create).toHaveBeenCalledWith({
      siteId: 'firstSiteId',
      name: 'first.eth',
      ipnsRecordId: 'ipnsRecordId',
    });

    expect(fakeSdk.ens().get).toHaveBeenCalledWith({ id: 'ensRecordId' });

    expect(fakeSdk.ens().verify).toHaveBeenCalledWith({ id: 'ensRecordId' });

    const { waitForAnyKey } = fakeUsePressAnyKey();

    expect(waitForAnyKey).toHaveBeenCalledOnce();

    expect(fakeOutput.success).toHaveBeenCalledWith(
      `The ENS "first.eth" has been successfully created.`,
    );
    expect(fakeOutput.warn).not.toHaveBeenCalled();
    expect(fakeOutput.error).not.toHaveBeenCalled();
  });
  it('IPNS already exists for site, ENS record was created and successfully verified', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });
    (fakeSdk.ens().get as Mock).mockResolvedValueOnce({
      id: 'ensRecordId',
      status: 'CREATED',
    });

    await expect(
      createEnsAction({
        sdk: fakeSdk,
        args: { siteId: 'firstSiteId', name: 'first.eth', ipns: 'ipnsName' },
      }),
    ).resolves.toBeUndefined();
    expect(fakeGetSiteOrPrompt).toHaveBeenCalledWith({
      sdk: fakeSdk,
      id: 'firstSiteId',
    });
    expect(fakeGetEnsNameOrPrompt).toHaveBeenCalledWith({ name: 'first.eth' });
    expect(fakeGetIpnsOrPrompt).toHaveBeenCalledWith({
      sdk: fakeSdk,
      siteId: 'firstSiteId',
      name: 'ipnsName',
    });
    expect(fakeSdk.ens().create).toHaveBeenCalledWith({
      siteId: 'firstSiteId',
      name: 'first.eth',
      ipnsRecordId: 'ipnsRecordId',
    });

    expect(fakeSdk.ens().get).toHaveBeenCalledWith({ id: 'ensRecordId' });
    expect(fakeSdk.ens().verify).toHaveBeenCalledWith({ id: 'ensRecordId' });

    const { waitForAnyKey } = fakeUsePressAnyKey();
    expect(waitForAnyKey).toHaveBeenCalledOnce();

    expect(fakeOutput.success).toHaveBeenCalledWith(
      `The ENS "first.eth" has been successfully created.`,
    );
    expect(fakeOutput.warn).not.toHaveBeenCalled();
    expect(fakeOutput.error).not.toHaveBeenCalled();
  });
  it('Creating of ENS record takes too long', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });
    (fakeSdk.ens().get as Mock).mockResolvedValueOnce({
      id: 'ensRecordId',
      status: 'CREATING',
    });

    await expect(
      createEnsAction({ sdk: fakeSdk, args: {} }),
    ).resolves.toBeUndefined();

    expect(fakeOutput.success).not.toHaveBeenCalled();
    expect(fakeOutput.warn).toHaveBeenCalledWith(
      'The process of obtaining the content hash for your ENS is taking longer than anticipated.',
    );
    expect(fakeOutput.error).not.toHaveBeenCalled();
  });
  it('Verifying of ENS record takes too long', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });
    (fakeSdk.ens().get as Mock)
      .mockResolvedValueOnce({ id: 'ensRecordId', status: 'CREATED' })
      .mockResolvedValueOnce({ id: 'ensRecordId', status: 'VERIFYING' });

    await expect(
      createEnsAction({ sdk: fakeSdk, args: {} }),
    ).resolves.toBeUndefined();

    expect(fakeOutput.success).toHaveBeenCalledOnce();
    expect(fakeOutput.warn).toHaveBeenCalledWith(
      'The process of verifying your ENS is taking longer than anticipated.',
    );
    expect(fakeOutput.error).not.toHaveBeenCalled();
  });
  it(`ENS record wasn't verified for some reason`, async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });
    (fakeSdk.ens().get as Mock)
      .mockResolvedValueOnce({ id: 'ensRecordId', status: 'CREATED' })
      .mockResolvedValueOnce({ id: 'firstEnsId', status: 'VERIFYING_FAILED' });

    const { waitForAnyKey } = fakeUsePressAnyKey();
    (waitForAnyKey as Mock).mockResolvedValueOnce(undefined);
    (waitForAnyKey as Mock).mockRejectedValue('Ctrl+C');

    await expect(
      createEnsAction({ sdk: fakeSdk, args: {} }),
    ).rejects.toThrowError('Ctrl+C');

    expect(waitForAnyKey).toHaveBeenCalledTimes(2);

    expect(fakeOutput.success).toHaveBeenCalledOnce();
    expect(fakeOutput.warn).not.toHaveBeenCalled();
    expect(fakeOutput.error).toHaveBeenCalledWith(
      `ENS "first.eth" couldn't be verified! Check https://app.ens.domains/first.eth?tab=records "Content Hash" field.`,
    );
  });
});
