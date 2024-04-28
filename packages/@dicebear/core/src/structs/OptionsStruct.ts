import {
  object,
  optional,
  string,
  defaulted,
  min,
  max,
  enums,
  nonempty,
  integer,
  array,
  boolean,
} from 'superstruct';
import { Types } from './Types.js';

export const OptionsStruct = object({
  seed: defaulted(string(), ''),
  flip: defaulted(boolean(), false),
  rotate: defaulted(Types.rotation(), 360),
  scale: defaulted(max(min(integer(), 0), 200), 100),
  radius: defaulted(max(min(integer(), 0), 50), 0),
  size: optional(min(integer(), 1)),
  backgroundColor: defaulted(array(Types.color()), []),
  backgroundType: defaulted(
    nonempty(array(enums(['solid', 'gradientLinear']))),
    ['solid'],
  ),
  backgroundRotation: defaulted(nonempty(array(Types.rotation())), [-180, 180]),
  translateX: defaulted(max(min(integer(), -100), 100), 0),
  translateY: defaulted(max(min(integer(), -100), 100), 0),
  clip: defaulted(boolean(), true),
  randomizeIds: defaulted(boolean(), false),
});
