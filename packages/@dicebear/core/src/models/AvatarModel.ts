import { LicenseHelper } from '../helpers/LicenseHelper';
import { SvgHelper } from '../helpers/SvgHelper';
import { Metadata, Properties } from '../types';
import { AvatarViewModel } from './AvatarViewModel';

type Attributes = Map<string, string>;

export class AvatarModel {
  private metadata: Metadata;
  private body: string;
  private properties: Properties;
  private attributes: Attributes;

  constructor(
    metadata: Metadata,
    body: string,
    properties: Properties,
    attributes: Attributes,
  ) {
    this.metadata = metadata;
    this.body = body;
    this.properties = properties;
    this.attributes = attributes;

    // Always set default xmlns and viewBox attributes
    if (!attributes.has('xmlns')) {
      this.attributes.set('xmlns', 'http://www.w3.org/2000/svg');
    }

    if (!attributes.has('viewBox')) {
      this.attributes.set(
        'viewBox',
        `0 0 ${metadata.canvas.size} ${metadata.canvas.size}`,
      );
    }
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
}
