import { describe, expect, it } from 'vitest';

import { parseWhitelistDomains } from './parser';

describe('Parse list of domains', () => {
  it('should parse list of non-duplicate domains', () => {
    const whitelistDomains = [
      { id: '1', hostname: 'foo.bar' },
      { id: '2', hostname: 'bar.foo' },
      { id: '3', hostname: 'not.duplicated' },
    ];

    const whiteLabelDomains = [
      { id: '1', hostname: 'foo.bar' },
      { id: '2', hostname: 'bar.foo' },
    ];

    expect(
      parseWhitelistDomains({ whitelistDomains, whiteLabelDomains }),
    ).toEqual([
      { hostname: 'foo.bar' },
      { hostname: 'bar.foo' },
      { hostname: 'not.duplicated' },
    ]);
  });
});
