import { array, integer, object, optional, string } from 'superstruct';
import { ComponentValueStruct } from './ComponentValueStruct';

export const ComponentStruct = object({
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
  values: array(ComponentValueStruct),
});
