import { integer, min, max } from 'superstruct';

export const RotationStruct = max(min(integer(), 0), 360);
