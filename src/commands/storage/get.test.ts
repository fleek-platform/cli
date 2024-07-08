import { FleekSdk, PersonalAccessTokenService } from '@fleek-platform/sdk';
import { type Mock, describe, expect, it, vi } from 'vitest';

import { output } from '../../cli';
import { t } from '../../utils/translation';
import { getStorageAction } from './get';

vi.mock('../../cli', () => {
  const output = {
    log: vi.fn(),
    warn: vi.fn(),
    table: vi.fn(),
  };

  return { output };
});

vi.mock('@fleek-platform/sdk', () => {
  const FleekSdkMock = vi.fn();

  const storage = {
    get: vi.fn((options: { cid: string }) => {
      const data = [
        {
          filename: 'index.html',
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
      ];
      const found = data.find((item) => item.cid === options.cid);

      return found ? Promise.resolve(found) : Promise.reject('Pin not found');
    }),
    getByFilename: vi.fn((options: { filename: string; extension: string }) => {
      const data = [
        {
          filename: 'index.html',
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
          filename: 'basic.car',
          cid: 'bafkreiebwzjtd62ctklmmidldy2z2exinzr2mc72tzhkbe7ftjxm7cwnle',
          filecoinDealIds: '61342549',
          arweaveId: '',
        },
      ];

      const filtered = data.filter(
        (item) =>
          [options.filename, options.extension].join('.') === item.filename,
      );

      return Promise.resolve(filtered.length > 0 ? filtered : undefined);
    }),
  };

  const privateGateways = {
    list: vi.fn().mockResolvedValue([]),
  };

  const domains = {
    // TODO: The following data structure has to be updated
    // See Domain schema/model or disucssion https://discord.com/channels/1045027913260617789/1045488371998412881/1214241772046258226
    listByZoneId: vi.fn((options: { zoneId: string }) => {
      const data = [
        {
          hostname: 'cli-test.fleek.xyz',
          zoneId: 'clsba7n4z000008lb0loefpnn',
          status: 'ACTIVE',
        },
        {
          hostname: 'cli-test-no-status.fleek.xyz',
          zoneId: 'clsba7n4z000008lb0loefpnn',
        },
        {
          hostname: 'cli-test-storage.fleek.xyz',
          zoneId: 'clsba858j000108lb2euyfk6u',
          status: 'ACTIVE',
        },
        {
          hostname: 'cli-test-inactive.fleek.xyz',
          zoneId: 'clsba858j000108lb2euyfk6u',
          status: 'INACTIVE',
        },
      ];

      const found = data.find((item) => item.zoneId === options.zoneId);

      return Promise.resolve(found ? [found] : undefined);
    }),
  };

  FleekSdkMock.prototype.storage = () => storage;
  FleekSdkMock.prototype.privateGateways = () => privateGateways;
  FleekSdkMock.prototype.domains = () => domains;

  return { FleekSdk: FleekSdkMock, PersonalAccessTokenService: vi.fn() };
});

describe('Get storage files/folder for the given cid or name', () => {
  it('should show storage by cid with public gateway', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(
      getStorageAction({
        sdk: fakeSdk,
        args: {
          cid: 'bafybeifylyzjlrpec75l66kggycx65yuouyavweaaqxmf22jvbtnmmaqru',
        },
      }),
    ).resolves.toBeUndefined();

    expect(fakeSdk.storage().get).toHaveBeenCalledWith({
      cid: 'bafybeifylyzjlrpec75l66kggycx65yuouyavweaaqxmf22jvbtnmmaqru',
    });
    expect(output.log).not.toHaveBeenCalled();
    expect(output.table).toHaveBeenCalledWith([
      {
        filename: 'index.html',
        cid: 'bafybeifylyzjlrpec75l66kggycx65yuouyavweaaqxmf22jvbtnmmaqru',
        'filecoin id': '58027558',
        'arweave id': '',
        link: 'https://bafybeifylyzjlrpec75l66kggycx65yuouyavweaaqxmf22jvbtnmmaqru.ipfs.cf-ipfs.com',
      },
    ]);
  });

  it('should show storage by name with public gateway', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(
      getStorageAction({ sdk: fakeSdk, args: { name: 'basic.car' } }),
    ).resolves.toBeUndefined();

    expect(fakeSdk.storage().getByFilename).toHaveBeenCalledWith({
      filename: 'basic',
      extension: 'car',
    });
    expect(output.log).not.toHaveBeenCalled();
    expect(output.table).toHaveBeenCalledWith([
      {
        filename: 'basic.car',
        cid: 'bafkreieasoapp3osmpdt2lwdqy6oqx75nhdsxgkoswyjuwy2675eyhvcg4',
        'filecoin id': '61342544',
        'arweave id': '',
        link: 'https://bafkreieasoapp3osmpdt2lwdqy6oqx75nhdsxgkoswyjuwy2675eyhvcg4.ipfs.cf-ipfs.com',
      },
      {
        filename: 'basic.car',
        cid: 'bafkreiebwzjtd62ctklmmidldy2z2exinzr2mc72tzhkbe7ftjxm7cwnle',
        'filecoin id': '61342549',
        'arweave id': '',
        link: 'https://bafkreiebwzjtd62ctklmmidldy2z2exinzr2mc72tzhkbe7ftjxm7cwnle.ipfs.cf-ipfs.com',
      },
    ]);
  });

  it('should show storage get by cid with private gateway', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });
    (fakeSdk.privateGateways().list as Mock).mockResolvedValueOnce([
      { zone: { id: 'clsba7n4z000008lb0loefpnn' } },
      { zone: { id: 'clsba858j000108lb2euyfk6u' } },
    ]);

    await expect(
      getStorageAction({
        sdk: fakeSdk,
        args: {
          cid: 'bafybeifylyzjlrpec75l66kggycx65yuouyavweaaqxmf22jvbtnmmaqru',
        },
      }),
    ).resolves.toBeUndefined();

    expect(fakeSdk.storage().get).toHaveBeenCalledWith({
      cid: 'bafybeifylyzjlrpec75l66kggycx65yuouyavweaaqxmf22jvbtnmmaqru',
    });

    expect(output.log).not.toHaveBeenCalled();
    expect(output.table).toHaveBeenCalledWith([
      {
        filename: 'index.html',
        cid: 'bafybeifylyzjlrpec75l66kggycx65yuouyavweaaqxmf22jvbtnmmaqru',
        'filecoin id': '58027558',
        'arweave id': '',
        link: 'https://cli-test.fleek.xyz/ipfs/bafybeifylyzjlrpec75l66kggycx65yuouyavweaaqxmf22jvbtnmmaqru',
      },
      {
        filename: 'index.html',
        cid: 'bafybeifylyzjlrpec75l66kggycx65yuouyavweaaqxmf22jvbtnmmaqru',
        'filecoin id': '58027558',
        'arweave id': '',
        link: 'https://cli-test-storage.fleek.xyz/ipfs/bafybeifylyzjlrpec75l66kggycx65yuouyavweaaqxmf22jvbtnmmaqru',
      },
    ]);
  });

  // TODO: unexpected response
  it('should show storage get by name with private gateway', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });
    (fakeSdk.privateGateways().list as Mock).mockResolvedValueOnce([
      { zone: { id: 'clsba7n4z000008lb0loefpnn' } },
      { zone: { id: 'clsba858j000108lb2euyfk6u' } },
    ]);

    await expect(
      getStorageAction({ sdk: fakeSdk, args: { name: 'basic.car' } }),
    ).resolves.toBeUndefined();

    expect(fakeSdk.storage().getByFilename).toHaveBeenCalledWith({
      filename: 'basic',
      extension: 'car',
    });
    expect(output.log).not.toHaveBeenCalled();
    expect(output.table).toHaveBeenCalledWith([
      {
        filename: 'basic.car',
        cid: 'bafkreieasoapp3osmpdt2lwdqy6oqx75nhdsxgkoswyjuwy2675eyhvcg4',
        'filecoin id': '61342544',
        'arweave id': '',
        link: 'https://cli-test.fleek.xyz/ipfs/bafkreieasoapp3osmpdt2lwdqy6oqx75nhdsxgkoswyjuwy2675eyhvcg4',
      },
      {
        filename: 'basic.car',
        cid: 'bafkreieasoapp3osmpdt2lwdqy6oqx75nhdsxgkoswyjuwy2675eyhvcg4',
        'filecoin id': '61342544',
        'arweave id': '',
        link: 'https://cli-test-storage.fleek.xyz/ipfs/bafkreieasoapp3osmpdt2lwdqy6oqx75nhdsxgkoswyjuwy2675eyhvcg4',
      },
      {
        filename: 'basic.car',
        cid: 'bafkreiebwzjtd62ctklmmidldy2z2exinzr2mc72tzhkbe7ftjxm7cwnle',
        'filecoin id': '61342549',
        'arweave id': '',
        link: 'https://cli-test.fleek.xyz/ipfs/bafkreiebwzjtd62ctklmmidldy2z2exinzr2mc72tzhkbe7ftjxm7cwnle',
      },
      {
        filename: 'basic.car',
        cid: 'bafkreiebwzjtd62ctklmmidldy2z2exinzr2mc72tzhkbe7ftjxm7cwnle',
        'filecoin id': '61342549',
        'arweave id': '',
        link: 'https://cli-test-storage.fleek.xyz/ipfs/bafkreiebwzjtd62ctklmmidldy2z2exinzr2mc72tzhkbe7ftjxm7cwnle',
      },
    ]);
  });

  it('should show message that no storage exist with valid cid', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(
      getStorageAction({
        sdk: fakeSdk,
        args: {
          cid: 'bafybeiapnja2op4y4ii6hgosm2vurtv75guhn77pkj7dr3k466bayk7oym',
        },
      }),
    ).resolves.toBeUndefined();

    expect(fakeSdk.storage().get).toHaveBeenCalledWith({
      cid: 'bafybeiapnja2op4y4ii6hgosm2vurtv75guhn77pkj7dr3k466bayk7oym',
    });
    expect(fakeSdk.privateGateways().list).not.toHaveBeenCalled();
    expect(output.warn).toHaveBeenCalledWith(
      t('storageGetNotFound', {
        type: 'cid',
        value: 'bafybeiapnja2op4y4ii6hgosm2vurtv75guhn77pkj7dr3k466bayk7oym',
      }),
    );
    expect(output.log).toHaveBeenCalledWith(t('storageAddSuggestion'));
    expect(output.log).toHaveBeenCalledWith('fleek storage add <file_path>');
    expect(output.table).not.toHaveBeenCalled();
  });

  it('should show message that no storage exist with valid name', async () => {
    const accessTokenService = new PersonalAccessTokenService({
      personalAccessToken: '',
    });
    const fakeSdk = new FleekSdk({ accessTokenService });

    await expect(
      getStorageAction({ sdk: fakeSdk, args: { name: 'app.html' } }),
    ).resolves.toBeUndefined();

    expect(fakeSdk.storage().getByFilename).toHaveBeenCalledWith({
      filename: 'app',
      extension: 'html',
    });
    expect(fakeSdk.privateGateways().list).not.toHaveBeenCalled();
    expect(output.warn).toHaveBeenCalledWith(
      t('storageGetNotFound', { type: 'name', value: 'app.html' }),
    );
    expect(output.log).toHaveBeenCalledWith(t('storageAddSuggestion'));
    expect(output.log).toHaveBeenCalledWith('fleek storage add <file_path>');
    expect(output.table).not.toHaveBeenCalled();
  });
});
