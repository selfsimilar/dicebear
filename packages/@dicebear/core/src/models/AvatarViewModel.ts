import type { Metadata, Properties } from '../types.js';

export class AvatarViewModel {
  private readonly svg: string;
  private readonly metadata: Metadata;
  private readonly properties: Properties;

  constructor(metadata: Metadata, svg: string, properties: Properties) {
    this.svg = svg;
    this.metadata = metadata;
    this.properties = properties;
  }

  getMetadata(): Metadata {
    return this.metadata;
  }

  getProperties(): Properties {
    return this.properties;
  }

  toSvg(): string {
    return this.svg;
  }

  toDataUri(): string {
    return `data:image/svg+xml;utf8,${encodeURIComponent(this.svg)}`;
  }

  toJson(): string {
    return JSON.stringify({
      svg: this.svg,
      metadata: this.metadata,
      properties: [...this.properties],
    });
  }

  toString(): string {
    return this.toSvg();
  }
}
