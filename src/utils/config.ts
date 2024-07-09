// TODO: Seems that utils/configuraiton exists, move to utils/configuration
import { FleekSiteConfigFormats, FleekSiteConfigFormatValue } from './configuration/types';

const FLEEK_CONFIG_BASENAME = 'fleek.config';

export const getConfigFileByTypeName = (name: keyof typeof FleekSiteConfigFormats ) => `${FLEEK_CONFIG_BASENAME}.${FleekSiteConfigFormats[name]}`;

export const getConfigFileByTypeValue = (val: FleekSiteConfigFormatValue) => `${FLEEK_CONFIG_BASENAME}.${val}`;
