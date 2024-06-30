import type { DefinitionMetadata, Options, StyleOptions } from './types.js';
import { Style } from './Style.js';
import { ColorModel } from './models/ColorModel.js';
import { Builder } from './Builder.js';
import { PropertyHelper } from './helpers/PropertyHelper.js';
import { AttributeHelper } from './helpers/AttributeHelper.js';
import { OptionsCollection } from './collections/OptionsCollection.js';

export class Avatar {
  static memoizedStyle = new Map<{ new (): Style }, Style>();

  private constructor(
    private readonly svg: string,
    private readonly metadata: Exclude<DefinitionMetadata, undefined>,
    private readonly properties: [string, unknown][],
  ) {
    this.svg = svg;
    this.metadata = metadata;
    this.properties = properties;
  }

  static create<S extends StyleOptions>(
    style: Style<S> | { new (): Style<S> },
    options: Partial<Options<S>> = {},
  ) {
    let styleInstance: Style;

    if (style instanceof Style) {
      styleInstance = style;
    } else {
      styleInstance = this.memoizedStyle.get(style) ?? new style();
      this.memoizedStyle.set(style, styleInstance);
    }

    const builder = Builder.create(styleInstance);
    const optionsCollection = new OptionsCollection(styleInstance, options);

    PropertyHelper.fillProperties(builder, optionsCollection);
    AttributeHelper.fillAttributes(builder);

    return new Avatar(
      builder.build(),
      styleInstance.getMetadata(),
      builder.getProperties().all(),
    );
  }

  toString(): string {
    return this.svg;
  }

  toDataUri(): string {
    return `data:image/svg+xml;utf8,${encodeURIComponent(this.svg)}`;
  }

  toJson(): string {
    return JSON.stringify(
      {
        svg: this.svg,
        metadata: this.metadata,
        properties: this.properties,
      },
      (k, v) => (v instanceof ColorModel ? v.getHex() : v),
    );
  }
}
