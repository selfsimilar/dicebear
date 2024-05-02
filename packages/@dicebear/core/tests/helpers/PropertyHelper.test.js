import assert from 'node:assert';
import { describe, it } from 'node:test';

import { PropertyHelper } from '../../lib/helpers/PropertyHelper.js';
import { createStyle } from '../../lib/index.js';

import shapeFaceDefinition from '../fixtures/definitions/shape-face.json' assert { type: 'json' };
import { Builder } from '../../lib/Builder.js';
import { OptionsCollection } from '../../lib/collections/OptionsCollection.js';

describe('PropertyHelper', () => {
  it('fillProperties', () => {
    const style = createStyle(shapeFaceDefinition);
    const builder = new Builder(style);
    const options = new OptionsCollection(style, {});

    PropertyHelper.fillProperties(builder, options);

    const properties = builder.getProperties();

    assert.equal(properties.get('backgroundColor').getHex(), '#ea5455ff');
    assert.equal(properties.get('faceColor').getHex(), '#ffd460ff');
  });
});
