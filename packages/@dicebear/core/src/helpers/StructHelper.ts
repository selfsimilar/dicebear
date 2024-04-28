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
import { DefinitionModel } from '../models/DefinitionModel.js';

export class StructHelper {
  static buildStructByDefinitionModel(
    definition: DefinitionModel,
  ): Struct<{ [x: string]: unknown }, ObjectSchema> {
    return assign(
      this.buildComponentsStructByDefinitionModel(definition),
      this.buildColorsStructByDefinitionModel(definition),
    );
  }

  static buildComponentsStructByDefinitionModel(
    definition: DefinitionModel,
  ): Struct<{ [x: string]: unknown }, ObjectSchema> {
    return object(
      definition.getComponents().reduce((acc, component) => {
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

  static buildColorsStructByDefinitionModel(
    definition: DefinitionModel,
  ): Struct<{ [x: string]: unknown }, ObjectSchema> {
    return object(
      definition.getColors().reduce((acc, color) => {
        acc[`${color.name}Color`] = nonempty(
          defaulted(array(Types.color()), color.values),
        );

        return acc;
      }, {} as ObjectSchema),
    );
  }
}
