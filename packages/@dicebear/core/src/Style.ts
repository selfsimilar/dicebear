import type { Color, Component, Definition, Properties } from './types.js';
import { Struct, mask } from 'superstruct';
import { BuildModel } from './models/BuildModel.js';
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

  buildBody(buildModel: BuildModel<O>) {
    const properties = buildModel.getProperties();

    const dependencies =
      this.definitionModel.getDependenciesByProperties(properties);

    const colors = this.definitionModel
      .getColors()
      .filter((color) => dependencies.colors.has(color.name));

    const components = this.definitionModel
      .getComponents()
      .filter((component) => dependencies.components.has(component.name));

    buildModel.setBody(
      [
        '<defs>',
        ...colors.map((color) => this.buildColorGradient(color, properties)),
        ...components.map((component) =>
          this.buildComponentSymbol(component, properties),
        ),
        '</defs>',
        this.definitionModel.getBody().content,
      ].join(''),
    );
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
}
