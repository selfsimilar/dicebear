import type {
  Attributes,
  DefinitionColorList,
  DefinitionComponentList,
  Options,
  Properties,
  StyleOptions,
  ViewBox,
} from './types.js';
import { Style } from './Style.js';
import { LicenseHelper } from './helpers/LicenseHelper.js';
import { SvgHelper } from './helpers/SvgHelper.js';
import { OptionsHelper } from './helpers/OptionsHelper.js';
import { AttributesHelper } from './helpers/AttributesHelper.js';
import { DependencyHelper } from './helpers/DependencyHelper.js';

export class Builder<S extends StyleOptions = StyleOptions> {
  private readonly properties: Properties = new Map();
  private readonly attributes: Attributes = new Map();

  private readonly options: Options<S>;

  constructor(
    private readonly style: Style<S>,
    options: Partial<Options<S>>,
  ) {
    this.options = OptionsHelper.validateOptions(style, options);
  }

  getViewBox(): ViewBox {
    const viewBoxAttribute = this.attributes.get('viewBox');

    if (!viewBoxAttribute) {
      throw new Error('Missing attribute "viewBox"');
    }

    return AttributesHelper.parseViewBox(viewBoxAttribute);
  }

  getStyle(): Style<S> {
    return this.style;
  }

  getOptions(): Options<S> {
    return this.options;
  }

  getProperties(): Properties {
    return this.properties;
  }

  getAttributes(): Attributes {
    return this.attributes;
  }

  build(): string {
    const attributes = SvgHelper.createAttrString(this.getAttributes());
    const metadata = LicenseHelper.getLicenseAsXml(this.style);
    const body = this.buildBody();

    return `<svg ${attributes}>${metadata}${body}</svg>`;
  }

  private buildBody(): string {
    const style = this.getStyle();
    const { colors, components } = this.getDependencies();

    let body = [
      '<defs>',
      ...colors.map((color) => SvgHelper.createColorGradient(this, color)),
      ...components.map((component) =>
        SvgHelper.createComponentSymbol(this, component),
      ),
      '</defs>',
      style.getBody().content,
    ].join('');

    body = SvgHelper.replacePlaceholders(this, body);

    body = SvgHelper.addScale(this, body);
    body = SvgHelper.addFlip(this, body);
    body = SvgHelper.addRotate(this, body);
    body = SvgHelper.addTranslate(this, body);
    body = SvgHelper.addBackground(this, body);
    body = SvgHelper.addRadius(this, body);
    body = SvgHelper.randomizeIds(this, body);

    return body;
  }

  private getDependencies(): {
    colors: Exclude<DefinitionColorList, undefined>;
    components: Exclude<DefinitionComponentList, undefined>;
  } {
    const style = this.getStyle();
    const properties = this.getProperties();

    const dependencies = DependencyHelper.getDependenciesFromProperties(
      style,
      properties,
    );

    const colors = style
      .getColors()
      .filter((color) => dependencies.colors.has(color.name));

    const components = style
      .getComponents()
      .filter((component) => dependencies.components.has(component.name));

    return { colors, components };
  }
}
