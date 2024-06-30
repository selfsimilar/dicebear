import { max, min, integer, string, pattern } from 'superstruct';

export class Types {
  static color() {
    return pattern(
      string(),
      /^(transparent|[a-fA-F0-9]{3}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$/,
    );
  }

  static rotation() {
    return max(min(integer(), -360), 360);
  }
}
