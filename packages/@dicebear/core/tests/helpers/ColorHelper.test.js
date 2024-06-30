import assert from 'node:assert';
import { describe, it } from 'node:test';

import { ColorHelper } from '../../lib/helpers/ColorHelper.js';
import { ColorModel } from '../../lib/models/ColorModel.js';

describe('ColorHelper', () => {
  it('getContrastColor', () => {
    const white = new ColorModel('ffffff');
    const red = new ColorModel('ff0000');
    const green = new ColorModel('00ff00');
    const blue = new ColorModel('0000ff');
    const black = new ColorModel('000000');
    const transparent = new ColorModel('00000000');

    assert.equal(ColorHelper.getContrastColor(white, []), undefined);
    assert.equal(ColorHelper.getContrastColor(white, [transparent]), undefined);

    assert.equal(
      ColorHelper.getContrastColor(white, [white]).getHex(),
      white.getHex(),
    );

    assert.equal(
      ColorHelper.getContrastColor(white, [
        white,
        red,
        green,
        blue,
        black,
      ]).getHex(),
      black.getHex(),
    );

    assert.equal(
      ColorHelper.getContrastColor(red, [
        white,
        red,
        green,
        blue,
        black,
      ]).getHex(),
      black.getHex(),
    );

    assert.equal(
      ColorHelper.getContrastColor(green, [red, green, blue]).getHex(),
      blue.getHex(),
    );

    assert.equal(
      ColorHelper.getContrastColor(green, [green, blue, red]).getHex(),
      blue.getHex(),
    );
  });

  it('getContrastRatio', () => {
    const white = new ColorModel('ffffff');
    const red = new ColorModel('ff0000');
    const green = new ColorModel('00ff00');
    const blue = new ColorModel('0000ff');
    const black = new ColorModel('000000');

    assert.equal(ColorHelper.getContrastRatio(white, white), 1);

    assert.equal(ColorHelper.getContrastRatio(red, white), 3.9985);
    assert.equal(ColorHelper.getContrastRatio(white, red), 3.9985);

    assert.equal(ColorHelper.getContrastRatio(green, white), 1.3722);
    assert.equal(ColorHelper.getContrastRatio(white, green), 1.3722);

    assert.equal(ColorHelper.getContrastRatio(blue, white), 8.5925);
    assert.equal(ColorHelper.getContrastRatio(white, blue), 8.5925);

    assert.equal(ColorHelper.getContrastRatio(red, blue), 2.1489);
    assert.equal(ColorHelper.getContrastRatio(blue, red), 2.1489);

    assert.equal(ColorHelper.getContrastRatio(black, white), 21);
    assert.equal(ColorHelper.getContrastRatio(white, black), 21);
  });
});
