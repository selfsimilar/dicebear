import {
  Struct,
  array,
  coerce,
  defaulted,
  enums,
  object,
  string,
  tuple,
} from 'superstruct';
import type { Definition, Properties } from './types.js';
import { AvatarModel } from './models/AvatarModel.js';
import { Prng } from './Prng.js';
import { IntegerValue } from './structs/values/IntegerValue.js';
import { BalanceValue } from './structs/values/BalanceValue.js';

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
    return object({
      ...this.definition.components?.reduce(
        (acc, component) => {
          acc[component.name] = defaulted(
            coerce(
              array(enums(component.values.map((v) => v.name))),
              string(),
              (v) => [v],
            ),
            component.values.filter((v) => v.default).map((v) => v.name),
          );

          if (component.probability) {
            acc[`${component.name}Probability`] = defaulted(
              IntegerValue,
              component.probability,
            );
          }

          if (component.rotation) {
            acc[`${component.name}Rotation`] = defaulted(
              coerce(
                tuple([BalanceValue, BalanceValue]),
                BalanceValue,
                (v) => [v, v],
              ),
              component.rotation,
            );
          }

          if (component.offset) {
            acc[`${component.name}OffsetX`] = defaulted(
              coerce(
                tuple([IntegerValue, IntegerValue]),
                IntegerValue,
                (v) => [v, v],
              ),
              component.offset.x,
            );

            acc[`${component.name}OffsetY`] = defaulted(
              coerce(
                tuple([IntegerValue, IntegerValue]),
                BalanceValue,
                (v) => [v, v],
              ),
              component.offset.y,
            );
          }

          return acc;
        },
        {} as Record<string, Struct<any, any>>,
      ),
      ...this.definition.colors?.reduce(
        (acc, color) => {
          acc[color.name] = string();

          return acc;
        },
        {} as Record<string, Struct<any, any>>,
      ),
    });
  }
}
