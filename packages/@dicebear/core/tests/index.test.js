import assert from 'node:assert';
import { describe, it } from 'node:test';

import { Avatar, Style, createAvatar, createStyle } from '../lib/index.js';

import initialsDefinition from './fixtures/definitions/loader/initials.cjs';

describe('index', () => {
  it('createStyle', () => {
    const style = createStyle(initialsDefinition);

    assert.ok(style instanceof Style);
  });

  it('createAvatar', () => {
    const style = createStyle(initialsDefinition);
    const avatar = createAvatar(style);

    assert.ok(avatar instanceof Avatar);
  });
});
