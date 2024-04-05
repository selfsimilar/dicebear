import { createStyle, StyleDefinition } from '@dicebear/core';
import definition from '@dicebear/definitions/initials.json' with { type: 'json' };

interface InitialsOptions {
  textColor: string[];
}

const initials = createStyle<InitialsOptions>(definition as StyleDefinition);

export { initials };
