import assert from 'node:assert';
import { describe, it } from 'node:test';
import { ColorModel } from '../../lib/models/ColorModel.js';

describe('ColorModel', () => {
  it('constructor', () => {
    assert.throws(() => new ColorModel('invalid'));
    assert.throws(() => new ColorModel('gzh'));
    assert.throws(() => new ColorModel('ffff'));
  });

  it('getRgba', () => {
    assert.deepStrictEqual(
      new ColorModel('#FF0000FF').getRgba(),
      [255, 0, 0, 1],
    );
    assert.deepStrictEqual(new ColorModel('#FF0000').getRgba(), [255, 0, 0, 1]);
    assert.deepStrictEqual(new ColorModel('#F00').getRgba(), [255, 0, 0, 1]);
    assert.deepStrictEqual(new ColorModel('#f00').getRgba(), [255, 0, 0, 1]);
    assert.deepStrictEqual(new ColorModel('F00').getRgba(), [255, 0, 0, 1]);
    assert.deepStrictEqual(
      new ColorModel('transparent').getRgba(),
      [0, 0, 0, 0],
    );
  });

  it('getHex', () => {
    assert.strictEqual(new ColorModel('#FF0000FF').getHex(), '#ff0000ff');
    assert.strictEqual(new ColorModel('#FF0000').getHex(), '#ff0000ff');
    assert.strictEqual(new ColorModel('#F00').getHex(), '#ff0000ff');
    assert.strictEqual(new ColorModel('#f00').getHex(), '#ff0000ff');
    assert.strictEqual(new ColorModel('F00').getHex(), '#ff0000ff');
    assert.strictEqual(new ColorModel('transparent').getHex(), '#00000000');
  });

  it('getRelativeLuminance', () => {
    assert.strictEqual(
      new ColorModel('#FF0000').getRelativeLuminance(),
      0.2126,
    );

    assert.strictEqual(
      new ColorModel('#00FF00').getRelativeLuminance(),
      0.7152,
    );

    assert.strictEqual(
      new ColorModel('#0000FF').getRelativeLuminance(),
      0.0722,
    );

    assert.strictEqual(new ColorModel('#000000').getRelativeLuminance(), 0);

    assert.strictEqual(new ColorModel('#FFFFFF').getRelativeLuminance(), 1);

    assert.strictEqual(new ColorModel('#FFFFFF00').getRelativeLuminance(), 1);
  });

  it('isTransparent', () => {
    assert.strictEqual(new ColorModel('#000000').isTransparent(), false);
    assert.strictEqual(new ColorModel('#FFFFFF').isTransparent(), false);
    assert.strictEqual(new ColorModel('#FFFFFFF0').isTransparent(), false);
    assert.strictEqual(new ColorModel('#FFFFFF00').isTransparent(), true);
    assert.strictEqual(new ColorModel('transparent').isTransparent(), true);
  });
});
