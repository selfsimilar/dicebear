import assert from 'node:assert';
import { describe, it } from 'node:test';

import { Avatar, Style, createAvatar, createStyle } from '../lib/index.js';

import initials from './fixtures/definitions/initials.json' assert { type: 'json' };

describe('index', () => {
  it('createStyle', () => {
    const style = createStyle(initials);

    assert.ok(style instanceof Style);
  });

  it('createAvatar', () => {
    const style = createStyle(initials);
    const avatar = createAvatar(style);

    assert.ok(avatar instanceof Avatar);
  });
});
