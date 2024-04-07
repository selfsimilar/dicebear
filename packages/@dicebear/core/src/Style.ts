import { Struct, object } from 'superstruct';
import type { Definition, Properties } from './types.js';
import { AvatarModel } from './models/AvatarModel.js';
import { Prng } from './Prng.js';

export class Style<O extends {} = {}> {
  private readonly definition: Definition;
  private readonly optionsStruct: Struct<any, any>;

  constructor(definition: Definition) {
    this.definition = definition;
    this.optionsStruct = this.buildOptionsStruct();
  }

  static fromDefinition<O extends {}>(definition: Definition): Style<O> {
    return new Style<O>(definition);
  }

  create(prng: Prng, options: O, properties: Properties): AvatarModel {
    return new AvatarModel(this.definition.metadata, '', {}, {});
  }

  getDefinition(): Definition {
    return this.definition;
  }

  getOptionsStruct(): Struct<any, any> {
    return this.optionsStruct;
  }

  private buildOptionsStruct(): Struct<any, any> {
    return object({});
  }
}
