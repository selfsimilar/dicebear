import {
  Struct,
  assign,
  defaulted,
  enums,
  nonempty,
  object,
} from 'superstruct';
import type { Definition, Properties } from './types.js';
import { AvatarModel } from './models/AvatarModel.js';
import { Prng } from './Prng.js';
import { Types } from './structs/Types.js';

export class Style<O extends {} = {}> {
  private readonly definition: Definition;
  private optionsStruct?: Struct<any, any>;

  constructor(definition: Definition) {
    this.definition = definition;
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
    return (this.optionsStruct ??= this.buildOptionsStruct());
  }

  private buildOptionsStruct(): Struct<any, any> {
    return assign(this.buildComponentsStruct(), this.buildColorsStruct());
  }

  private buildComponentsStruct(): Struct<any, any> {
    return object(
      this.definition.components?.reduce(
        (acc, component) => {
          const { name, values, probability, rotation, offset } = component;

          const componentNameList = values.map((v) => v.name);
          const componentDefaultList = values
            .filter((v) => v.default)
            .map((v) => v.name);

          acc[name] = defaulted(
            Types.array(enums(componentNameList)),
            componentDefaultList,
          );

          if (probability) {
            acc[`${name}Probability`] = defaulted(Types.integer(), probability);
          }

          if (rotation) {
            acc[`${name}Rotation`] = defaulted(
              nonempty(Types.array(Types.rotation())),
              rotation,
            );
          }

          if (offset) {
            const OffsetType = nonempty(Types.array(Types.integer()));

            acc[`${name}OffsetX`] = defaulted(OffsetType, offset.x);
            acc[`${name}OffsetY`] = defaulted(OffsetType, offset.y);
          }

          return acc;
        },
        {} as Record<string, Struct<any, any>>,
      ) ?? {},
    );
  }

  private buildColorsStruct(): Struct<any, any> {
    return object(
      this.definition.colors?.reduce(
        (acc, color) => {
          acc[color.name] = defaulted(Types.array(Types.color()), color.values);

          return acc;
        },
        {} as Record<string, Struct<any, any>>,
      ) ?? {},
    );
  }
}
