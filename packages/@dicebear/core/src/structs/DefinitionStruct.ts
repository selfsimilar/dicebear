import {
  array,
  boolean,
  integer,
  nonempty,
  object,
  optional,
  string,
} from 'superstruct';
import { Types } from './Types.js';

export const DefinitionStruct = object({
  metadata: optional(
    object({
      license: optional(
        object({
          name: optional(string()),
          url: optional(string()),
          text: optional(string()),
        }),
      ),
      creator: optional(
        object({
          name: optional(string()),
          url: optional(string()),
        }),
      ),
      source: optional(
        object({
          name: optional(string()),
          url: optional(string()),
        }),
      ),
    }),
  ),
  body: object({
    content: string(),
    width: integer(),
    height: integer(),
  }),
  attributes: optional(array(object({ name: string(), value: string() }))),
  colors: optional(
    array(
      object({
        name: string(),
        values: nonempty(array(Types.color())),
        notEqualTo: optional(array(string())),
        contrastTo: optional(string()),
      }),
    ),
  ),
  components: optional(
    array(
      object({
        name: string(),
        width: integer(),
        height: integer(),
        probability: optional(integer()),
        rotation: optional(array(integer())),
        offset: optional(
          object({
            x: optional(array(integer())),
            y: optional(array(integer())),
          }),
        ),
        values: array(
          object({
            name: string(),
            default: optional(boolean()),
            content: string(),
          }),
        ),
      }),
    ),
  ),
});
