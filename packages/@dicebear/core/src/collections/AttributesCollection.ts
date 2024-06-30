import { AbstractCollection } from './AbstractCollection.js';

export class AttributesCollection extends AbstractCollection {
  protected readonly collection: Map<string, string> = new Map();

  set(name: string, value: string): void {
    this.collection.set(name, value);
  }
}
