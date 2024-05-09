/*!
 * DiceBear Schema (@dicebear/schema)
 *
 * Code licensed under MIT (https://github.com/dicebear/dicebear/blob/9.x/LICENSE)
 * Copyright (c) 2024 Florian Körner
 */

import { Style } from '@dicebear/core';
import { Schema } from './Schema.js';

export function createSchema<S extends StyleOptions>(
  style: Style,
  options: Partial<Options<S>> = {},
) {
  return Avatar.create(style, options);
}

export { Schema };
