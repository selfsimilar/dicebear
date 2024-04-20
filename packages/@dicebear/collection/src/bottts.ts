import { createStyle, Definition } from "@dicebear/core";
import definition from "@dicebear/definitions/src/bottts.json" with {
    type: "json"
};

type BotttsOptions = {
        eyes?: Array<'bulging' | 'dizzy' | 'eva' | 'frame1' | 'frame2' | 'glow' | 'happy' | 'hearts' | 'robocop' | 'round' | 'roundFrame01' | 'roundFrame02' | 'sensor' | 'shade01'>;
        face?: Array<'round01' | 'round02' | 'square01' | 'square02' | 'square03' | 'square04'>;
        mouth?: Array<'bite' | 'diagram' | 'grill01' | 'grill02' | 'grill03' | 'smile01' | 'smile02' | 'square01' | 'square02'>;
        mouthProbability?: number;
        sides?: Array<'antenna01' | 'antenna02' | 'cables01' | 'cables02' | 'round' | 'square' | 'squareAssymetric'>;
        sidesProbability?: number;
        texture?: Array<'camo01' | 'camo02' | 'circuits' | 'dirty01' | 'dirty02' | 'dots' | 'grunge01' | 'grunge02'>;
        textureProbability?: number;
        top?: Array<'antenna' | 'antennaCrooked' | 'bulb01' | 'glowingBulb01' | 'glowingBulb02' | 'horns' | 'lights' | 'pyramid' | 'radar'>;
        topProbability?: number;
        baseColor: string[];
    };

const bottts = createStyle<BotttsOptions>(definition as Definition);

export { bottts };
