import { Style } from '../Style';
import { OptionsHelper } from '../helpers/OptionsHelper';
import { Options, StyleOptions } from '../types';
import { AbstractCollection } from './AbstractCollection';

export class OptionsCollection<
  S extends StyleOptions = StyleOptions,
> extends AbstractCollection {
  protected readonly collection: Map<string, unknown>;

  constructor(style: Style<S>, options: Partial<Options<S>>) {
    super();

    const validatedOptions = OptionsHelper.validateOptions(style, options);

    this.collection = new Map(Object.entries(validatedOptions));
  }
}
