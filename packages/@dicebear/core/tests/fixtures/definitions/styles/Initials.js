import { Style } from '../../../../lib/index.js';
import definition from '../json/initials.json' with { type: 'json' };

export class Initials extends Style {
  constructor() {
    super(definition);
  }
}
