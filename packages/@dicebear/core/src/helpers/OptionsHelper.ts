import { mask } from 'superstruct';
import { Style } from '../Style';
import { Options, StyleOptions } from '../types';
import { StructHelper } from './StructHelper';

export class OptionsHelper {
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
