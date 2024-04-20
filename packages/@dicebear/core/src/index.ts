/*!
 * DiceBear (@dicebear/core)
 *
 * Code licensed under MIT (https://github.com/dicebear/dicebear/blob/main/LICENSE)
 * Copyright (c) 2024 Florian Körner
 */

import { Core } from './Core.js';
import { Style } from './Style.js';
import { GenericError } from './errors/GenericError.js';
import { DependencyError } from './errors/DependencyError.js';
import { Definition, Options } from './types.js';

export function createStyle<O extends Record<string, unknown>>(
  definition: Definition,
): Style<O> {
  return Style.fromDefinition(definition);
}

export function createAvatar<O extends Record<string, unknown>>(
  style: Style<O>,
  options: Partial<Options<O>> = {},
) {
  return Core.createAvatar(style, options);
}

export { Core, Style, GenericError, DependencyError };
export type { Definition, Options };
