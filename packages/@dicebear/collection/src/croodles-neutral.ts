import { createStyle, StyleDefinition } from '@dicebear/core';
import definition from '@dicebear/definitions/croodles-neutral.json' with { type: 'json' };

interface CroodlesNeutralOptions {
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
  >;
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
  >;
  nose?: Array<
    | 'variant01'
    | 'variant02'
    | 'variant03'
    | 'variant04'
    | 'variant05'
    | 'variant06'
    | 'variant07'
    | 'variant08'
    | 'variant09'
  >;
  eyepatchColor: string[];
  glassesColor: string[];
}

const croodlesNeutral = createStyle<CroodlesNeutralOptions>(
  definition as StyleDefinition,
);

export { croodlesNeutral };
