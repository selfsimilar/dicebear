import { Struct, mask } from 'superstruct';
import type { Color, Component, Definition, Properties } from './types.js';
import { AvatarModel, ComposeModel } from './models/ComposeModel.js';
import { Prng } from './Prng.js';
import { StructHelper } from './helpers/StructHelper.js';
import { ColorHelper } from './helpers/ColorHelper.js';
import { DefinitionModel } from './models/DefinitionModel.js';
import { DefinitionStruct } from './structs/DefinitionStruct.js';
import { SvgHelper } from './helpers/SvgHelper.js';
import { ColorModel } from './models/ColorModel.js';

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

  getDefinition(): Definition {
    return this.definition;
  }

  validateOptions(options: unknown): Required<O> {
    return mask(options, this.getOptionsStruct());
  }

  defineProperties(composeModel: ComposeModel<O>) {
    this.defineColorProperties(composeModel);
    this.defineComponentProperties(composeModel);
  }

  create(
    prng: Prng,
    options: Required<O>,
    properties: Properties,
  ): AvatarModel {
    const attributes = new Map<string, string>(
      this.definitionModel
        .getAttributes()
        .map(({ name, value }) => [name, value]),
    );

    this.setMissingDefaultAttributes(attributes);

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
      this.definitionModel.getBody().content,
    ].join('');

    return new AvatarModel(
      body,
      attributes,
      properties,
      this.definition.metadata,
    );
  }

  private getOptionsStruct() {
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
    const colorName = SvgHelper.escape(color.name);
    const colorValue = properties.get(`${color.name}Color`);

    if (!(colorValue instanceof ColorModel)) {
      return '';
    }

    return `<linearGradient id="color-${colorName}"><stop stop-color="rgba(${colorValue.getRgba().join(', ')})"/></linearGradient>`;
  }

  private defineComponentProperties(composeModel: ComposeModel<O>) {
    const properties = composeModel.getProperties();
    const options = composeModel.getStyleOptions();
    const prng = composeModel.getPrng();

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

  private defineColorProperties(composeModel: ComposeModel<O>) {
    const properties = composeModel.getProperties();
    const options = composeModel.getStyleOptions();
    const prng = composeModel.getPrng();

    for (const color of this.definitionModel.getColors()) {
      if (color.name === 'background') {
        // Should be handled by the Avatar class
        continue;
      }

      const optionKey = `${color.name}Color`;
      const optionValue = options[optionKey] as string[];

      let availableColors = optionValue.map((c) => new ColorModel(c));

      if (color.notEqualTo) {
        const propertyKey = `${color.notEqualTo}Color`;
        const notEqualTo = (properties.get(propertyKey) ?? []) as ColorModel[];

        const newAvailableColors = availableColors.filter(
          (color) => !notEqualTo.find((c) => c.getHex() === color.getHex()),
        );

        if (newAvailableColors.length > 0) {
          availableColors = newAvailableColors;
        }
      }

      if (color.contrastTo) {
        const propertyKey = `${color.contrastTo}Color`;
        const contrastTo = (properties.get(propertyKey) ?? []) as ColorModel[];

        const colorValue = ColorHelper.getContrastColor(
          contrastTo,
          availableColors,
        );

        if (colorValue) {
          availableColors = [colorValue];
        }
      }

      const colorValue = prng.pick(availableColors);

      properties.set(`${color.name}Color`, colorValue ? [colorValue] : null);
    }
  }
}
