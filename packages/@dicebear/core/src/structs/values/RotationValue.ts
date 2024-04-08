import { min, max } from 'superstruct';
import { IntegerValue } from './IntegerValue';

export const RotationValue = max(min(IntegerValue, 0), 360);
