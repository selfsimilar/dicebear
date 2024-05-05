import assert from 'node:assert';
import { describe, it } from 'node:test';

import { Prng } from '../lib/Prng.js';

describe('Prng', () => {
  it('create', () => {
    const prng = Prng.create('test');

    assert.equal(typeof prng.getSeed(), 'string');
  });

  it('createAtRandom', () => {
    const prng = Prng.createAtRandom();

    for (let i = 0; i < 100; i++) {
      assert.equal(typeof prng.getSeed(), 'string');
      assert.equal(prng.getSeed().length, 5);
    }
  });

  it('bool', () => {
    const prng = Prng.create('test');

    assert.equal(prng.bool(), false);
    assert.equal(prng.bool(), true);
    assert.equal(prng.bool(), false);
    assert.equal(prng.bool(), true);
    assert.equal(prng.bool(), false);
    assert.equal(prng.bool(), true);
    assert.equal(prng.bool(), false);
    assert.equal(prng.bool(), false);
    assert.equal(prng.bool(), false);
    assert.equal(prng.bool(), true);

    for (let i = 0; i < 100; i++) {
      assert.equal(prng.bool(0), false);
      assert.equal(prng.bool(100), true);
    }
  });

  it('integer', () => {
    const prng = Prng.create('test');

    assert.equal(prng.integer(0, 100), 79);
    assert.equal(prng.integer(0, 100), 35);
    assert.equal(prng.integer(0, 100), 51);
    assert.equal(prng.integer(0, 100), 37);
    assert.equal(prng.integer(0, 100), 61);
    assert.equal(prng.integer(0, 100), 9);
    assert.equal(prng.integer(0, 100), 94);
    assert.equal(prng.integer(0, 100), 53);
    assert.equal(prng.integer(0, 100), 70);
    assert.equal(prng.integer(0, 100), 17);

    for (let i = 0; i < 100; i++) {
      assert.equal(prng.integer(0, 0), 0);
      assert.equal(prng.integer(100, 100), 100);
    }
  });

  it('pick', () => {
    const prng = Prng.create('test');

    assert.equal(prng.pick(['a', 'b', 'c']), 'c');
    assert.equal(prng.pick(['a', 'b', 'c']), 'b');
    assert.equal(prng.pick(['a', 'b', 'c']), 'b');
    assert.equal(prng.pick(['a', 'b', 'c']), 'b');
    assert.equal(prng.pick(['a', 'b', 'c']), 'b');
    assert.equal(prng.pick(['a', 'b', 'c']), 'a');
    assert.equal(prng.pick(['a', 'b', 'c']), 'c');
    assert.equal(prng.pick(['a', 'b', 'c']), 'b');
    assert.equal(prng.pick(['a', 'b', 'c']), 'c');
    assert.equal(prng.pick(['a', 'b', 'c']), 'a');

    assert.equal(prng.pick([]), undefined);
    assert.equal(prng.pick([], 'fallback'), 'fallback');

    // Unsorted array should output the same result
    const prngUnsorted = Prng.create('test');

    assert.equal(prngUnsorted.pick(['c', 'a', 'b']), 'c');
    assert.equal(prngUnsorted.pick(['c', 'a', 'b']), 'b');
    assert.equal(prngUnsorted.pick(['c', 'a', 'b']), 'b');
    assert.equal(prngUnsorted.pick(['c', 'a', 'b']), 'b');
    assert.equal(prngUnsorted.pick(['c', 'a', 'b']), 'b');
    assert.equal(prngUnsorted.pick(['c', 'a', 'b']), 'a');
    assert.equal(prngUnsorted.pick(['c', 'a', 'b']), 'c');
    assert.equal(prngUnsorted.pick(['c', 'a', 'b']), 'b');
    assert.equal(prngUnsorted.pick(['c', 'a', 'b']), 'c');
    assert.equal(prngUnsorted.pick(['c', 'a', 'b']), 'a');
  });

  it('string', () => {
    const prng = Prng.create('test');

    assert.equal(prng.string(0), '');
    assert.equal(prng.string(2), 'ew');
    assert.equal(prng.string(4), 'bmcb');
    assert.equal(prng.string(6), 'vol5vc');
    assert.equal(prng.string(8), '90auhpix');
  });
});
