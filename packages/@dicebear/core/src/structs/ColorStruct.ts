import { array, object, optional, string } from 'superstruct';
import { Types } from './Types';

export const ColorStruct = object({
  name: string(),
  values: array(Types.color()),
  notEqualTo: optional(string()),
  contrastTo: optional(string()),
});
