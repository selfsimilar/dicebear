import { object, optional, string } from 'superstruct';

export const MetadataStruct = object({
  license: optional(
    object({
      name: optional(string()),
      url: optional(string()),
      content: optional(string()),
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
});
