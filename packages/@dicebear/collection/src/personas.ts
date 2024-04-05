import { createStyle, StyleDefinition } from '@dicebear/core';
import definition from '@dicebear/definitions/personas.json' with { type: 'json' };

interface PersonasOptions {
  body?: Array<'checkered' | 'rounded' | 'small' | 'squared'>;
  eyes?: Array<'glasses' | 'happy' | 'open' | 'sleep' | 'sunglasses' | 'wink'>;
  facialHair?: Array<
    'beardMustache' | 'goatee' | 'pyramid' | 'shadow' | 'soulPatch' | 'walrus'
  >;
  facialHairProbability?: number;
  hair?: Array<
    | 'bald'
    | 'balding'
    | 'beanie'
    | 'bobBangs'
    | 'bobCut'
    | 'bunUndercut'
    | 'buzzcut'
    | 'cap'
    | 'curly'
    | 'curlyBun'
    | 'curlyHighTop'
    | 'extraLong'
    | 'fade'
    | 'long'
    | 'mohawk'
    | 'pigtails'
    | 'shortCombover'
    | 'shortComboverChops'
    | 'sideShave'
    | 'straightBun'
  >;
  mouth?: Array<
    'bigSmile' | 'frown' | 'lips' | 'pacifier' | 'smile' | 'smirk' | 'surprise'
  >;
  nose?: Array<'mediumRound' | 'smallRound' | 'wrinkles'>;
  clothingColor: string[];
  hairColor: string[];
  skinColor: string[];
}

const personas = createStyle<PersonasOptions>(definition as StyleDefinition);

export { personas };
