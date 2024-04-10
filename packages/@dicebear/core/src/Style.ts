import {
  Struct,
  assign,
  defaulted,
  enums,
  nonempty,
  object,
} from 'superstruct';
import type { ComponentValue, Definition, Properties } from './types.js';
import { AvatarModel } from './models/AvatarModel.js';
import { Prng } from './Prng.js';
import { Types } from './structs/Types.js';

export class Style<O extends Record<string, unknown> = {}> {
  private readonly definition: Readonly<Definition>;
  private optionsStruct?: Struct<any, any>;

  constructor(definition: Definition) {
    this.definition = definition;
  }

  static fromDefinition<O extends {}>(
    definition: Readonly<Definition>,
  ): Style<O> {
    return new Style<O>(definition);
  }

  create(
    prng: Prng,
    options: Readonly<O>,
    properties: Properties,
  ): AvatarModel {
    const attributes = new Map<string, string>(
      this.definition.attributes?.map(({ name, value }) => [name, value]),
    );

    const components = this.pickComponents(prng, options, properties);
    const colors = this.pickColors(prng, options, properties);

    return new AvatarModel(
      this.definition.metadata,
      '',
      properties,
      attributes,
    );
  }

  getDefinition(): Definition {
    return this.definition;
  }

  getOptionsStruct(): Struct<any, any> {
    return (this.optionsStruct ??= this.buildOptionsStruct());
  }

  private pickComponents(prng: Prng, options: O, properties: Properties) {
    const map = new Map<string, ComponentValue | undefined>();

    if (!this.definition.components) {
      return map;
    }

    for (const component of this.definition.components) {
      const componentValueNameOption = options[component.name] as string[];
      const componentValueName = prng.pick(componentValueNameOption);

      const componentValue = componentValueName
        ? component.values.find((v) => v.name === componentValueName)
        : undefined;

      map.set(component.name, componentValue);
      properties.set(component.name, componentValueName);
    }

    return map;
  }

  private pickColors(prng: Prng, options: O, properties: Properties) {
    const map = new Map<string, string>();

    if (!this.definition.colors) {
      return map;
    }

    for (const color of this.definition.colors) {
    }

    return map;
  }

  private buildOptionsStruct() {
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
