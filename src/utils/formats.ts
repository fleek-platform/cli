import { FleekSiteConfigFormats } from './configuration';

export const isValidFleekConfigFormat = (format: FleekSiteConfigFormats & string) => Object.values(FleekSiteConfigFormats).includes(format);
