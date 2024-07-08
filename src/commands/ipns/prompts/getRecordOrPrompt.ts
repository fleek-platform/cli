import { IpnsRecordsNotFoundError } from '@fleek-platform/errors';
import type { FleekSdk, IpnsRecord } from '@fleek-platform/sdk';

import { selectPrompt } from '../../../prompts/selectPrompt';
import { t } from '../../../utils/translation';

type GetRecordOrPromptArgs = {
  sdk: FleekSdk;
  name?: string;
};

export const getRecordOrPrompt = async ({
  sdk,
  name,
}: GetRecordOrPromptArgs): Promise<
  Omit<IpnsRecord, '__typename' | 'createdAt' | 'updatedAt'> | undefined
> => {
  if (name) {
    return await sdk.ipns().getRecord({ name });
  }

  const records = await sdk.ipns().listRecords();

  if (records.length === 0) {
    throw new IpnsRecordsNotFoundError();
  }

  const ipnsRecordId = await selectPrompt({
    message: `${t('ipnsSelectRecord')}:`,
    choices: records.map((record) => ({
      title: record.name,
      value: record.id,
    })),
  });

  const ipnsRecordMatch = records.find((record) => record.id === ipnsRecordId);

  if (!ipnsRecordMatch) return;

  return ipnsRecordMatch;
};
