import { createStyle, StyleDefinition } from "@dicebear/core";
import definition from "@dicebear/definitions/big-ears.json" with {
    type: "json"
};

interface BigEarsOptions {
    cheek?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05' | 'variant06'>;
    cheekProbability?: number;
    ear?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05' | 'variant06' | 'variant07' | 'variant08'>;
    eyes?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05' | 'variant06' | 'variant07' | 'variant08' | 'variant09' | 'variant10' | 'variant11' | 'variant12' | 'variant13' | 'variant14' | 'variant15' | 'variant16' | 'variant17' | 'variant18' | 'variant19' | 'variant20' | 'variant21' | 'variant22' | 'variant23' | 'variant24' | 'variant25' | 'variant26' | 'variant27' | 'variant28' | 'variant29' | 'variant30' | 'variant31' | 'variant32'>;
    face?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05' | 'variant06' | 'variant07' | 'variant08' | 'variant09' | 'variant10'>;
    frontHair?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05' | 'variant06' | 'variant07' | 'variant08' | 'variant09' | 'variant10' | 'variant11' | 'variant12'>;
    hair?: Array<'long01' | 'long02' | 'long03' | 'long04' | 'long05' | 'long06' | 'long07' | 'long08' | 'long09' | 'long10' | 'long11' | 'long12' | 'long13' | 'long14' | 'long15' | 'long16' | 'long17' | 'long18' | 'long19' | 'long20' | 'short01' | 'short02' | 'short03' | 'short04' | 'short05' | 'short06' | 'short07' | 'short08' | 'short09' | 'short10' | 'short11' | 'short12' | 'short13' | 'short14' | 'short15' | 'short16' | 'short17' | 'short18' | 'short19' | 'short20'>;
    mouth?: Array<'variant0101' | 'variant0102' | 'variant0103' | 'variant0104' | 'variant0105' | 'variant0201' | 'variant0202' | 'variant0203' | 'variant0204' | 'variant0205' | 'variant0301' | 'variant0302' | 'variant0303' | 'variant0304' | 'variant0305' | 'variant0401' | 'variant0402' | 'variant0403' | 'variant0404' | 'variant0405' | 'variant0501' | 'variant0502' | 'variant0503' | 'variant0504' | 'variant0505' | 'variant0601' | 'variant0602' | 'variant0603' | 'variant0604' | 'variant0605' | 'variant0701' | 'variant0702' | 'variant0703' | 'variant0704' | 'variant0705' | 'variant0706' | 'variant0707' | 'variant0708'>;
    nose?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05' | 'variant06' | 'variant07' | 'variant08' | 'variant09' | 'variant10' | 'variant11' | 'variant12'>;
    sideburn?: Array<'variant01' | 'variant02' | 'variant03' | 'variant04' | 'variant05' | 'variant06' | 'variant07'>;
    hairColor: string[];
    skinColor: string[];
}

const bigEars = createStyle<BigEarsOptions>(definition as StyleDefinition);

export { bigEars };
