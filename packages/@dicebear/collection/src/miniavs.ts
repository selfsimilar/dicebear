import { createStyle, StyleDefinition } from "@dicebear/core";
import definition from "@dicebear/definitions/miniavs.json" with {
    type: "json"
};

interface MiniavsOptions {
    blushes?: Array<'default'>;
    blushesProbability?: number;
    body?: Array<'golf' | 'tShirt'>;
    eyes?: Array<'confident' | 'happy' | 'normal'>;
    glasses?: Array<'normal'>;
    glassesProbability?: number;
    hair?: Array<'balndess' | 'classic01' | 'classic02' | 'curly' | 'elvis' | 'long' | 'ponyTail' | 'slaughter' | 'stylish'>;
    head?: Array<'normal' | 'thin' | 'wide'>;
    mouth?: Array<'default' | 'missingTooth'>;
    mustache?: Array<'freddy' | 'horshoe' | 'pencilThin' | 'pencilThinBeard'>;
    mustacheProbability?: number;
    bodyColor: string[];
    hairColor: string[];
    skinColor: string[];
}

const miniavs = createStyle<MiniavsOptions>(definition as StyleDefinition);

export { miniavs };
