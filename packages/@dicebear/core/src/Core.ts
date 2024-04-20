import type { Options, Properties, Property } from './types.js';
import { mask } from 'superstruct';
import { Style } from './Style.js';
import { OptionsStruct } from './structs/OptionsStruct.js';
import { Prng } from './Prng.js';
import { AvatarViewModel } from './models/AvatarViewModel.js';
import { ColorHelper } from './helpers/ColorHelper.js';
import { SvgHelper } from './helpers/SvgHelper.js';
import { StringHelper } from './helpers/StringHelper.js';

export class Core {
  static createAvatar<O extends Record<string, unknown>>(
    style: Style<O>,
    options: Partial<Options<O>> = {},
  ): AvatarViewModel {
    if (!(style instanceof Style)) {
      throw new Error('Style must be an instance of Style');
    }

    // Validate options
    const coreOptions = mask(options, OptionsStruct);
    const styleOptions = mask(options, style.getOptionsStruct());

    // Create Prng
    const prng = Prng.fromSeed(coreOptions.seed);

    // Define background properties
    const backgroundType = ColorHelper.getBackgroundType(
      prng,
      coreOptions.backgroundType,
    );

    const backgroundColor = ColorHelper.getBackgroundColors(
      prng,
      // The avatar style can also specify background colors, so first try to
      // get the background color from the avatar style options, then from the
      // core options.
      styleOptions.baclgroundColor ?? coreOptions.backgroundColor,
      backgroundType,
    );

    const backgroundRotation = ColorHelper.getBackgroundRotation(
      prng,
      coreOptions.backgroundRotation,
    );

    // Create properties map
    const properties: Properties = new Map<string, Property>([
      ['initials', StringHelper.getInitials(coreOptions.seed)],
      ['seed', coreOptions.seed],
      ['flip', coreOptions.flip],
      ['rotate', coreOptions.rotate],
      ['scale', coreOptions.scale],
      ['radius', coreOptions.radius ?? 0],
      ['size', coreOptions.size ?? null],
      ['backgroundColor', backgroundColor],
      ['backgroundType', backgroundType],
      ['backgroundRotation', backgroundRotation],
      ['translateX', coreOptions.translateX],
      ['translateY', coreOptions.translateY],
      ['clip', coreOptions.clip],
      ['randomizeIds', coreOptions.randomizeIds],
    ]);

    // Create avatar
    const avatar = style.create(prng, styleOptions, properties);

    // Replace placeholders
    SvgHelper.replacePlaceholders(avatar);

    // Apply options
    if (coreOptions.size) {
      SvgHelper.setSize(avatar, coreOptions.size);
    }

    if (coreOptions.scale !== undefined && coreOptions.scale !== 100) {
      SvgHelper.addScale(avatar, coreOptions.scale);
    }

    if (coreOptions.flip) {
      SvgHelper.addFlip(avatar);
    }

    if (coreOptions.rotate) {
      SvgHelper.addRotate(avatar, coreOptions.rotate);
    }

    if (coreOptions.translateX || coreOptions.translateY) {
      SvgHelper.addTranslate(
        avatar,
        coreOptions.translateX,
        coreOptions.translateY,
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

    if (coreOptions.radius || coreOptions.clip) {
      SvgHelper.addRadius(avatar, coreOptions.radius ?? 0);
    }

    if (coreOptions.randomizeIds) {
      SvgHelper.randomizeIds(avatar);
    }

    // Return view model
    return avatar.toView();
  }
}
