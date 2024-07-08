import type { FleekSdk, IpnsRecord } from '@fleek-platform/sdk';

import { output } from '../../../cli';
import { selectPrompt } from '../../../prompts/selectPrompt';
import { t } from '../../../utils/translation';

type GetIpnsRecordOrPromptArgs = {
  name?: string;
  siteId: string;
  sdk: FleekSdk;
};

export const getIpnsRecordOrPrompt = async ({
  name,
  sdk,
  siteId,
}: GetIpnsRecordOrPromptArgs): Promise<IpnsRecord | undefined> => {
  if (name) {
    return await sdk.ipns().getRecord({ name });
  }

  const ipnsRecords = await sdk.ipns().listRecords();

  if (!ipnsRecords.length) {
    output.spinner(t('ipnsNotLinkCreating'));
    const record = await sdk.ipns().createRecordForSite({ siteId });
    output.stopSpinner();

    return record;
  }

  const selectedIpnsRecordId = await selectPrompt({
    message: `${t('ipnsSelect')}:`,
    choices: ipnsRecords.map((record: Record<'name' | 'id', string>) => ({
      title: record.name,
      value: record.id,
    })),
  });

  const record = ipnsRecords.find(
    (record) => record.id === selectedIpnsRecordId,
  );

  if (!record) return;

  return record;
};
