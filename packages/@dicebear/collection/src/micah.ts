import { createStyle, StyleDefinition } from '@dicebear/core';
import definition from '@dicebear/definitions/src/micah.json' with { type: 'json' };

interface MicahOptions {
  base?: Array<'standard'>;
  earrings?: Array<'hoop' | 'stud'>;
  earringsProbability?: number;
  ears?: Array<'attached' | 'detached'>;
  eyebrows?: Array<'down' | 'eyelashesDown' | 'eyelashesUp' | 'up'>;
  eyes?: Array<'eyes' | 'eyesShadow' | 'round' | 'smiling' | 'smilingShadow'>;
  facialHair?: Array<'beard' | 'scruff'>;
  facialHairProbability?: number;
  glasses?: Array<'round' | 'square'>;
  glassesProbability?: number;
  hair?: Array<
    | 'dannyPhantom'
    | 'dougFunny'
    | 'fonze'
    | 'full'
    | 'mrClean'
    | 'mrT'
    | 'pixie'
    | 'turban'
  >;
  hairProbability?: number;
  mouth?: Array<
    | 'frown'
    | 'laughing'
    | 'nervous'
    | 'pucker'
    | 'sad'
    | 'smile'
    | 'smirk'
    | 'surprised'
  >;
  nose?: Array<'curve' | 'pointed' | 'tound'>;
  shirt?: Array<'collared' | 'crew' | 'open'>;
  baseColor: string[];
  earringColor: string[];
  eyeShadowColor: string[];
  eyebrowsColor: string[];
  eyesColor: string[];
  facialHairColor: string[];
  glassesColor: string[];
  hairColor: string[];
  mouthColor: string[];
  shirtColor: string[];
}

const micah = createStyle<MicahOptions>(definition as StyleDefinition);

export { micah };
