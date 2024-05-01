import assert from 'node:assert';
import { describe, it } from 'node:test';

import { createStyle } from '../../lib/index.js';
import { OptionsCollection } from '../../lib/collections/OptionsCollection.js';

describe('OptionsCollection', () => {
  const style = createStyle({
    body: {
      content: '',
      height: 100,
      width: 100,
    },
  });

  it('get', () => {
    const collection = new OptionsCollection(style, {
      seed: 'John Doe',
    });

    assert.equal(collection.get('seed'), 'John Doe');
    assert.equal(collection.get('does-not-exists'), undefined);
  });

  it('has', () => {
    const collection = new OptionsCollection(style, {});

    assert.equal(collection.has('seed'), true);
    assert.equal(collection.has('does-not-exists'), false);
  });

  it('all', () => {
    const collection = new OptionsCollection(style, {});

    assert.deepEqual(collection.all(), [
      ['seed', ''],
      ['flip', false],
      ['rotate', 360],
      ['scale', 100],
      ['radius', 0],
      ['size', null],
      ['backgroundColor', []],
      ['translateX', 0],
      ['translateY', 0],
      ['clip', true],
      ['randomizeIds', false],
    ]);
  });

  it('getString', () => {
    const collection = new OptionsCollection(style, {});

    assert.equal(collection.getString('seed'), '');
    assert.throws(() => collection.getString('flip'));
    assert.throws(() => collection.getString('does-not-exists'));
  });

  it('getBoolean', () => {
    const collection = new OptionsCollection(style, {});

    assert.equal(collection.getBoolean('flip'), false);
    assert.throws(() => collection.getBoolean('seed'));
    assert.throws(() => collection.getBoolean('does-not-exists'));
  });

  it('getNumber', () => {
    const collection = new OptionsCollection(style, {});

    assert.equal(collection.getNumber('scale'), 100);
    assert.throws(() => collection.getNumber('flip'));
    assert.throws(() => collection.getNumber('does-not-exists'));
  });

  it('getArray', () => {
    const collection = new OptionsCollection(style, {});

    assert.deepEqual(collection.getArray('backgroundColor'), []);
    assert.throws(() => collection.getArray('seed'));
    assert.throws(() => collection.getArray('does-not-exists'));
  });
});
