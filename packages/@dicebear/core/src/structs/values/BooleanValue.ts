import { string, coerce, boolean } from 'superstruct';

export const BooleanValue = coerce(boolean(), string(), v => v === 'true' ||  v === '1');
