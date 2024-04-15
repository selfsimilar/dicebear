import { Struct } from 'superstruct';
import type { Definition, Properties } from './types.js';
import { AvatarModel } from './models/AvatarModel.js';
import { Prng } from './Prng.js';
import { StructHelper } from './helpers/StructHelper.js';

export class Style<
  O extends Record<string, unknown> = Record<string, unknown>,
> {
  private readonly definition: Readonly<Definition>;
  private optionsStruct?: Struct<unknown, unknown>;

  constructor(definition: Definition) {
    this.definition = definition;
  }

  static fromDefinition<O extends Record<string, unknown>>(
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

    this.defineComponentProperties(prng, options, properties);
    this.defineColorProperties(prng, options, properties);

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

  getOptionsStruct(): Struct<unknown, unknown> {
    return (this.optionsStruct ??= StructHelper.buildStructByDefinition(
      this.definition,
    ));
  }

  private defineComponentProperties(
    prng: Prng,
    options: O,
    properties: Properties,
  ) {
    if (!this.definition.components) {
      return;
    }

    for (const component of this.definition.components) {
      const componentValueNameOption = options[component.name] as string[];
      const componentValueName = prng.pick(componentValueNameOption);
      const componentVisible = prng.bool(component.probability);

      properties.set(
        `${component.name}Probability`,
        componentVisible ? 100 : 0,
      );

      properties.set(
        component.name,
        componentVisible && componentValueName ? componentValueName : null,
      );

      if (component.rotation !== undefined) {
        properties.set(
          `${component.name}Rotation`,
          prng.integer(
            Math.min(...component.rotation),
            Math.max(...component.rotation),
          ),
        );
      }

      if (component.offset?.x !== undefined) {
        properties.set(
          `${component.name}OffsetX`,
          prng.integer(
            Math.min(...component.offset.x),
            Math.max(...component.offset.x),
          ),
        );
      }

      if (component.offset?.y !== undefined) {
        properties.set(
          `${component.name}OffsetY`,
          prng.integer(
            Math.min(...component.offset.y),
            Math.max(...component.offset.y),
          ),
        );
      }
    }
  }

  private defineColorProperties(
    prng: Prng,
    options: O,
    properties: Properties,
  ) {
    const map = new Map<string, string>();

    if (!this.definition.colors) {
      return map;
    }

    for (const color of this.definition.colors) {
    }

    return map;
  }
}
