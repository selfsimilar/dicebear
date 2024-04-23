import { Struct, mask } from 'superstruct';
import type { Color, Component, Definition, Properties } from './types.js';
import { AvatarModel } from './models/AvatarModel.js';
import { Prng } from './Prng.js';
import { StructHelper } from './helpers/StructHelper.js';
import { ColorHelper } from './helpers/ColorHelper.js';
import { DependencyError } from './errors/DependencyError.js';
import { DefinitionModel } from './models/DefinitionModel.js';
import { DefinitionStruct } from './structs/DefinitionStruct.js';
import { SvgHelper } from './helpers/SvgHelper.js';

export class Style<
  O extends Record<string, unknown> = Record<string, unknown>,
> {
  private readonly definition: Definition;
  private readonly definitionModel: DefinitionModel;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private optionsStruct?: Struct<any, any>;

  constructor(definition: Definition) {
    this.definition = mask(definition, DefinitionStruct);
    this.definitionModel = new DefinitionModel(this.definition);
  }

  static fromDefinition<O extends Record<string, unknown>>(
    definition: Definition,
  ): Style<O> {
    return new Style<O>(definition);
  }

  create(prng: Prng, options: O, properties: Properties): AvatarModel {
    const attributes = new Map<string, string>(
      this.definitionModel
        .getAttributes()
        .map(({ name, value }) => [name, value]),
    );

    this.setMissingDefaultAttributes(attributes);

    this.defineColorProperties(prng, options, properties);
    this.defineComponentProperties(prng, options, properties);

    const dependencies =
      this.definitionModel.getDependenciesByProperties(properties);

    const colors = this.definitionModel
      .getColors()
      .filter((color) => dependencies.colors.has(color.name));

    const components = this.definitionModel
      .getComponents()
      .filter((component) => dependencies.components.has(component.name));

    const body = [
      '<defs>',
      ...colors.map((color) => this.buildColorGradient(color, properties)),
      ...components.map((component) =>
        this.buildComponentSymbol(component, properties),
      ),
      '</defs>',
      this.definitionModel.getBody(),
    ].join('');

    return new AvatarModel(
      body,
      attributes,
      properties,
      this.definition.metadata,
    );
  }

  getDefinition(): Definition {
    return this.definition;
  }

  getDefinitionModel(): DefinitionModel {
    return this.definitionModel;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getOptionsStruct(): Struct<any, any> {
    return (this.optionsStruct ??= StructHelper.buildStructByDefinitionModel(
      this.definitionModel,
    ));
  }

  private setMissingDefaultAttributes(attributes: Map<string, string>) {
    if (!attributes.has('xmlns')) {
      attributes.set('xmlns', 'http://www.w3.org/2000/svg');
    }

    if (!attributes.has('viewBox')) {
      attributes.set(
        'viewBox',
        `0 0 ${this.definition.body.width} ${this.definition.body.height}`,
      );
    }
  }

  private buildComponentSymbol(component: Component, properties: Properties) {
    const componentValueName = properties.get(component.name);
    const componentRotation = properties.get(`${component.name}Rotation`);
    const componentOffsetX = properties.get(`${component.name}OffsetX`);
    const componentOffsetY = properties.get(`${component.name}OffsetY`);

    if (typeof componentValueName !== 'string') {
      return '';
    }

    const componentName = SvgHelper.escape(component.name);
    const componentValue = this.definitionModel.getComponentValueByName(
      component.name,
      componentValueName,
    );

    if (!componentValue) {
      return '';
    }

    let componentContent = componentValue.content;

    if (componentRotation || componentOffsetX || componentOffsetY) {
      componentContent = `<g transform="translate(${componentOffsetX ?? 0}, ${componentOffsetY ?? 0}) rotate(${componentRotation ?? 0} ${component.width / 2} ${component.height / 2})">${componentContent}</g>`;
    }

    return `<symbol id="component-${componentName}">${componentContent}</symbol>`;
  }

  private buildColorGradient(color: Color, properties: Properties) {
    const rawColorValue = properties.get(`${color.name}Color`);

    if (typeof rawColorValue !== 'string') {
      return '';
    }

    const colorName = SvgHelper.escape(color.name);
    const colorValue = ColorHelper.convertColor(rawColorValue);

    return `<linearGradient id="color-${colorName}"><stop stop-color="${colorValue}"/></linearGradient>`;
  }

  private defineComponentProperties(
    prng: Prng,
    options: O,
    properties: Properties,
  ) {
    for (const component of this.definitionModel.getComponents()) {
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
    for (const color of this.definitionModel.getColors()) {
      if (color.name === 'background') {
        // Should be handled by the Core class
        continue;
      }

      let availableColors = options[`${color.name}Color`] as string[];

      if (color.notEqualTo) {
        const notEqualTo = properties.get(`${color.notEqualTo}Color`);

        if (typeof notEqualTo !== 'string') {
          throw new DependencyError(
            `Color ${color.name} cannot be set if ${color.notEqualTo} is not set.`,
          );
        }

        const newAvailableColors = availableColors.filter(
          (color) => color !== notEqualTo,
        );

        if (newAvailableColors.length > 0) {
          availableColors = newAvailableColors;
        }
      }

      if (color.contrastTo) {
        const contrastTo = properties.get(`${color.contrastTo}Color`);

        if (typeof contrastTo !== 'string') {
          throw new DependencyError(
            `Color ${color.name} cannot be set if ${color.contrastTo} is not set.`,
          );
        }

        const colorValue = ColorHelper.getHighestContrastColor(
          contrastTo,
          availableColors,
        );

        if (colorValue) {
          availableColors = [colorValue];
        }
      }

      const colorValueOption = options[`${color.name}Color`] as string[];
      const colorValue = prng.pick(colorValueOption);

      properties.set(`${color.name}Color`, colorValue ?? null);
    }
  }
}
