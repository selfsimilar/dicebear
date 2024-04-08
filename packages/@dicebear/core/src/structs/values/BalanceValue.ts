import { min, max } from 'superstruct';
import { IntegerValue } from './IntegerValue';

export const BalanceValue = max(min(IntegerValue, -180), 180);
