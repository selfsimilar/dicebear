import assert from 'node:assert';
import { describe, it } from 'node:test';

import { ColorHelper } from '../../lib/helpers/ColorHelper.js';
import { Prng } from '../../lib/Prng.js';

describe('ColorHelper', () => {
  it('convertColor', () => {
    assert.equal(ColorHelper.convertColor(''), 'transparent');
    assert.equal(ColorHelper.convertColor('ffffff'), '#ffffff');
    assert.equal(ColorHelper.convertColor('#ffffff'), '#ffffff');
    assert.equal(ColorHelper.convertColor('transparent'), 'transparent');
  });

  it('getBackgroundColors', () => {
    const prng = Prng.fromSeed('test');

    assert.deepEqual(
      ColorHelper.getBackgroundColors(prng, [], 'gradientLinear'),
      ['transparent', 'transparent'],
    );

    assert.deepEqual(
      ColorHelper.getBackgroundColors(prng, ['ffffff'], 'gradientLinear'),
      ['#ffffff', '#ffffff'],
    );

    for (let i = 0; i < 100; i++) {
      // Do not shuffle with only two colors and linear gradient
      assert.deepEqual(
        ColorHelper.getBackgroundColors(
          prng,
          ['ffffff', '000000'],
          'gradientLinear',
        ),
        ['#ffffff', '#000000'],
      );
    }

    assert.deepEqual(
      ColorHelper.getBackgroundColors(
        prng,
        ['ffffff', '000fff', 'fff000', '000000'],
        'gradientLinear',
      ),
      ['#000000', '#ffffff'],
    );
  });

  it('getBackgroundRotation', () => {
    const prng = Prng.fromSeed('test');

    assert.equal(ColorHelper.getBackgroundRotation(prng, [-180, 180]), 105);
    assert.equal(ColorHelper.getBackgroundRotation(prng, [-180, 180]), -53);
    assert.equal(ColorHelper.getBackgroundRotation(prng, [-180, 180]), 2);
    assert.equal(ColorHelper.getBackgroundRotation(prng, [-180, 180]), -47);
    assert.equal(ColorHelper.getBackgroundRotation(prng, [-180, 180]), 39);
    assert.equal(ColorHelper.getBackgroundRotation(prng, [-180, 180]), -145);
    assert.equal(ColorHelper.getBackgroundRotation(prng, [-180, 180]), 158);
    assert.equal(ColorHelper.getBackgroundRotation(prng, [-180, 180]), 12);
    assert.equal(ColorHelper.getBackgroundRotation(prng, [-180, 180]), 71);
    assert.equal(ColorHelper.getBackgroundRotation(prng, []), 0);
  });

  it('getBackgroundType', () => {
    const prng = Prng.fromSeed('test');

    assert.equal(ColorHelper.getBackgroundType(prng, []), 'solid');

    assert.equal(ColorHelper.getBackgroundType(prng, ['solid']), 'solid');

    assert.equal(
      ColorHelper.getBackgroundType(prng, ['gradientLinear']),
      'gradientLinear',
    );

    assert.equal(
      ColorHelper.getBackgroundType(prng, ['solid', 'gradientLinear']),
      'solid',
    );
    assert.equal(
      ColorHelper.getBackgroundType(prng, ['solid', 'gradientLinear']),
      'gradientLinear',
    );
    assert.equal(
      ColorHelper.getBackgroundType(prng, ['solid', 'gradientLinear']),
      'solid',
    );
    assert.equal(
      ColorHelper.getBackgroundType(prng, ['solid', 'gradientLinear']),
      'gradientLinear',
    );
    assert.equal(
      ColorHelper.getBackgroundType(prng, ['solid', 'gradientLinear']),
      'gradientLinear',
    );
  });

  it('getHighestContrastColor', () => {
    assert.equal(ColorHelper.getHighestContrastColor('ffffff', []), undefined);

    assert.equal(
      ColorHelper.getHighestContrastColor('ffffff', ['transparent']),
      undefined,
    );

    assert.equal(
      ColorHelper.getHighestContrastColor('ffffff', ['ffffff']),
      'ffffff',
    );

    assert.equal(
      ColorHelper.getHighestContrastColor('ffffff', ['000000']),
      '000000',
    );

    assert.equal(
      ColorHelper.getHighestContrastColor('ffffff', ['000000', 'ffffff']),
      '000000',
    );

    assert.equal(
      ColorHelper.getHighestContrastColor('ffffff', [
        'ff0000',
        '00ff00',
        '0000ff',
      ]),
      '0000ff',
    );

    assert.equal(
      ColorHelper.getHighestContrastColor('00ff00', [
        'ff0000',
        '00ff00',
        '0000ff',
      ]),
      '0000ff',
    );

    assert.equal(
      ColorHelper.getHighestContrastColor('0000ff', [
        'ff0000',
        '00ff00',
        '0000ff',
      ]),
      '00ff00',
    );
  });
});
