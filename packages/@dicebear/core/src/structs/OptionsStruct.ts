import {
  object,
  optional,
  string,
  defaulted,
  min,
  max,
  array,
  enums,
  coerce,
  tuple,
} from 'superstruct';
import { ColorValue } from './values/ColorValue';
import { RotationValue } from './values/RotationValue';
import { BooleanValue } from './values/BooleanValue';
import { IntegerValue } from './values/IntegerValue';

export const OptionsStruct = object({
  seed: defaulted(string(), ''),
  flip: defaulted(BooleanValue, false),
  rotate: defaulted(RotationValue, 360),
  scale: defaulted(max(min(IntegerValue, 0), 200), 100),
  radius: defaulted(max(min(IntegerValue, 0), 50), 0),
  size: optional(min(IntegerValue, 1)),
  backgroundColor: defaulted(
    coerce(array(ColorValue), string(), (v) => [v]),
    [],
  ),
  backgroundType: defaulted(
    coerce(array(enums(['solid', 'gradientLinear'])), string(), (v) => [v]),
    ['solid'],
  ),
  backgroundRotation: defaulted(
    coerce(tuple([RotationValue, RotationValue]), RotationValue, (v) => [v, v]),
    [0, 360],
  ),
  translateX: defaulted(max(min(IntegerValue, -100), 100), 0),
  translateY: defaulted(max(min(IntegerValue, -100), 100), 0),
  clip: defaulted(BooleanValue, true),
  randomizeIds: defaulted(BooleanValue, false),
});
