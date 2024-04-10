import { number, object, optional, string } from 'superstruct';
import { DependenciesStruct } from './DependenciesStruct';

export const ComponentValueStruct = object({
  name: string(),
  default: optional(number()),
  content: string(),
  dependencies: optional(DependenciesStruct),
});
