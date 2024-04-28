/*!
 * DiceBear (@dicebear/core)
 *
 * Code licensed under MIT (https://github.com/dicebear/dicebear/blob/main/LICENSE)
 * Copyright (c) 2024 Florian Körner
 */

import { Avatar } from './Avatar.js';
import { Style } from './Style.js';
import { AvatarError } from './errors/AvatarError.js';
import type { Definition, Options } from './types.js';

export function createStyle<O extends Record<string, unknown>>(
  definition: Definition,
): Style<O> {
  return new Style<O>(definition);
}

export function createAvatar<O extends Record<string, unknown>>(
  style: Style<O>,
  options: Partial<Options<O>> = {},
) {
  return new Avatar(style, options);
}

export { Avatar, Style, AvatarError };
export type { Definition, Options };
