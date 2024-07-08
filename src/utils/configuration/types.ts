export type FleekSiteConfig = {
  /** An unique sequence of random words that identifies the site. */
  slug: string;
  /** A directory where the site's data will be uploaded from. */
  distDir: string;
  /** An optional command that will be run before uploading site's data. */
  buildCommand?: string;
};

export type FleekRootConfig = {
  /** An array may contain one site's configuration at most. */
  sites: FleekSiteConfig[];
};

export type FleekConfig =
  | FleekRootConfig
  | (() => FleekRootConfig)
  | (() => Promise<FleekRootConfig>)
  | Promise<FleekRootConfig>;
