import { createStyle, StyleDefinition } from '@dicebear/core';
import definition from '@dicebear/definitions/src/avataaars-neutral.json' with { type: 'json' };

interface AvataaarsNeutralOptions {
  eyebrows?: Array<
    | 'angry'
    | 'angryNatural'
    | 'default'
    | 'defaultNatural'
    | 'flatNatural'
    | 'frownNatural'
    | 'raisedExcited'
    | 'raisedExcitedNatural'
    | 'sadConcerned'
    | 'sadConcernedNatural'
    | 'unibrowNatural'
    | 'upDown'
    | 'upDownNatural'
  >;
  eyes?: Array<
    | 'closed'
    | 'cry'
    | 'default'
    | 'eyeRoll'
    | 'happy'
    | 'hearts'
    | 'side'
    | 'squint'
    | 'surprised'
    | 'wink'
    | 'winkWacky'
    | 'xDizzy'
  >;
  mouth?: Array<
    | 'concerned'
    | 'default'
    | 'disbelief'
    | 'eating'
    | 'grimace'
    | 'sad'
    | 'screamOpen'
    | 'serious'
    | 'smile'
    | 'tongue'
    | 'twinkle'
    | 'vomit'
  >;
  nose?: Array<'default'>;
}

const avataaarsNeutral = createStyle<AvataaarsNeutralOptions>(
  definition as StyleDefinition,
);

export { avataaarsNeutral };
