import { FleekSiteConfigFormats } from './configuration';

export const isValidFleekConfigFormat = (format: keyof typeof FleekSiteConfigFormats) => Object.values(FleekSiteConfigFormats).includes(FleekSiteConfigFormats[format])
