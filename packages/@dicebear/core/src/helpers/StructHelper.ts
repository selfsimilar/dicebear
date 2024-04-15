import {
  Struct,
  assign,
  defaulted,
  enums,
  nonempty,
  object,
} from 'superstruct';
import { Definition } from '../types';
import { Types } from '../structs/Types';
import type { ObjectSchema } from 'superstruct/dist/utils';

export class StructHelper {
  static buildStructByDefinition(
    definition: Definition,
  ): Struct<{ [x: string]: unknown }, ObjectSchema> {
    return assign(
      this.buildComponentsStructByDefinition(definition),
      this.buildColorsStructByDefinition(definition),
    );
  }

  static buildComponentsStructByDefinition(
    definition: Definition,
  ): Struct<{ [x: string]: unknown }, ObjectSchema> {
    return object(
      definition.components?.reduce((acc, component) => {
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
      }, {} as ObjectSchema) ?? {},
    );
  }

  static buildColorsStructByDefinition(
    definition: Definition,
  ): Struct<{ [x: string]: unknown }, ObjectSchema> {
    return object(
      definition.colors?.reduce((acc, color) => {
        acc[color.name] = defaulted(Types.array(Types.color()), color.values);

        return acc;
      }, {} as ObjectSchema) ?? {},
    );
  }
}
