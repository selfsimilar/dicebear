import assert from 'node:assert';
import { describe, it } from 'node:test';

import { PropertyHelper } from '../../lib/helpers/PropertyHelper.js';
import { createStyle } from '../../lib/index.js';

import shapeFaceDefinition from '../fixtures/definitions/shape-face.json' assert { type: 'json' };
import { Builder } from '../../lib/Builder.js';
import { OptionsCollection } from '../../lib/collections/OptionsCollection.js';

describe('PropertyHelper', () => {
  it('fillProperties #1', () => {
    const style = createStyle(shapeFaceDefinition);
    const builder = Builder.create(style);
    const options = new OptionsCollection(style, {});

    PropertyHelper.fillProperties(builder, options);

    const properties = builder.getProperties();

    assert.equal(properties.get('size'), null);
    assert.equal(properties.get('backgroundColor').getHex(), '#ea5455ff');
    assert.equal(properties.get('face'), 'ellipse');
    assert.equal(properties.get('faceColor').getHex(), '#ffd460ff');
    assert.equal(properties.get('faceOffsetX'), -3);
    assert.equal(properties.get('faceOffsetY'), 0);
    assert.equal(properties.get('faceRotation'), -3);
    assert.equal(properties.get('faceProbability'), 100);
  });

  it('fillProperties #2', () => {
    const style = createStyle(shapeFaceDefinition);
    const builder = Builder.create(style);
    const options = new OptionsCollection(style, {
      size: 200,
      faceProbability: 0,
      faceOffsetX: [-20, 20],
      faceOffsetY: [-20, 20],
      faceRotation: [-20, 20],
      backgroundColor: [],
    });

    PropertyHelper.fillProperties(builder, options);

    const properties = builder.getProperties();

    assert.equal(properties.get('size'), 200);
    assert.equal(properties.get('backgroundColor'), null);
    assert.equal(properties.get('face'), null);
    assert.equal(properties.get('faceColor').getHex(), '#ea5455ff');
    assert.equal(properties.get('faceOffsetX'), -5);
    assert.equal(properties.get('faceOffsetY'), 0);
    assert.equal(properties.get('faceRotation'), -5);
    assert.equal(properties.get('faceProbability'), 0);
  });
});
