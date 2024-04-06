import { createStyle, StyleDefinition } from '@dicebear/core';
import definition from '@dicebear/definitions/src/pixel-art.json' with { type: 'json' };

interface PixelArtOptions {
  accessories?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04'>;
  accessoriesProbability?: number;
  beard?: Array<
    | 'variant01'
    | 'variant02'
    | 'variant03'
    | 'variant04'
    | 'variant05'
    | 'variant06'
    | 'variant07'
    | 'variant08'
  >;
  beardProbability?: number;
  clothing?: Array<
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
    | 'variant13'
    | 'variant14'
    | 'variant15'
    | 'variant16'
    | 'variant17'
    | 'variant18'
    | 'variant19'
    | 'variant20'
    | 'variant21'
    | 'variant22'
    | 'variant23'
  >;
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
  hair?: Array<
    | 'long01'
    | 'long02'
    | 'long03'
    | 'long04'
    | 'long05'
    | 'long06'
    | 'long07'
    | 'long08'
    | 'long09'
    | 'long10'
    | 'long11'
    | 'long12'
    | 'long13'
    | 'long14'
    | 'long15'
    | 'long16'
    | 'long17'
    | 'long18'
    | 'long19'
    | 'long20'
    | 'long21'
    | 'short01'
    | 'short02'
    | 'short03'
    | 'short04'
    | 'short05'
    | 'short06'
    | 'short07'
    | 'short08'
    | 'short09'
    | 'short10'
    | 'short11'
    | 'short12'
    | 'short13'
    | 'short14'
    | 'short15'
    | 'short16'
    | 'short17'
    | 'short18'
    | 'short19'
    | 'short20'
    | 'short21'
    | 'short22'
    | 'short23'
    | 'short24'
  >;
  hat?: Array<
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
  >;
  hatProbability?: number;
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
  accessoriesColor: string[];
  clothingColor: string[];
  eyesColor: string[];
  glassesColor: string[];
  hairColor: string[];
  hatColor: string[];
  mouthColor: string[];
  skinColor: string[];
}

const pixelArt = createStyle<PixelArtOptions>(definition as StyleDefinition);

export { pixelArt };
