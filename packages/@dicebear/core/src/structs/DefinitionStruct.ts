import { array, integer, object, optional, string } from 'superstruct';
import { MetadataStruct } from './MetadataStruct.js';
import { ComponentStruct } from './ComponentStruct.js';
import { ColorStruct } from './ColorStruct.js';

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
