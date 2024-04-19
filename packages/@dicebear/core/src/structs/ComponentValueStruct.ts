import { number, object, optional, string } from 'superstruct';

export const ComponentValueStruct = object({
  name: string(),
  default: optional(number()),
  content: string(),
});
