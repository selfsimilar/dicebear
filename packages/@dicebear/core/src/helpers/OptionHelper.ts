import { mask } from 'superstruct';
import { Style } from '../Style.js';
import { Options, StyleOptions } from '../types.js';
import { StructHelper } from './StructHelper.js';

export class OptionHelper {
  static validateOptions<S extends StyleOptions>(
    style: Style<S>,
    options: unknown,
  ): Options<S> {
    return mask(
      options,
      StructHelper.createOptionsStructFromStyle(style),
    ) as Options<S>;
  }
}
