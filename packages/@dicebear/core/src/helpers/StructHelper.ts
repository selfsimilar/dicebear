import {
  Struct,
  array,
  assign,
  defaulted,
  enums,
  integer,
  nonempty,
  object,
} from 'superstruct';
import { Types } from '../structs/Types.js';
import type { ObjectSchema } from 'superstruct/dist/utils';
import { OptionsStruct } from '../structs/OptionsStruct.js';
import { Definition } from '../types.js';

const structByDefinition = new Map<
  Definition,
  Struct<{ [x: string]: unknown }, ObjectSchema>
>();

export class StructHelper {
  static buildStructByDefinition(
    definition: Definition,
  ): Struct<{ [x: string]: unknown }, ObjectSchema> {
    if (structByDefinition.has(definition)) {
      return structByDefinition.get(definition)!;
    }

    const struct = assign(
      OptionsStruct,
      this.buildComponentsStructByDefinition(definition),
      this.buildColorsStructByDefinition(definition),
    );

    structByDefinition.set(definition, struct);

    return struct;
  }

  static buildComponentsStructByDefinition(
    definition: Definition,
  ): Struct<{ [x: string]: unknown }, ObjectSchema> {
    const components = definition.components ?? [];

    return object(
      components.reduce((acc, component) => {
        const { name, values, probability, rotation, offset } = component;

        const componentNameList = values.map((v) => v.name);
        const componentDefaultList = values
          .filter((v) => v.default)
          .map((v) => v.name);

        acc[name] = defaulted(
          array(enums(componentNameList)),
          componentDefaultList,
        );

        if (probability) {
          acc[`${name}Probability`] = defaulted(integer(), probability);
        }

        if (rotation) {
          acc[`${name}Rotation`] = defaulted(
            nonempty(array(Types.rotation())),
            rotation,
          );
        }

        if (offset) {
          const OffsetType = nonempty(array(integer()));

          acc[`${name}OffsetX`] = defaulted(OffsetType, offset.x);
          acc[`${name}OffsetY`] = defaulted(OffsetType, offset.y);
        }

        return acc;
      }, {} as ObjectSchema),
    );
  }

  static buildColorsStructByDefinition(
    definition: Definition,
  ): Struct<{ [x: string]: unknown }, ObjectSchema> {
    const colors = definition.colors ?? [];

    return object(
      colors.reduce((acc, color) => {
        acc[`${color.name}Color`] = nonempty(
          defaulted(array(Types.color()), color.values),
        );

        return acc;
      }, {} as ObjectSchema),
    );
  }
}
