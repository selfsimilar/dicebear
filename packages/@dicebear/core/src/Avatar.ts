import type { Options, Properties } from './types.js';
import { mask } from 'superstruct';
import { Style } from './Style.js';
import { OptionsStruct } from './structs/OptionsStruct.js';
import { Prng } from './Prng.js';
import { ColorHelper } from './helpers/ColorHelper.js';
import { SvgHelper } from './helpers/SvgHelper.js';
import { StringHelper } from './helpers/StringHelper.js';
import { ColorModel } from './models/ColorModel.js';
import { ComposeModel } from './models/ComposeModel.js';

export class Avatar<O extends Record<string, unknown>> {
  private readonly properties: Properties = new Map();
  private readonly content: string;

  constructor(
    private readonly style: Style<O>,
    options: Partial<Options<O>> = {},
  ) {
    const composeModel = new ComposeModel(
      this.validateOptions(options),
      style.validateOptions(options),
    );

    this.defineProperties(composeModel);

    this.build(composeModel);

    this.content = this.buildContent(composeModel);
  }

  toString(): string {
    return this.content;
  }

  toDataUri(): string {
    return `data:image/svg+xml;utf8,${encodeURIComponent(this.content)}`;
  }

  toJson(): string {
    return JSON.stringify(
      {
        svg: this.content,
        metadata: this.style.getDefinition().metadata,
        properties: [...this.properties],
      },
      (k, v) => (v instanceof ColorModel ? v.getHex() : v),
    );
  }

  private validateOptions(options: unknown): Options {
    return mask(options, OptionsStruct);
  }

  private defineProperties(composeModel: ComposeModel<O>) {
    const properties = composeModel.getProperties();
    const coreOptions = composeModel.getCoreOptions();
    const styleOptions = composeModel.getStyleOptions();

    let backgroundColorOption = coreOptions.backgroundColor;

    if (Array.isArray(styleOptions.backgroundColor)) {
      // The avatar style can also specify background colors.
      backgroundColorOption = styleOptions.backgroundColor;
    }

    const backgroundType = ColorHelper.getBackgroundType(
      composeModel.getPrng(),
      coreOptions.backgroundType,
    );

    const backgroundColor = ColorHelper.getBackgroundColors(
      composeModel.getPrng(),
      backgroundColorOption.map((v: string) => new ColorModel(v)),
      backgroundType,
    );

    const backgroundRotation = ColorHelper.getBackgroundRotation(
      composeModel.getPrng(),
      coreOptions.backgroundRotation,
    );

    properties.set('initials', StringHelper.getInitials(coreOptions.seed));
    properties.set('seed', coreOptions.seed);
    properties.set('flip', coreOptions.flip);
    properties.set('rotate', coreOptions.rotate);
    properties.set('scale', coreOptions.scale);
    properties.set('radius', coreOptions.radius ?? 0);
    properties.set('size', coreOptions.size ?? null);
    properties.set('backgroundColor', backgroundColor);
    properties.set('backgroundType', [backgroundType]);
    properties.set('backgroundRotation', [backgroundRotation]);
    properties.set('translateX', coreOptions.translateX);
    properties.set('translateY', coreOptions.translateY);
    properties.set('clip', coreOptions.clip);
    properties.set('randomizeIds', coreOptions.randomizeIds);

    this.style.defineProperties(composeModel);
  }

  private buildContent(
    prng: Prng,
    coreOptions: Options,
    styleOptions: O,
  ): AvatarViewModel {
    // Create avatar
    const avatar = this.style.create(prng, styleOptions, this.properties);

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
      !primaryBackground.isTransparent() &&
      !secondaryBackground.isTransparent()
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
