import {
  object,
  string,
  defaulted,
  min,
  max,
  integer,
  array,
  boolean,
  nullable,
} from 'superstruct';
import { Types } from './Types.js';

export const BaseOptionsStruct = object({
  seed: defaulted(string(), ''),
  flip: defaulted(boolean(), false),
  rotate: defaulted(Types.rotation(), 360),
  scale: defaulted(max(min(integer(), 0), 200), 100),
  radius: defaulted(max(min(integer(), 0), 50), 0),
  size: defaulted(nullable(min(integer(), 1)), null),
  backgroundColor: defaulted(array(Types.color()), []),
  translateX: defaulted(max(min(integer(), -100), 100), 0),
  translateY: defaulted(max(min(integer(), -100), 100), 0),
  clip: defaulted(boolean(), true),
  randomizeIds: defaulted(boolean(), false),
});
