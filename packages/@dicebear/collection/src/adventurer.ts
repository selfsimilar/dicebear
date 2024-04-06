import { createStyle, StyleDefinition } from '@dicebear/core';
import definition from '@dicebear/definitions/src/adventurer.json' with { type: 'json' };

interface AdventurerOptions {
  base?: Array<'default'>;
  earrings?: Array<
    | 'variant01'
    | 'variant02'
    | 'variant03'
    | 'variant04'
    | 'variant05'
    | 'variant06'
  >;
  earringsProbability?: number;
  eyebrows?: Array<
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
    | 'variant24'
    | 'variant25'
    | 'variant26'
  >;
  features?: Array<'birthmark' | 'blush' | 'freckles' | 'mustache'>;
  featuresProbability?: number;
  glasses?: Array<
    'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05'
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
    | 'long22'
    | 'long23'
    | 'long24'
    | 'long25'
    | 'long26'
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
  >;
  hairProbability?: number;
  mouth?: Array<
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
    | 'variant24'
    | 'variant25'
    | 'variant26'
    | 'variant27'
    | 'variant28'
    | 'variant29'
    | 'variant30'
  >;
  hairColor: string[];
  skinColor: string[];
}

const adventurer = createStyle<AdventurerOptions>(
  definition as StyleDefinition,
);

export { adventurer };
