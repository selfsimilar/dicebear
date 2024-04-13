import { array, number, object, optional, string } from 'superstruct';
import { ComponentValueStruct } from './ComponentValueStruct';

export const ComponentStruct = object({
  name: string(),
  probability: optional(number()),
  rotation: optional(array(number())),
  offset: optional(
    object({
      x: optional(array(number())),
      y: optional(array(number())),
    }),
  ),
  values: array(ComponentValueStruct),
});
