import { Style } from '../Style.js';
import { OptionHelper } from '../helpers/OptionHelper.js';
import { Options, StyleOptions } from '../types.js';
import { AbstractCollection } from './AbstractCollection.js';

export class OptionsCollection<
  S extends StyleOptions = StyleOptions,
> extends AbstractCollection {
  protected readonly collection: Map<string, unknown>;

  constructor(style: Style<S>, options: Partial<Options<S>>) {
    super();

    const validatedOptions = OptionHelper.validateOptions(style, options);

    this.collection = new Map(Object.entries(validatedOptions));
  }
}
