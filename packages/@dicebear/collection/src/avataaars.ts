import { createStyle, StyleDefinition } from '@dicebear/core';
import definition from '@dicebear/definitions/src/avataaars.json' with { type: 'json' };

interface AvataaarsOptions {
  accessories?: Array<
    | 'eyepatch'
    | 'kurt'
    | 'prescription01'
    | 'prescription02'
    | 'round'
    | 'sunglasses'
    | 'wayfarers'
  >;
  accessoriesProbability?: number;
  base?: Array<'default'>;
  clothing?: Array<
    | 'blazerAndShirt'
    | 'blazerAndSweater'
    | 'collarAndSweater'
    | 'graphicShirt'
    | 'hoodie'
    | 'overall'
    | 'shirtCrewNeck'
    | 'shirtScoopNeck'
    | 'shirtVNeck'
  >;
  clothingGraphic?: Array<
    | 'bat'
    | 'bear'
    | 'cumbia'
    | 'deer'
    | 'diamond'
    | 'hola'
    | 'pizza'
    | 'resist'
    | 'skull'
    | 'skullOutline'
  >;
  eyebrows?: Array<
    | 'angry'
    | 'angryNatural'
    | 'default'
    | 'defaultNatural'
    | 'flatNatural'
    | 'frownNatural'
    | 'raisedExcited'
    | 'raisedExcitedNatural'
    | 'sadConcerned'
    | 'sadConcernedNatural'
    | 'unibrowNatural'
    | 'upDown'
    | 'upDownNatural'
  >;
  eyes?: Array<
    | 'closed'
    | 'cry'
    | 'default'
    | 'eyeRoll'
    | 'happy'
    | 'hearts'
    | 'side'
    | 'squint'
    | 'surprised'
    | 'wink'
    | 'winkWacky'
    | 'xDizzy'
  >;
  facialHair?: Array<
    | 'beardLight'
    | 'beardMajestic'
    | 'beardMedium'
    | 'moustacheFancy'
    | 'moustacheMagnum'
  >;
  facialHairProbability?: number;
  mouth?: Array<
    | 'concerned'
    | 'default'
    | 'disbelief'
    | 'eating'
    | 'grimace'
    | 'sad'
    | 'screamOpen'
    | 'serious'
    | 'smile'
    | 'tongue'
    | 'twinkle'
    | 'vomit'
  >;
  nose?: Array<'default'>;
  style?: Array<'circle' | 'default'>;
  top?: Array<
    | 'bigHair'
    | 'bob'
    | 'bun'
    | 'curly'
    | 'curvy'
    | 'dreads'
    | 'dreads01'
    | 'dreads02'
    | 'frida'
    | 'frizzle'
    | 'fro'
    | 'froBand'
    | 'hat'
    | 'hijab'
    | 'longButNotTooLong'
    | 'miaWallace'
    | 'shaggy'
    | 'shaggyMullet'
    | 'shavedSides'
    | 'shortCurly'
    | 'shortFlat'
    | 'shortRound'
    | 'shortWaved'
    | 'sides'
    | 'straight01'
    | 'straight02'
    | 'straightAndStrand'
    | 'theCaesar'
    | 'theCaesarAndSidePart'
    | 'turban'
    | 'winterHat02'
    | 'winterHat03'
    | 'winterHat04'
    | 'winterHat1'
  >;
  topProbability?: number;
  circleColor: string[];
  accessoriesColor: string[];
  clothesColor: string[];
  facialHairColor: string[];
  hairColor: string[];
  hatColor: string[];
  skinColor: string[];
}

const avataaars = createStyle<AvataaarsOptions>(definition as StyleDefinition);

export { avataaars };
