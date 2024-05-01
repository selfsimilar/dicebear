import assert from 'node:assert';
import { describe, it } from 'node:test';

import { StructHelper } from '../../lib/helpers/StructHelper.js';
import shapeFaceDefinition from '../fixtures/definitions/shape-face.json' assert { type: 'json' };
import initialsDefinition from '../fixtures/definitions/initials.json' assert { type: 'json' };
import minimalDefinition from '../fixtures/definitions/minimal.json' assert { type: 'json' };
import { DefinitionModel } from '../../lib/models/DefinitionModel.js';
import { Struct } from 'superstruct';

describe('StructHelper', () => {
  it('buildStructByDefinitionModel', () => {
    // shape face definition
    const shapeFaceStruct = StructHelper.buildStructByDefinitionModel(
      new DefinitionModel(shapeFaceDefinition),
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

    // initials definition
    const initialsStruct = StructHelper.buildStructByDefinitionModel(
      new DefinitionModel(initialsDefinition),
    );

    assert.ok(initialsStruct instanceof Struct);

    assert.ok(typeof initialsStruct.schema.textColor !== 'undefined');
    assert.ok(typeof initialsStruct.schema.backgroundColor !== 'undefined');

    // minimal definition
    const minimalStruct = StructHelper.buildStructByDefinitionModel(
      new DefinitionModel(minimalDefinition),
    );

    assert.ok(minimalStruct instanceof Struct);
  });

  it('buildComponentsStructByDefinitionModel', () => {
    // shape face definition
    const shapeFaceStruct = StructHelper.buildComponentsStructByDefinitionModel(
      new DefinitionModel(shapeFaceDefinition),
    );

    assert.ok(shapeFaceStruct instanceof Struct);

    assert.ok(typeof shapeFaceStruct.schema.eyes !== 'undefined');
    assert.ok(typeof shapeFaceStruct.schema.face !== 'undefined');
    assert.ok(typeof shapeFaceStruct.schema.faceRotation !== 'undefined');
    assert.ok(typeof shapeFaceStruct.schema.faceProbability !== 'undefined');
    assert.ok(typeof shapeFaceStruct.schema.faceOffsetX !== 'undefined');
    assert.ok(typeof shapeFaceStruct.schema.faceOffsetY !== 'undefined');

    // initials definition
    const initialsStruct = StructHelper.buildStructByDefinitionModel(
      new DefinitionModel(initialsDefinition),
    );

    assert.ok(initialsStruct instanceof Struct);

    // minimal definition
    const minimalStruct = StructHelper.buildStructByDefinitionModel(
      new DefinitionModel(minimalDefinition),
    );

    assert.ok(minimalStruct instanceof Struct);
  });

  it('buildColorsStructByDefinitionModel', () => {
    // shape face definition
    const shapeFaceStruct = StructHelper.buildColorsStructByDefinitionModel(
      new DefinitionModel(shapeFaceDefinition),
    );

    assert.ok(shapeFaceStruct instanceof Struct);

    assert.ok(typeof shapeFaceStruct.schema.faceColor !== 'undefined');
    assert.ok(typeof shapeFaceStruct.schema.backgroundColor !== 'undefined');

    // initials definition
    const initialsStruct = StructHelper.buildStructByDefinitionModel(
      new DefinitionModel(initialsDefinition),
    );

    assert.ok(initialsStruct instanceof Struct);

    assert.ok(typeof initialsStruct.schema.textColor !== 'undefined');
    assert.ok(typeof initialsStruct.schema.backgroundColor !== 'undefined');

    // minimal definition
    const minimalStruct = StructHelper.buildStructByDefinitionModel(
      new DefinitionModel(minimalDefinition),
    );

    assert.ok(minimalStruct instanceof Struct);
  });
});
