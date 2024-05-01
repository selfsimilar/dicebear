import type { DefinitionMetadata, Options, StyleOptions } from './types.js';
import { Style } from './Style.js';
import { ColorModel } from './models/ColorModel.js';
import { Builder } from './Builder.js';
import { PropertiesHelper } from './helpers/PropertiesHelper.js';
import { AttributesHelper } from './helpers/AttributesHelper.js';
import { OptionsCollection } from './collections/OptionsCollection.js';

export class Avatar<S extends StyleOptions> {
  private readonly svg: string;
  private readonly metadata: Exclude<DefinitionMetadata, undefined>;
  private readonly properties: [string, unknown][];

  constructor(style: Style<S>, options: Partial<Options<S>> = {}) {
    const builder = new Builder(style);
    const optionsCollection = new OptionsCollection(style, options);

    PropertiesHelper.fillProperties(builder, optionsCollection);
    AttributesHelper.fillAttributes(builder);

    this.svg = builder.build();
    this.metadata = style.getMetadata();
    this.properties = builder.getProperties().all();
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
