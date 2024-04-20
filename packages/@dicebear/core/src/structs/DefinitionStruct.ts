import { array, integer, object, optional, string } from 'superstruct';
import { MetadataStruct } from './MetadataStruct';
import { ComponentStruct } from './ComponentStruct';
import { ColorStruct } from './ColorStruct';

export const DefinitionStruct = object({
  metadata: optional(MetadataStruct),
  body: object({
    content: string(),
    width: integer(),
    height: integer(),
  }),
  attributes: optional(array(object({ name: string(), value: string() }))),
  components: optional(array(ComponentStruct)),
  colors: optional(array(ColorStruct)),
});
