import { Metadata, Properties } from '../types';

export class AvatarViewModel {
  private readonly svg: string;
  private readonly metadata: Metadata;
  private readonly properties: Properties;

  constructor(metadata: Metadata, svg: string, properties: Properties) {
    this.svg = svg;
    this.metadata = metadata;
    this.properties = properties;
  }

  toDataUri(): string {
    return `data:image/svg+xml;utf8,${encodeURIComponent(this.svg)}`;
  }

  toString(): string {
    return this.svg;
  }

  toJson() {
    return {
      svg: this.svg,
      metadata: this.metadata,
      properties: [...this.properties],
    };
  }
}
