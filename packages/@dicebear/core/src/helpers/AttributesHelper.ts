import { BuildModel } from '../models/BuildModel';
import { Definition } from '../types';

export class AttributesHelper {
  static fillAttributes<O extends Record<string, unknown>>(
    buildModel: BuildModel<O>,
    definition: Definition,
  ) {
    const attributes = buildModel.getAttributes();

    for (const { name, value } of definition.attributes ?? []) {
      attributes.set(name, value);
    }

    if (!attributes.has('xmlns')) {
      attributes.set('xmlns', 'http://www.w3.org/2000/svg');
    }

    if (!attributes.has('viewBox')) {
      attributes.set(
        'viewBox',
        `0 0 ${definition.body.width} ${definition.body.height}`,
      );
    }
  }
}
