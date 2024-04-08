import { integer, string, coerce } from 'superstruct';

export const IntegerValue = coerce(integer(), string(), (v) => parseInt(v));
