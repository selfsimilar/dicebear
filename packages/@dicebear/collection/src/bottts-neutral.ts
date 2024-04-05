import { createStyle, StyleDefinition } from "@dicebear/core";
import definition from "@dicebear/definitions/bottts-neutral.json" with {
    type: "json"
};

interface BotttsNeutralOptions {
    eyes?: Array<'bulging' | 'dizzy' | 'eva' | 'frame1' | 'frame2' | 'glow' | 'happy' | 'hearts' | 'robocop' | 'round' | 'roundFrame01' | 'roundFrame02' | 'sensor' | 'shade01'>;
    mouth?: Array<'bite' | 'diagram' | 'grill01' | 'grill02' | 'grill03' | 'smile01' | 'smile02' | 'square01' | 'square02'>;
}

const botttsNeutral = createStyle<BotttsNeutralOptions>(definition as StyleDefinition);

export { botttsNeutral };
