import { Style } from '../../../../lib/index.js';
import definition from '../json/minimal.json' with { type: 'json' };

export class Minimal extends Style {
  constructor() {
    super(definition);
  }
}
