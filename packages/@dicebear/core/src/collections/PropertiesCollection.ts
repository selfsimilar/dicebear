import { AbstractCollection } from './AbstractCollection.js';

export class PropertiesCollection extends AbstractCollection {
  protected readonly collection: Map<string, unknown> = new Map();

  set(name: string, value: unknown): void {
    this.collection.set(name, value);
  }
}
