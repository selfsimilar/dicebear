import { array, object, optional, string } from 'superstruct';

export const DependenciesStruct = object({
  components: optional(array(string())),
  colors: optional(array(string())),
});
