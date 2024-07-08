import { randomBytes } from 'node:crypto';

export const generateVerificationSessionId = () =>
  randomBytes(16).toString('hex');
