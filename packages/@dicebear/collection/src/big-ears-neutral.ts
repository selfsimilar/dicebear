import { createStyle, StyleDefinition } from "@dicebear/core";
import definition from "@dicebear/definitions/big-ears-neutral.json" with {
    type: "json"
};

interface BigEarsNeutralOptions {
    cheek?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05' | 'variant06'>;
    cheekProbability?: number;
    eyes?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05' | 'variant06' | 'variant07' | 'variant08' | 'variant09' | 'variant10' | 'variant11' | 'variant12' | 'variant13' | 'variant14' | 'variant15' | 'variant16' | 'variant17' | 'variant18' | 'variant19' | 'variant20' | 'variant21' | 'variant22' | 'variant23' | 'variant24' | 'variant25' | 'variant26' | 'variant27' | 'variant28' | 'variant29' | 'variant30' | 'variant31' | 'variant32'>;
    mouth?: Array<'variant0101' | 'variant0102' | 'variant0103' | 'variant0104' | 'variant0105' | 'variant0201' | 'variant0202' | 'variant0203' | 'variant0204' | 'variant0205' | 'variant0301' | 'variant0302' | 'variant0303' | 'variant0304' | 'variant0305' | 'variant0401' | 'variant0402' | 'variant0403' | 'variant0404' | 'variant0405' | 'variant0501' | 'variant0502' | 'variant0503' | 'variant0504' | 'variant0505' | 'variant0601' | 'variant0602' | 'variant0603' | 'variant0604' | 'variant0605' | 'variant0701' | 'variant0702' | 'variant0703' | 'variant0704' | 'variant0705' | 'variant0706' | 'variant0707' | 'variant0708'>;
    nose?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05' | 'variant06' | 'variant07' | 'variant08' | 'variant09' | 'variant10' | 'variant11' | 'variant12'>;
}

const bigEarsNeutral = createStyle<BigEarsNeutralOptions>(definition as StyleDefinition);

export { bigEarsNeutral };
