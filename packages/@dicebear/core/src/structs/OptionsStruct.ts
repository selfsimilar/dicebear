import {
  object,
  optional,
  string,
  defaulted,
  min,
  max,
  enums,
  nonempty,
} from 'superstruct';
import { Types } from './Types.js';

export const OptionsStruct = object({
  seed: defaulted(string(), ''),
  flip: defaulted(Types.boolean(), false),
  rotate: defaulted(Types.rotation(), 360),
  scale: defaulted(max(min(Types.integer(), 0), 200), 100),
  radius: defaulted(max(min(Types.integer(), 0), 50), 0),
  size: optional(min(Types.integer(), 1)),
  backgroundColor: defaulted(Types.array(Types.color()), []),
  backgroundType: defaulted(
    nonempty(Types.array(enums(['solid', 'gradientLinear']))),
    ['solid'],
  ),
  backgroundRotation: defaulted(
    nonempty(Types.array(Types.rotation())),
    [-180, 180],
  ),
  translateX: defaulted(max(min(Types.integer(), -100), 100), 0),
  translateY: defaulted(max(min(Types.integer(), -100), 100), 0),
  clip: defaulted(Types.boolean(), true),
  randomizeIds: defaulted(Types.boolean(), false),
});
