import assert from 'node:assert';
import { describe, it } from 'node:test';

import { StructHelper } from '../../lib/helpers/StructHelper.js';
import { Struct } from 'superstruct';
import { createStyle } from '../../lib/index.js';

import shapeFaceDefinition from '../fixtures/definitions/shape-face.json' assert { type: 'json' };
import initialsDefinition from '../fixtures/definitions/initials.json' assert { type: 'json' };
import minimalDefinition from '../fixtures/definitions/minimal.json' assert { type: 'json' };

describe('StructHelper', () => {
  it('createOptionsStruct #1', () => {
    // shape face definition
    const shapeFaceStruct = StructHelper.createOptionsStruct(
      createStyle(shapeFaceDefinition),
    );

    assert.ok(shapeFaceStruct instanceof Struct);

    assert.ok(typeof shapeFaceStruct.schema.eyes !== 'undefined');
    assert.ok(typeof shapeFaceStruct.schema.face !== 'undefined');
    assert.ok(typeof shapeFaceStruct.schema.faceRotation !== 'undefined');
    assert.ok(typeof shapeFaceStruct.schema.faceProbability !== 'undefined');
    assert.ok(typeof shapeFaceStruct.schema.faceOffsetX !== 'undefined');
    assert.ok(typeof shapeFaceStruct.schema.faceOffsetY !== 'undefined');
    assert.ok(typeof shapeFaceStruct.schema.faceColor !== 'undefined');
    assert.ok(typeof shapeFaceStruct.schema.backgroundColor !== 'undefined');
  });

  it('createOptionsStruct #2', () => {
    const initialsStruct = StructHelper.createOptionsStruct(
      createStyle(initialsDefinition),
    );

    assert.ok(initialsStruct instanceof Struct);

    assert.ok(typeof initialsStruct.schema.textColor !== 'undefined');
    assert.ok(typeof initialsStruct.schema.backgroundColor !== 'undefined');
  });

  it('createOptionsStruct #3', () => {
    const minimalStruct = StructHelper.createOptionsStruct(
      createStyle(minimalDefinition),
    );

    assert.ok(minimalStruct instanceof Struct);
  });
});
