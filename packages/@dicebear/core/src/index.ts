/*!
 * DiceBear (@dicebear/core)
 *
 * Code licensed under MIT (https://github.com/dicebear/dicebear/blob/main/LICENSE)
 * Copyright (c) 2024 Florian Körner
 */

import { Core } from './Core.js';
import { Style } from './Style.js';
import { Definition, Metadata, Options } from './types.js';

export function createStyle<O extends {}>(definition: Definition): Style<O> {
  return Style.fromDefinition(definition);
}

export function createAvatar<O extends {}>(style: Style<O>, options: Partial<Options<O>> = {}) {
  return Core.createAvatar(style, options);
}

export { Core, Style };
export type { Definition, Metadata, Options };
