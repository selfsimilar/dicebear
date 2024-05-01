import type { Options, Properties, StyleOptions } from './types.js';
import { Style } from './Style.js';
import { ColorModel } from './models/ColorModel.js';
import { Builder } from './Builder.js';
import { PropertiesHelper } from './helpers/PropertiesHelper.js';
import { AttributesHelper } from './helpers/AttributesHelper.js';

export class Avatar<S extends StyleOptions> {
  private readonly properties: Properties = new Map();
  private readonly svg: string;

  constructor(
    private readonly style: Style<S>,
    options: Partial<Options<S>> = {},
  ) {
    const builder = new Builder(style, options);

    PropertiesHelper.fillProperties(builder);
    AttributesHelper.fillAttributes(builder);

    this.properties = builder.getProperties();
    this.svg = builder.build();
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
        metadata: this.style.getMetadata(),
        properties: [...this.properties],
      },
      (k, v) => (v instanceof ColorModel ? v.getHex() : v),
    );
  }
}
