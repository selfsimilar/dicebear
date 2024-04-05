import { Infer } from 'superstruct';
import { DefinitionStruct } from './structs/DefinitionStruct.js';
import { MetadataStruct } from './structs/MetadataStruct.js';
import { OptionsStruct } from './structs/OptionsStruct.js';

export type Property = undefined | string | number | boolean | string[];
export type Properties = Record<string, Property>;

export type Definition = Infer<typeof DefinitionStruct>;
export type Metadata = Infer<typeof MetadataStruct>;
export type Options<O extends {} = {}> = O & Infer<typeof OptionsStruct>;
