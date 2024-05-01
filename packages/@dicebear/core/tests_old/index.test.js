import assert from 'node:assert';
import { describe, it } from 'node:test';

import { Style, createAvatar, createStyle } from '../lib/index.js';

import initials from './fixtures/definitions/initials.json' assert { type: 'json' };
import { AvatarViewModel } from '../lib/models/AvatarViewModel.js';

describe('index', () => {
  it('createStyle', () => {
    const style = createStyle(initials);

    assert.ok(style instanceof Style);
  });

  it('createAvatar', () => {
    const style = createStyle(initials);
    const avatar = createAvatar(style);

    assert.ok(avatar instanceof AvatarViewModel);
  });
});
