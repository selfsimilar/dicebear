import { pattern, string } from 'superstruct';

export const ColorStruct = pattern(string(), /^(transparent|[a-fA-F0-9]{6})$/);
