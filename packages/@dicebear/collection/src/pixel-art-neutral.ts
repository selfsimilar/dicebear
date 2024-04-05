import { createStyle, StyleDefinition } from '@dicebear/core';
import definition from '@dicebear/definitions/pixel-art-neutral.json' with { type: 'json' };

interface PixelArtNeutralOptions {
  eyes?: Array<
    | 'variant01'
    | 'variant02'
    | 'variant03'
    | 'variant04'
    | 'variant05'
    | 'variant06'
    | 'variant07'
    | 'variant08'
    | 'variant09'
    | 'variant10'
    | 'variant11'
    | 'variant12'
  >;
  glasses?: Array<
    | 'dark01'
    | 'dark02'
    | 'dark03'
    | 'dark04'
    | 'dark05'
    | 'dark06'
    | 'dark07'
    | 'light01'
    | 'light02'
    | 'light03'
    | 'light04'
    | 'light05'
    | 'light06'
    | 'light07'
  >;
  glassesProbability?: number;
  mouth?: Array<
    | 'happy01'
    | 'happy02'
    | 'happy03'
    | 'happy04'
    | 'happy05'
    | 'happy06'
    | 'happy07'
    | 'happy08'
    | 'happy09'
    | 'happy10'
    | 'happy11'
    | 'happy12'
    | 'happy13'
    | 'sad01'
    | 'sad02'
    | 'sad03'
    | 'sad04'
    | 'sad05'
    | 'sad06'
    | 'sad07'
    | 'sad08'
    | 'sad09'
    | 'sad10'
  >;
  eyesColor: string[];
  glassesColor: string[];
  mouthColor: string[];
}

const pixelArtNeutral = createStyle<PixelArtNeutralOptions>(
  definition as StyleDefinition,
);

export { pixelArtNeutral };
