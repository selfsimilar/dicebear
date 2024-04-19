import { array, object, optional, string } from 'superstruct';
import { MetadataStruct } from './MetadataStruct';
import { ComponentStruct } from './ComponentStruct';
import { ColorStruct } from './ColorStruct';

export const DefinitionStruct = object({
  metadata: MetadataStruct,
  body: string(),
  attributes: optional(array(object({ name: string(), value: string() }))),
  components: optional(array(ComponentStruct)),
  colors: optional(array(ColorStruct)),
});
