import assert from 'node:assert';
import { describe, it } from 'node:test';

import { ensureSize } from '../../lib/utils/svg.js';

describe('svg util', () => {
  it(`"ensureSize" without width and height`, async () => {
    assert.equal(
      ensureSize(`<svg foo bar></svg>`, 100).svg,
      `<svg foo bar width="100" height="100"></svg>`,
    );
  });

  it(`"ensureSize" with width and height`, async () => {
    assert.equal(
      ensureSize(`<svg foo width="20" bar height="20"></svg>`, 100).svg,
      `<svg foo width="20" bar height="20"></svg>`,
    );
  });

  it(`"ensureSize" with width only`, async () => {
    assert.equal(
      ensureSize(`<svg foo width="20" bar></svg>`, 100).svg,
      `<svg foo width="20" bar height="20"></svg>`,
    );
  });

  it(`"ensureSize" with height only`, async () => {
    assert.equal(
      ensureSize(`<svg foo bar height="20"></svg>`, 100).svg,
      `<svg foo bar height="100" width="100"></svg>`,
    );
  });
});
