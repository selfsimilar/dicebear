import { createStyle, Definition } from "@dicebear/core";
import definition from "@dicebear/definitions/src/rings.json" with {
    type: "json"
};

type RingsOptions = {
        ring?: Array<'container'>;
        ringRotation?: [number, number];
        ringFive?: Array<'eighth' | 'full' | 'half' | 'quarter'>;
        ringFiveRotation?: [number, number];
        ringFour?: Array<'eighth' | 'full' | 'half' | 'quarter'>;
        ringFourRotation?: [number, number];
        ringOne?: Array<'eighth' | 'full' | 'half' | 'quarter'>;
        ringOneRotation?: [number, number];
        ringThree?: Array<'eighth' | 'full' | 'half' | 'quarter'>;
        ringThreeRotation?: [number, number];
        ringTwo?: Array<'eighth' | 'full' | 'half' | 'quarter'>;
        ringTwoRotation?: [number, number];
        ringColor: string[];
    };

const rings = createStyle<RingsOptions>(definition as Definition);

export { rings };
