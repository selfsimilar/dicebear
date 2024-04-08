import { pattern, string } from 'superstruct';

export const ColorValue = pattern(string(), /^(transparent|[a-fA-F0-9]{6})$/);
