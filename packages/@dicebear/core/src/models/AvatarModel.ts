import { LicenseHelper } from '../helpers/LicenseHelper';
import { SvgHelper } from '../helpers/SvgHelper';
import { Metadata, Properties, Property } from '../types';
import { AvatarViewModel } from './AvatarViewModel';

type Attributes = Record<string, string>;

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

    // Always set default xmlns and viewBox attributes
    this.attributes = {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: `0 0 ${metadata.canvas.size} ${metadata.canvas.size}`,
      ...attributes,
    };
  }

  getMetadata(): Metadata {
    return this.metadata;
  }

  setProperty(name: string, value: Property): this {
    this.properties[name] = value;

    return this;
  }

  addProperties(properties: Properties): this {
    this.properties = {
      ...this.properties,
      ...properties,
    };

    return this;
  }

  getProperty(name: string): Property | undefined {
    return this.properties[name];
  }

  getProperties(): Properties {
    return this.properties;
  }

  setAttribute(name: string, value: string): this {
    this.attributes[name] = value;

    return this;
  }

  addAttributes(attributes: Attributes): this {
    this.attributes = {
      ...this.attributes,
      ...attributes,
    };

    return this;
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
