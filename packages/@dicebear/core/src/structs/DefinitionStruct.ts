import { array, number, object, optional, string } from 'superstruct';
import { MetadataStruct } from './MetadataStruct';
import { Types } from './Types';

export const DefinitionStruct = object({
  metadata: MetadataStruct,
  body: object({
    content: string(),
    dependencies: optional(
      object({
        components: optional(array(string())),
        colors: optional(array(string())),
      }),
    ),
  }),
  attributes: optional(array(object({ name: string(), value: string() }))),
  components: optional(
    array(
      object({
        name: string(),
        probability: optional(number()),
        rotation: optional(number()),
        offset: optional(
          object({
            x: optional(number()),
            y: optional(number()),
          }),
        ),
        values: array(
          object({
            name: string(),
            default: optional(number()),
            content: string(),
            dependencies: optional(
              object({
                components: optional(array(string())),
                colors: optional(array(string())),
              }),
            ),
          }),
        ),
      }),
    ),
  ),
  colors: optional(
    array(
      object({
        name: string(),
        values: array(Types.color()),
        notEqualTo: optional(string()),
        contrastTo: optional(string()),
      }),
    ),
  ),
});
