import assert from 'node:assert';
import { describe, it } from 'node:test';

import { Builder } from '../../lib/Builder.js';
import { AttributeHelper } from '../../lib/helpers/AttributeHelper.js';

import minimalStyle from '../fixtures/definitions/minimal.json' assert { type: 'json' };
import { createStyle } from '../../lib/index.js';

describe('AttributeHelper', () => {
  it('fillAttributes', () => {
    const style = createStyle({
      body: {
        content: '',
        width: 100,
        height: 100,
      },
      attributes: [
        {
          name: 'test-name',
          value: 'test-value',
        },
      ],
    });

    const builder = new Builder(style);

    AttributeHelper.fillAttributes(builder);

    assert.equal(builder.getAttributes().get('test-name'), 'test-value');
    assert.equal(builder.getAttributes().get('viewBox'), '0 0 100 100');
    assert.equal(builder.getAttributes().get('does-not-exist'), undefined);
  });

  it('fillSizeAttributes width = height', () => {
    const style = createStyle(minimalStyle);
    const builder = new Builder(style);

    builder.getProperties().set('size', 100);

    AttributeHelper.fillAttributes(builder);
    AttributeHelper.fillSizeAttributes(builder);

    assert.equal(builder.getAttributes().get('width'), '100');
    assert.equal(builder.getAttributes().get('height'), '100');
  });

  it('fillSizeAttributes width > height', () => {
    const style = createStyle({
      body: {
        content: '',
        width: 100,
        height: 50,
      },
    });

    const builder = new Builder(style);

    builder.getProperties().set('size', 200);

    AttributeHelper.fillAttributes(builder);
    AttributeHelper.fillSizeAttributes(builder);

    assert.equal(builder.getAttributes().get('width'), '200');
    assert.equal(builder.getAttributes().get('height'), '100');
  });

  it('fillSizeAttributes width < height', () => {
    const style = createStyle({
      body: {
        content: '',
        width: 50,
        height: 100,
      },
    });

    const builder = new Builder(style);

    builder.getProperties().set('size', 200);

    AttributeHelper.fillAttributes(builder);
    AttributeHelper.fillSizeAttributes(builder);

    assert.equal(builder.getAttributes().get('width'), '100');
    assert.equal(builder.getAttributes().get('height'), '200');
  });
});
