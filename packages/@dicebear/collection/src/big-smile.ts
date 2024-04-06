import { createStyle, StyleDefinition } from '@dicebear/core';
import definition from '@dicebear/definitions/src/big-smile.json' with { type: 'json' };

interface BigSmileOptions {
  accessories?: Array<
    | 'catEars'
    | 'clownNose'
    | 'faceMask'
    | 'glasses'
    | 'mustache'
    | 'sailormoonCrown'
    | 'sleepMask'
    | 'sunglasses'
  >;
  accessoriesProbability?: number;
  eyes?: Array<
    | 'angry'
    | 'cheery'
    | 'confused'
    | 'normal'
    | 'sad'
    | 'sleepy'
    | 'starstruck'
    | 'winking'
  >;
  face?: Array<'base'>;
  hair?: Array<
    | 'bangs'
    | 'bowlCutHair'
    | 'braids'
    | 'bunHair'
    | 'curlyBob'
    | 'curlyShortHair'
    | 'froBun'
    | 'halfShavedHead'
    | 'mohawk'
    | 'shavedHead'
    | 'shortHair'
    | 'straightHair'
    | 'wavyBob'
  >;
  mouth?: Array<
    | 'awkwardSmile'
    | 'braces'
    | 'gapSmile'
    | 'kawaii'
    | 'openedSmile'
    | 'openSad'
    | 'teethSmile'
    | 'unimpressed'
  >;
  hairColor: string[];
  skinColor: string[];
}

const bigSmile = createStyle<BigSmileOptions>(definition as StyleDefinition);

export { bigSmile };
