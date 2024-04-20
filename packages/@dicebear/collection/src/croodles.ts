import { createStyle, Definition } from "@dicebear/core";
import definition from "@dicebear/definitions/src/croodles.json" with {
    type: "json"
};

type CroodlesOptions = {
        beard?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05'>;
        beardProbability?: number;
        eyes?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05' | 'variant06' | 'variant07' | 'variant08' | 'variant09' | 'variant10' | 'variant11' | 'variant12' | 'variant13' | 'variant14' | 'variant15' | 'variant16'>;
        face?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05' | 'variant06' | 'variant07' | 'variant08'>;
        mouth?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05' | 'variant06' | 'variant07' | 'variant08' | 'variant09' | 'variant10' | 'variant11' | 'variant12' | 'variant13' | 'variant14' | 'variant15' | 'variant16' | 'variant17' | 'variant18'>;
        mustache?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04'>;
        mustacheProbability?: number;
        nose?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05' | 'variant06' | 'variant07' | 'variant08' | 'variant09'>;
        top?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05' | 'variant06' | 'variant07' | 'variant08' | 'variant09' | 'variant10' | 'variant11' | 'variant12' | 'variant13' | 'variant14' | 'variant15' | 'variant16' | 'variant17' | 'variant18' | 'variant19' | 'variant20' | 'variant21' | 'variant22' | 'variant23' | 'variant24' | 'variant25' | 'variant26' | 'variant27' | 'variant28' | 'variant29'>;
        baseColor: string[];
        eyepatchColor: string[];
        glassesColor: string[];
        topColor: string[];
    };

const croodles = createStyle<CroodlesOptions>(definition as Definition);

export { croodles };
