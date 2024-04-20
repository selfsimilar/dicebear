import { boolean, object, optional, string } from 'superstruct';

export const ComponentValueStruct = object({
  name: string(),
  default: optional(boolean()),
  content: string(),
});
