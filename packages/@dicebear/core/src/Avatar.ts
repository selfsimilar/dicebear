import type { DefinitionMetadata, Options, StyleOptions } from './types.js';
import { Style } from './Style.js';
import { ColorModel } from './models/ColorModel.js';
import { Builder } from './Builder.js';
import { PropertyHelper } from './helpers/PropertyHelper.js';
import { AttributeHelper } from './helpers/AttributeHelper.js';
import { OptionsCollection } from './collections/OptionsCollection.js';

export class Avatar {
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
    style: Style<S>,
    options: Partial<Options<S>> = {},
  ) {
    const builder = Builder.create(style);
    const optionsCollection = new OptionsCollection(style, options);

    PropertyHelper.fillProperties(builder, optionsCollection);
    AttributeHelper.fillAttributes(builder);

    return new Avatar(
      builder.build(),
      style.getMetadata(),
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
