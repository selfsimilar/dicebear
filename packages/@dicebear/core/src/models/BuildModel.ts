import { Prng } from '../Prng.js';
import { LicenseHelper } from '../helpers/LicenseHelper.js';
import { PropertiesHelper } from '../helpers/PropertiesHelper.js';
import { SvgHelper } from '../helpers/SvgHelper.js';
import type { Definition, Options, Properties } from '../types.js';

type Attributes = Map<string, string>;
type ViewBox = { x: number; y: number; width: number; height: number };

export class BuildModel<O extends Record<string, unknown>> {
  private readonly properties: Properties = new Map();
  private readonly attributes: Attributes = new Map();

  private readonly prng: Prng;

  private body: string = '';
  private viewBoxMap: Record<string, ViewBox> = {};

  constructor(definition: Definition, options: Options<O>) {
    this.prng = Prng.fromSeed(options.seed);

    PropertiesHelper.fillProperties(this, definition);
  }

  getViewBox(): ViewBox {
    const viewBoxAttribute = this.attributes.get('viewBox');

    if (!viewBoxAttribute) {
      throw new Error('Missing attribute "viewBox"');
    }

    return (this.viewBoxMap[viewBoxAttribute] ??=
      this.parseViewBox(viewBoxAttribute));
  }

  getPrng(): Prng {
    return this.prng;
  }

  getOptions(): Options<O> {
    return this.options;
  }

  getProperties(): Properties {
    return this.properties;
  }

  getAttributes(): Attributes {
    return this.attributes;
  }

  setBody(body: string): this {
    this.body = body;

    return this;
  }

  getBody(): string {
    return this.body;
  }

  getContent(): string {
    const attributes = SvgHelper.createAttrString(this.getAttributes());
    const metadata = LicenseHelper.xml(this.getMetadata());

    return `<svg ${attributes}>${metadata}${this.getBody()}</svg>`;
  }

  private parseViewBox(viewBox: string): ViewBox {
    const [x, y, width, height] = viewBox
      .split(' ')
      .map((value) => Number(value));

    return { x, y, width, height };
  }
}
