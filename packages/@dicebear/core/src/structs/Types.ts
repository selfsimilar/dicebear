import { max, min, integer, coerce, boolean, string, pattern, array, Struct, Infer, any } from "superstruct";

export class Types {
  static boolean() {
    return coerce(boolean(), string(), v => v === 'true' ||  v === '1');
  }

  static color() {
    return pattern(string(), /^(transparent|[a-fA-F0-9]{6})$/);
  }

  static integer() {
    return coerce(integer(), string(), (v) => parseInt(v));
  }

  static rotation() {
    return max(min(this.integer(), -360), 360);
  }

  static array<T extends Struct<any>>(element: T): Struct<Infer<T>[], T> {
    return coerce(array(element), any(), (v) => Array.isArray(v) ? v : [v]);
  }
}
