import { array, number, object, optional, string } from 'superstruct';
import { ComponentValueStruct } from './ComponentValueStruct';

export const ComponentStruct = object({
  name: string(),
  probability: optional(number()),
  rotation: optional(number()),
  offset: optional(
    object({
      x: optional(number()),
      y: optional(number()),
    }),
  ),
  values: array(ComponentValueStruct),
});
