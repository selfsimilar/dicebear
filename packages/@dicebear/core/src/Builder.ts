import type {
  DefinitionColorList,
  DefinitionComponentList,
  StyleOptions,
  ViewBox,
} from './types.js';
import { Style } from './Style.js';
import { LicenseHelper } from './helpers/LicenseHelper.js';
import { SvgHelper } from './helpers/SvgHelper.js';
import { AttributeHelper } from './helpers/AttributeHelper.js';
import { DependencyHelper } from './helpers/DependencyHelper.js';
import { PropertiesCollection } from './collections/PropertiesCollection.js';
import { AttributesCollection } from './collections/AttributesCollection.js';

export class Builder<S extends StyleOptions = StyleOptions> {
  private readonly properties = new PropertiesCollection();
  private readonly attributes = new AttributesCollection();

  constructor(private readonly style: Style<S>) {}

  static create<S extends StyleOptions = StyleOptions>(
    style: Style<S>,
  ): Builder<S> {
    return new Builder(style);
  }

  getViewBox(): ViewBox {
    const viewBoxAttribute = this.attributes.getString('viewBox');

    return AttributeHelper.parseViewBox(viewBoxAttribute);
  }

  getStyle(): Style<S> {
    return this.style;
  }

  getProperties(): PropertiesCollection {
    return this.properties;
  }

  getAttributes(): AttributesCollection {
    return this.attributes;
  }

  build(): string {
    const attributes = SvgHelper.createAttrString(this.getAttributes());
    const metadata = LicenseHelper.getLicenseAsXml(this.style.getMetadata());
    const body = this.buildBody();

    return `<svg ${attributes}>${metadata}${body}</svg>`;
  }

  private buildBody(): string {
    const style = this.getStyle();
    const { colors, components } = this.getDependencies();

    let body = [
      '<defs>',
      ...colors.map((color) => SvgHelper.createColorGradient(this, color)),
      '</defs>',
      ...components.map((component) =>
        SvgHelper.createComponentSymbol(this, component),
      ),
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
