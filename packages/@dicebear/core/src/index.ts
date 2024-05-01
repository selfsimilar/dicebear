/*!
 * DiceBear (@dicebear/core)
 *
 * Code licensed under MIT (https://github.com/dicebear/dicebear/blob/9.x/LICENSE)
 * Copyright (c) 2024 Florian Körner
 */

import { Avatar } from './Avatar.js';
import { Style } from './Style.js';
import type { Definition, Options, StyleOptions } from './types.js';

export function createStyle<S extends StyleOptions>(
  definition: Definition,
): Style<S> {
  return new Style<S>(definition);
}

export function createAvatar<S extends StyleOptions>(
  style: Style<S>,
  options: Partial<Options<S>> = {},
) {
  return new Avatar(style, options);
}

export { Avatar, Style };
export type { Definition, Options };
