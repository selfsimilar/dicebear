import assert from 'node:assert';
import { describe, it } from 'node:test';

import { PropertiesCollection } from '../../lib/collections/PropertiesCollection.js';

describe('PropertiesCollection', () => {
  it('get', () => {
    const collection = new PropertiesCollection();

    collection.set('key', 'value');

    assert.equal(collection.get('key'), 'value');
    assert.equal(collection.get('does-not-exists'), undefined);
  });

  it('has', () => {
    const collection = new PropertiesCollection();

    collection.set('key', 'value');

    assert.equal(collection.has('key'), true);
    assert.equal(collection.has('does-not-exists'), false);
  });

  it('all', () => {
    const collection = new PropertiesCollection();

    collection.set('key', 'value');
    collection.set('key2', 'value2');

    assert.deepEqual(collection.all(), [
      ['key', 'value'],
      ['key2', 'value2'],
    ]);
  });

  it('getString', () => {
    const collection = new PropertiesCollection();

    collection.set('string', 'value');
    collection.set('number', 1);

    assert.equal(collection.getString('string'), 'value');
    assert.throws(() => collection.getString('number'));
    assert.throws(() => collection.getString('does-not-exists'));
  });

  it('getBoolean', () => {
    const collection = new PropertiesCollection();

    collection.set('boolean', true);
    collection.set('number', 1);

    assert.equal(collection.getBoolean('boolean'), true);
    assert.throws(() => collection.getBoolean('number'));
    assert.throws(() => collection.getBoolean('does-not-exists'));
  });

  it('getNumber', () => {
    const collection = new PropertiesCollection();

    collection.set('number', 1);
    collection.set('boolean', true);

    assert.equal(collection.getNumber('number'), 1);
    assert.throws(() => collection.getNumber('boolean'));
    assert.throws(() => collection.getNumber('does-not-exists'));
  });

  it('getArray', () => {
    const collection = new PropertiesCollection();

    collection.set('array', [1, 2, 3]);
    collection.set('number', 1);

    assert.deepEqual(collection.getArray('array'), [1, 2, 3]);
    assert.throws(() => collection.getArray('number'));
    assert.throws(() => collection.getArray('does-not-exists'));
  });
});
