/* eslint-disable no-process-env */

type Secrets = {
  FLEEK_TOKEN?: string;
  FLEEK_PROJECT_ID?: string;
};

export const secrets: Secrets = {
  FLEEK_TOKEN: process.env.FLEEK_TOKEN,
  FLEEK_PROJECT_ID: process.env.FLEEK_PROJECT_ID,
};
