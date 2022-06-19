/**
 * Do not change this file manually! This file was generated with the "Dicebear Exporter"-Plugin for Figma.
 *
 * Plugin: https://www.figma.com/community/plugin/1005765655729342787
 * File: https://www.figma.com/file/WTcivb1XPf5ODtyv7ZNnU9/%40dicebear%2Fpixel-art?node-id=5%3A1231
 */

import type { Prng } from '@dicebear/core';
import type { Options, ColorPickCollection } from '../types.js';

type Props = {
  prng: Prng,
  options: Options
}

export function getColors({ prng, options }: Props): ColorPickCollection {
  return {
    'accessories': prng.pick(options.accessoriesColor ?? []) ?? 'transparent',
    'clothing': prng.pick(options.clothingColor ?? []) ?? 'transparent',
    'eyes': prng.pick(options.eyesColor ?? []) ?? 'transparent',
    'glasses': prng.pick(options.glassesColor ?? []) ?? 'transparent',
    'hair': prng.pick(options.hairColor ?? []) ?? 'transparent',
    'mouth': prng.pick(options.mouthColor ?? []) ?? 'transparent',
    'skin': prng.pick(options.skinColor ?? []) ?? 'transparent',
  }
};
