import { Style } from '../../../../lib/index.js';
import definition from '../json/shape-face.json' with { type: 'json' };

export class ShapeFace extends Style {
  constructor() {
    super(definition);
  }
}
