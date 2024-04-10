import { array, object, optional, string } from 'superstruct';
import { MetadataStruct } from './MetadataStruct';
import { ComponentStruct } from './ComponentStruct';
import { ColorStruct } from './ColorStruct';
import { DependenciesStruct } from './DependenciesStruct';

export const DefinitionStruct = object({
  metadata: MetadataStruct,
  body: object({
    content: string(),
    dependencies: optional(DependenciesStruct),
  }),
  attributes: optional(array(object({ name: string(), value: string() }))),
  components: optional(array(ComponentStruct)),
  colors: optional(array(ColorStruct)),
});
