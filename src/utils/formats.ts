import { FleekSiteConfigFormats } from './configuration';

export const isValidFleekConfigFormat = (format: FleekSiteConfigFormats) =>
  Object.values(FleekSiteConfigFormats).includes(format);
