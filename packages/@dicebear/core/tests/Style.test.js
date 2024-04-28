import assert from 'node:assert';
import { describe, it } from 'node:test';

import { Style } from '../lib/index.js';

import initials from './fixtures/definitions/initials.json' assert { type: 'json' };
import { Struct } from 'superstruct';
import { Prng } from '../lib/Prng.js';
import { AvatarModel } from '../lib/models/AvatarModel.js';

describe('Style', () => {
  it('create', () => {
    const style = Style.fromDefinition(initials);

    const result = style.create(
      new Prng('example'),
      {
        textColor: ['#ffffff'],
      },
      new Map([['backgroundColor', '#000000']]),
    );

    assert.ok(result instanceof AvatarModel);

    assert.equal(result.getAttributes().get('viewBox'), '0 0 100 100');
  });

  it('getDefinition', () => {
    const style = Style.fromDefinition(initials);

    // Create copy
    const expected = JSON.parse(JSON.stringify(initials));
    delete expected['$schema'];

    assert.deepEqual(style.getDefinition(), expected);
  });

  it('getOptionsStruct', () => {
    const style = Style.fromDefinition(initials);
    const struct = style.getOptionsStruct();

    assert.ok(struct instanceof Struct);

    assert.ok(typeof struct.schema.textColor !== 'undefined');
    assert.ok(typeof struct.schema.backgroundColor !== 'undefined');
  });
});
