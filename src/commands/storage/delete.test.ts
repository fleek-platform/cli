import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk';
import { describe, expect, it, vi } from 'vitest';

import { output } from '../../cli';
import { deleteStorageAction } from './delete';

vi.mock('../../cli', () => {
  const output = {
    log: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
  };

  return { output };
});

vi.mock('@fleek-platform/sdk', () => {
  const FleekSdkMock = vi.fn();

  const storage = {
    delete: vi.fn((options: { cid: string }) => {
      if (
        options.cid ===
        'bafkreiebwzjtd62ctklmmidldy2z2exinzr2mc72tzhkbe7ftjxm7cwnle'
      ) {
        return Promise.resolve({ body: {}, status: 500 });
      }
      if (options.cid.startsWith('bafyunauth')) {
        return Promise.resolve({ body: {}, status: 401 });
      }

      return Promise.resolve({ body: { deleted: true }, status: 200 });
    }),
    getByFilename: vi.fn((options: { filename: string; extension: string }) => {
      const batchProcessingData = [...Array(25).keys()].map((i) => ({
        filename: 'basicBatch.car',
        cid: `bafyrandom${i}`,
      }));
      const batchProcessingUnauthorized = [...Array(15).keys()].map((i) => ({
        filename: 'basicBatchUnauthorized.car',
        cid: `bafyunauth${i}`,
      }));
      const data = [
        {
          filename: 'basic.car',
          cid: 'bafybeifylyzjlrpec75l66kggycx65yuouyavweaaqxmf22jvbtnmmaqru',
          filecoinDealIds: '58027558',
          arweaveId: '',
        },
        {
          filename: 'basic.car',
          cid: 'bafkreieasoapp3osmpdt2lwdqy6oqx75nhdsxgkoswyjuwy2675eyhvcg4',
          filecoinDealIds: '61342544',
          arweaveId: '',
        },
        {
          filename: 'basic1Fail.car',
          cid: 'bafkreiebwzjtd62ctklmmidldy2z2exinzr2mc72tzhkbe7ftjxm7cwnle',
          filecoinDealIds: '61342549',
          arweaveId: '',
        },
        {
          filename: 'basic1Fail.car',
          cid: 'bafkreidlixt2jjjsdxxdzgv3spe46mcwtpsmlxgumpsyaru6n6fn3jz2zy',
          filecoinDealIds: '61342999',
          arweaveId: '',
        },
        ...batchProcessingData,
        ...batchProcessingUnauthorized,
      ];
      const filtered = data.filter(
        (item) =>
          [options.filename, options.extension].join('.') === item.filename,
      );

      return Promise.resolve(filtered.length > 0 ? filtered : undefined);
    }),
  };

  FleekSdkMock.prototype.storage = () => storage;

  return { FleekSdk: FleekSdkMock, PersonalAccessTokenService: vi.fn() };
});

describe('Delete storage files/folder for the given cid or name', () => {
  it('should delete storage by name', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(
      deleteStorageAction({
        sdk: fakeSdk,
        args: {
          cid: 'bafybeifylyzjlrpec75l66kggycx65yuouyavweaaqxmf22jvbtnmmaqru',
        },
      }),
    ).resolves.toBeUndefined();

    expect(fakeSdk.storage().delete).toHaveBeenCalledWith({
      cid: 'bafybeifylyzjlrpec75l66kggycx65yuouyavweaaqxmf22jvbtnmmaqru',
    });
    expect(output.log).toHaveBeenCalledWith(
      'Processing cid: bafybeifylyzjlrpec75l66kggycx65yuouyavweaaqxmf22jvbtnmmaqru',
    );
    expect(output.success).toHaveBeenCalled();
  });

  it('should delete storage by name', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(
      deleteStorageAction({
        sdk: fakeSdk,
        args: {
          name: 'basic.car',
        },
      }),
    ).resolves.toBeUndefined();

    expect(fakeSdk.storage().delete).toHaveBeenCalledWith({
      cid: 'bafybeifylyzjlrpec75l66kggycx65yuouyavweaaqxmf22jvbtnmmaqru',
    });
    expect(fakeSdk.storage().delete).toHaveBeenCalledWith({
      cid: 'bafkreieasoapp3osmpdt2lwdqy6oqx75nhdsxgkoswyjuwy2675eyhvcg4',
    });
    expect(output.log).toHaveBeenCalledWith(
      'Processing cid: bafybeifylyzjlrpec75l66kggycx65yuouyavweaaqxmf22jvbtnmmaqru name: basic.car',
    );
    expect(output.log).toHaveBeenCalledWith(
      'Processing cid: bafkreieasoapp3osmpdt2lwdqy6oqx75nhdsxgkoswyjuwy2675eyhvcg4 name: basic.car',
    );
    expect(output.success).toHaveBeenCalledTimes(2);
  });

  it('should delete 1 out of 2 storage by name and return 500 on 1', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(
      deleteStorageAction({
        sdk: fakeSdk,
        args: {
          name: 'basic1Fail.car',
        },
      }),
    ).resolves.toBeUndefined();

    expect(fakeSdk.storage().delete).toHaveBeenCalledWith({
      cid: 'bafkreidlixt2jjjsdxxdzgv3spe46mcwtpsmlxgumpsyaru6n6fn3jz2zy',
    });
    expect(fakeSdk.storage().delete).toHaveBeenCalledWith({
      cid: 'bafkreiebwzjtd62ctklmmidldy2z2exinzr2mc72tzhkbe7ftjxm7cwnle',
    });
    expect(output.log).toHaveBeenCalledWith(
      'Processing cid: bafkreidlixt2jjjsdxxdzgv3spe46mcwtpsmlxgumpsyaru6n6fn3jz2zy name: basic1Fail.car',
    );
    expect(output.log).toHaveBeenCalledWith(
      'Processing cid: bafkreiebwzjtd62ctklmmidldy2z2exinzr2mc72tzhkbe7ftjxm7cwnle name: basic1Fail.car',
    );
    expect(output.success).toHaveBeenCalledTimes(1);
    expect(output.error).toHaveBeenCalledTimes(1);
  });

  it('should delete all storage by name using batch processing', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(
      deleteStorageAction({
        sdk: fakeSdk,
        args: {
          name: 'basicBatch.car',
        },
      }),
    ).resolves.toBeUndefined();

    expect(fakeSdk.storage().delete).toHaveBeenCalledTimes(25);
    expect(output.log).toHaveBeenCalledTimes(25);
    expect(output.success).toHaveBeenCalledTimes(25);
  });

  it('should not process the full batch and just return error on 401', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(
      deleteStorageAction({
        sdk: fakeSdk,
        args: {
          name: 'basicBatchUnauthorized.car',
        },
      }),
    ).resolves.toBeUndefined();

    expect(fakeSdk.storage().delete).toHaveBeenCalledTimes(10);
    expect(output.log).toHaveBeenCalledTimes(10);
    expect(output.error).toHaveBeenCalledTimes(1);
  });
});
