import { Infer } from 'superstruct';
import { DefinitionStruct } from './structs/DefinitionStruct.js';
import { BaseOptionsStruct } from './structs/BaseOptionsStruct.js';

// Utilities
type PickEndsWith<T, U extends string> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [K in keyof T as K extends `${infer Rest}${U}` ? K : never]: T[K];
};

type OmitEndsWith<T, U extends string> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [K in keyof T as K extends `${infer Rest}${U}` ? never : K]: T[K];
};

type ArrayElement<T> = T extends (infer E)[] ? E : never;

// Properties
export type Properties = Map<string, unknown>;

// Attributes
export type Attributes = Map<string, string>;
export type ViewBox = { x: number; y: number; width: number; height: number };

// Definition
export type Definition = Infer<typeof DefinitionStruct>;

export type DefinitionMetadata = Definition['metadata'];

export type DefinitionBody = Definition['body'];

export type DefinitionAttributeList = Definition['attributes'];
export type DefinitionAttribute = ArrayElement<DefinitionAttributeList>;

export type DefinitionColorList = Definition['colors'];
export type DefinitionColor = ArrayElement<DefinitionColorList>;

export type DefinitionComponentList = Definition['components'];
export type DefinitionComponent = ArrayElement<DefinitionComponentList>;

export type DefinitionComponentValueList = DefinitionComponent['values'];
export type DefinitionComponentValue =
  ArrayElement<DefinitionComponentValueList>;

// Dependencies
export type Dependencies = {
  components: Set<string>;
  colors: Set<string>;
};

// Options
export type BaseOptions = Infer<typeof BaseOptionsStruct>;
export type StyleOptions = Record<string, unknown>;

export type Options<S extends StyleOptions = StyleOptions> = S & BaseOptions;

export type ColorsFromStyleOptions<S extends StyleOptions = StyleOptions> =
  PickEndsWith<S, 'Color'>;

export type ComponentsFromStyleOptions<S extends StyleOptions = StyleOptions> =
  OmitEndsWith<S, 'Color' | 'Probability' | 'Rotation' | 'OffsetX' | 'OffsetY'>;
