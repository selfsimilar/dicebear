import {
  object,
  optional,
  string,
  defaulted,
  integer,
  boolean,
  min,
  max,
  array,
  enums,
  coerce,
  tuple,
} from 'superstruct';
import { ColorStruct } from './ColorStruct';

const RotationStruct = max(min(integer(), 0), 360);

export const OptionsStruct = object({
  seed: defaulted(string(), ''),
  flip: defaulted(boolean(), false),
  rotate: defaulted(RotationStruct, 360),
  scale: defaulted(max(min(integer(), 0), 200), 100),
  radius: defaulted(max(min(integer(), 0), 50), 0),
  size: optional(min(integer(), 1)),
  backgroundColor: defaulted(
    coerce(array(ColorStruct), ColorStruct, (v) => [v]),
    [],
  ),
  backgroundType: defaulted(
    coerce(array(enums(['solid', 'gradientLinear'])), string(), (v) => [v]),
    ['solid'],
  ),
  backgroundRotation: defaulted(
    coerce(tuple([RotationStruct, RotationStruct]), RotationStruct, (v) => [
      v,
      v,
    ]),
    [0, 360],
  ),
  translateX: defaulted(max(min(integer(), -100), 100), 0),
  translateY: defaulted(max(min(integer(), -100), 100), 0),
  clip: defaulted(boolean(), true),
  randomizeIds: defaulted(boolean(), false),
});
