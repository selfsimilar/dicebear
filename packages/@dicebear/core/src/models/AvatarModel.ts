import { LicenseHelper } from '../helpers/LicenseHelper.js';
import { SvgHelper } from '../helpers/SvgHelper.js';
import type { Definition, Metadata, Properties } from '../types.js';
import { AvatarViewModel } from './AvatarViewModel.js';

type Attributes = Map<string, string>;

export class AvatarModel {
  private definition: Definition;
  private body: string;
  private properties: Properties;
  private attributes: Attributes;

  constructor(
    definition: Definition,
    body: string,
    properties: Properties,
    attributes: Attributes,
  ) {
    this.definition = definition;
    this.body = body;
    this.properties = properties;
    this.attributes = attributes;
  }

  getViewBoxWidth(): number {
    return this.definition.body.width;
  }

  getViewBoxHeight(): number {
    return this.definition.body.height;
  }

  getMetadata(): Metadata {
    return this.definition.metadata ?? {};
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
    this.setMissingDefaultAttributes();

    const attributes = SvgHelper.createAttrString(this.getAttributes());
    const metadata = LicenseHelper.xml(this.getMetadata());

    const svg = `<svg ${attributes}>${metadata}${this.getBody()}</svg>`;

    return new AvatarViewModel(this.getMetadata(), svg, this.getProperties());
  }

  private setMissingDefaultAttributes() {
    if (!this.attributes.has('xmlns')) {
      this.attributes.set('xmlns', 'http://www.w3.org/2000/svg');
    }

    if (!this.attributes.has('viewBox')) {
      this.attributes.set(
        'viewBox',
        `0 0 ${this.getViewBoxWidth()} ${this.getViewBoxHeight()}`,
      );
    }
  }
}
