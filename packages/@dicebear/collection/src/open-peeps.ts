import { createStyle, StyleDefinition } from "@dicebear/core";
import definition from "@dicebear/definitions/open-peeps.json" with {
    type: "json"
};

interface OpenPeepsOptions {
    accessories?: Array<'eyepatch' | 'glasses' | 'glasses2' | 'glasses3' | 'glasses4' | 'glasses5' | 'sunglasses' | 'sunglasses2'>;
    accessoriesProbability?: number;
    face?: Array<'angryWithFang' | 'awe' | 'blank' | 'calm' | 'cheeky' | 'concerned' | 'concernedFear' | 'contempt' | 'cute' | 'cyclops' | 'driven' | 'eatingHappy' | 'explaining' | 'eyesClosed' | 'fear' | 'hectic' | 'lovingGrin1' | 'lovingGrin2' | 'monster' | 'old' | 'rage' | 'serious' | 'smile' | 'smileBig' | 'smileLOL' | 'smileTeethGap' | 'solemn' | 'suspicious' | 'tired' | 'veryAngry'>;
    facialHair?: Array<'chin' | 'full' | 'full2' | 'full3' | 'full4' | 'goatee1' | 'goatee2' | 'moustache1' | 'moustache2' | 'moustache3' | 'moustache4' | 'moustache5' | 'moustache6' | 'moustache7' | 'moustache8' | 'moustache9'>;
    facialHairProbability?: number;
    head?: Array<'afro' | 'bangs' | 'bangs2' | 'bantuKnots' | 'bear' | 'bun' | 'bun2' | 'buns' | 'cornrows' | 'cornrows2' | 'dreads1' | 'dreads2' | 'flatTop' | 'flatTopLong' | 'grayBun' | 'grayMedium' | 'grayShort' | 'hatBeanie' | 'hatHip' | 'hijab' | 'long' | 'longAfro' | 'longBangs' | 'longCurly' | 'medium1' | 'medium2' | 'medium3' | 'mediumBangs' | 'mediumBangs2' | 'mediumBangs3' | 'mediumStraight' | 'mohawk' | 'mohawk2' | 'noHair1' | 'noHair2' | 'noHair3' | 'pomp' | 'shaved1' | 'shaved2' | 'shaved3' | 'short1' | 'short2' | 'short3' | 'short4' | 'short5' | 'turban' | 'twists' | 'twists2'>;
    mask?: Array<'medicalMask' | 'respirator'>;
    maskProbability?: number;
    clothingColor: string[];
    headContrastColor: string[];
    skinColor: string[];
}

const openPeeps = createStyle<OpenPeepsOptions>(definition as StyleDefinition);

export { openPeeps };
