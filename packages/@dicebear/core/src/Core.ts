import type { Options } from './types.js';
import { assign, mask, pick } from 'superstruct';
import { Style } from './Style.js';
import { OptionsStruct } from './structs/OptionsStruct.js';
import { Prng } from './Prng.js';
import { AvatarViewModel } from './models/AvatarViewModel.js';
import { ColorHelper } from './helpers/ColorHelper.js';
import { SvgHelper } from './helpers/SvgHelper.js';

export class Core {
  static createAvatar<O extends {}>(
    style: Style<O>,
    options: Partial<Options<O>> = {},
  ): AvatarViewModel {
    if (!(style instanceof Style)) {
      throw new Error('Style must be an instance of Style');
    }

    const StyleOptionsStruct = style.getOptionsStruct();
    const CoreOptionsStruct = StyleOptionsStruct.schema.hasOwnProperty(
      'backgroundColor',
    )
      ? (assign(
          OptionsStruct,
          pick(StyleOptionsStruct, ['backgroundColor']),
        ) as typeof OptionsStruct)
      : OptionsStruct;

    const validatedCoreOptions = mask(options, CoreOptionsStruct);
    const validatedStyleOptions = mask(options, StyleOptionsStruct);

    const prng = Prng.fromSeed(validatedCoreOptions.seed);

    const backgroundType = ColorHelper.getBackgroundType(
      prng,
      validatedCoreOptions.backgroundType,
    );

    const backgroundColor = ColorHelper.getBackgroundColors(
      prng,
      validatedCoreOptions.backgroundColor,
      backgroundType,
    );

    const backgroundRotation = ColorHelper.getBackgroundRotation(
      prng,
      validatedCoreOptions.backgroundRotation,
    );

    const avatar = style.create(prng, validatedStyleOptions, {
      seed: validatedCoreOptions.seed,
      flip: validatedCoreOptions.flip,
      rotate: validatedCoreOptions.rotate,
      scale: validatedCoreOptions.scale,
      radius: validatedCoreOptions.radius,
      size: validatedCoreOptions.size,
      backgroundColor: backgroundColor,
      backgroundType: backgroundType,
      backgroundRotation: backgroundRotation,
      translateX: validatedCoreOptions.translateX,
      translateY: validatedCoreOptions.translateY,
      clip: validatedCoreOptions.clip,
      randomizeIds: validatedCoreOptions.randomizeIds,
    });

    if (validatedCoreOptions.size) {
      SvgHelper.setSize(avatar, validatedCoreOptions.size);
    }

    if (
      validatedCoreOptions.scale !== undefined &&
      validatedCoreOptions.scale !== 100
    ) {
      SvgHelper.addScale(avatar, validatedCoreOptions.scale);
    }

    if (validatedCoreOptions.flip) {
      SvgHelper.addFlip(avatar);
    }

    if (validatedCoreOptions.rotate) {
      SvgHelper.addRotate(avatar, validatedCoreOptions.rotate);
    }

    if (validatedCoreOptions.translateX || validatedCoreOptions.translateY) {
      SvgHelper.addTranslate(
        avatar,
        validatedCoreOptions.translateX,
        validatedCoreOptions.translateY,
      );
    }

    const [primaryBackground, secondaryBackground] = backgroundColor;

    if (
      primaryBackground !== 'transparent' &&
      secondaryBackground !== 'transparent'
    ) {
      SvgHelper.addBackground(
        avatar,
        primaryBackground,
        secondaryBackground,
        backgroundType,
        backgroundRotation,
      );
    }

    if (validatedCoreOptions.radius || validatedCoreOptions.clip) {
      SvgHelper.addRadius(avatar, validatedCoreOptions.radius ?? 0);
    }

    if (validatedCoreOptions.randomizeIds) {
      SvgHelper.randomizeIds(avatar);
    }

    return avatar.toView();
  }
}
