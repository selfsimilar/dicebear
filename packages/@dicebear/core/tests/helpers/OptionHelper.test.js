import assert from 'node:assert';
import { describe, it } from 'node:test';

import { OptionHelper } from '../../lib/helpers/OptionHelper.js';

import shapeFaceDefinition from '../fixtures/definitions/shape-face.json' assert { type: 'json' };
import { createStyle } from '../../lib/index.js';

describe('OptionHelper', () => {
  it('validateOptions', () => {
    const style = createStyle(shapeFaceDefinition);

    assert.deepEqual(OptionHelper.validateOptions(style, {}), {
      seed: '',
      flip: false,
      rotate: 360,
      scale: 100,
      radius: 0,
      size: null,
      backgroundColor: ['3d84a8', 'ea5455', 'ffd460'],
      translateX: 0,
      translateY: 0,
      clip: true,
      randomizeIds: false,
      faceColor: ['3d84a8', 'ea5455', 'ffd460'],
      eyesColor: ['000000', 'ffffff'],
      eyes: ['rectangle', 'ellipse', 'polygon'],
      face: ['ellipse', 'polygon'],
      faceProbability: 100,
      faceRotation: [-10, 10],
      faceOffsetX: [-10, 10],
      faceOffsetY: [-10, 10],
    });

    assert.deepEqual(
      OptionHelper.validateOptions(style, {
        eyes: ['ellipse'],
      }),
      {
        seed: '',
        flip: false,
        rotate: 360,
        scale: 100,
        radius: 0,
        size: null,
        backgroundColor: ['3d84a8', 'ea5455', 'ffd460'],
        translateX: 0,
        translateY: 0,
        clip: true,
        randomizeIds: false,
        faceColor: ['3d84a8', 'ea5455', 'ffd460'],
        eyesColor: ['000000', 'ffffff'],
        eyes: ['ellipse'],
        face: ['ellipse', 'polygon'],
        faceProbability: 100,
        faceRotation: [-10, 10],
        faceOffsetX: [-10, 10],
        faceOffsetY: [-10, 10],
      },
    );

    assert.deepEqual(
      OptionHelper.validateOptions(style, {
        doesNotExist: ['ellipse'],
      }),
      {
        seed: '',
        flip: false,
        rotate: 360,
        scale: 100,
        radius: 0,
        size: null,
        backgroundColor: ['3d84a8', 'ea5455', 'ffd460'],
        translateX: 0,
        translateY: 0,
        clip: true,
        randomizeIds: false,
        faceColor: ['3d84a8', 'ea5455', 'ffd460'],
        eyesColor: ['000000', 'ffffff'],
        eyes: ['rectangle', 'ellipse', 'polygon'],
        face: ['ellipse', 'polygon'],
        faceProbability: 100,
        faceRotation: [-10, 10],
        faceOffsetX: [-10, 10],
        faceOffsetY: [-10, 10],
      },
    );

    assert.throws(() =>
      OptionHelper.validateOptions(style, {
        eyes: 'invalidType',
      }),
    );
  });
});
