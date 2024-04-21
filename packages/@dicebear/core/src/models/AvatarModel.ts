import { LicenseHelper } from '../helpers/LicenseHelper.js';
import { SvgHelper } from '../helpers/SvgHelper.js';
import type { Metadata, Properties } from '../types.js';
import { AvatarViewModel } from './AvatarViewModel.js';

type Attributes = Map<string, string>;
type ViewBox = { x: number; y: number; width: number; height: number };

export class AvatarModel {
  private viewBoxMap: Record<string, ViewBox> = {};

  constructor(
    private body: string,
    private readonly attributes: Attributes = new Map(),
    private readonly properties: Properties = new Map(),
    private readonly metadata: Metadata = {},
  ) {}

  getViewBox(): ViewBox {
    const viewBoxAttribute = this.attributes.get('viewBox');

    if (!viewBoxAttribute) {
      throw new Error('Missing attribute "viewBox"');
    }

    return (this.viewBoxMap[viewBoxAttribute] ??=
      this.parseViewBox(viewBoxAttribute));
  }

  getMetadata(): Metadata {
    return this.metadata;
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

  toView(): AvatarViewModel {
    const attributes = SvgHelper.createAttrString(this.getAttributes());
    const metadata = LicenseHelper.xml(this.getMetadata());

    const svg = `<svg ${attributes}>${metadata}${this.getBody()}</svg>`;

    return new AvatarViewModel(this.getMetadata(), svg, this.getProperties());
  }

  private parseViewBox(viewBox: string): ViewBox {
    const [x, y, width, height] = viewBox
      .split(' ')
      .map((value) => Number(value));

    return { x, y, width, height };
  }
}
