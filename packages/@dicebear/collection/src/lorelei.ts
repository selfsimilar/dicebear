import { createStyle, StyleDefinition } from '@dicebear/core';
import definition from '@dicebear/definitions/lorelei.json' with { type: 'json' };

interface LoreleiOptions {
  beard?: Array<'variant01' | 'variant02'>;
  beardProbability?: number;
  earrings?: Array<'variant01' | 'variant02' | 'variant03'>;
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
  >;
  freckles?: Array<'variant01'>;
  frecklesProbability?: number;
  glasses?: Array<
    'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05'
  >;
  glassesProbability?: number;
  hair?: Array<
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
    | 'variant31'
    | 'variant32'
    | 'variant33'
    | 'variant34'
    | 'variant35'
    | 'variant36'
    | 'variant37'
    | 'variant38'
    | 'variant39'
    | 'variant40'
    | 'variant41'
    | 'variant42'
    | 'variant43'
    | 'variant44'
    | 'variant45'
    | 'variant46'
    | 'variant47'
    | 'variant48'
  >;
  hairAccessories?: Array<'flowers'>;
  hairAccessoriesProbability?: number;
  head?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04'>;
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
    | 'happy14'
    | 'happy15'
    | 'happy16'
    | 'happy17'
    | 'happy18'
    | 'sad01'
    | 'sad02'
    | 'sad03'
    | 'sad04'
    | 'sad05'
    | 'sad06'
    | 'sad07'
    | 'sad08'
    | 'sad09'
  >;
  nose?: Array<
    | 'variant01'
    | 'variant02'
    | 'variant03'
    | 'variant04'
    | 'variant05'
    | 'variant06'
  >;
  earringsColor: string[];
  eyebrowsColor: string[];
  eyesColor: string[];
  frecklesColor: string[];
  glassesColor: string[];
  hairColor: string[];
  hairAccessoriesColor: string[];
  mouthColor: string[];
  noseColor: string[];
  skinColor: string[];
}

const lorelei = createStyle<LoreleiOptions>(definition as StyleDefinition);

export { lorelei };
