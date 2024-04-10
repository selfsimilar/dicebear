import { Infer } from 'superstruct';
import { DefinitionStruct } from './structs/DefinitionStruct.js';
import { MetadataStruct } from './structs/MetadataStruct.js';
import { OptionsStruct } from './structs/OptionsStruct.js';
import { ColorStruct } from './structs/ColorStruct.js';
import { ComponentStruct } from './structs/ComponentStruct.js';
import { ComponentValueStruct } from './structs/ComponentValueStruct.js';
import { DependenciesStruct } from './structs/DependenciesStruct.js';

export type Property = undefined | string | number | boolean | string[];
export type Properties = Map<string, Property>;

export type Color = Infer<typeof ColorStruct>;
export type Component = Infer<typeof ComponentStruct>;
export type ComponentValue = Infer<typeof ComponentValueStruct>;
export type Definition = Infer<typeof DefinitionStruct>;
export type Dependencies = Infer<typeof DependenciesStruct>;
export type Metadata = Infer<typeof MetadataStruct>;

export type Options<O extends {} = {}> = O & Infer<typeof OptionsStruct>;
