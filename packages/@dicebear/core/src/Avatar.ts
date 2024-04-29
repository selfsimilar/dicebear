import type { Options, Properties } from './types.js';
import { mask } from 'superstruct';
import { Style } from './Style.js';
import { Prng } from './Prng.js';
import { SvgHelper } from './helpers/SvgHelper.js';
import { StringHelper } from './helpers/StringHelper.js';
import { ColorModel } from './models/ColorModel.js';
import { BuildModel } from './models/BuildModel.js';
import { StructHelper } from './helpers/StructHelper.js';

export class Avatar<O extends Record<string, unknown>> {
  private readonly properties: Properties = new Map();
  private readonly content: string;

  constructor(
    private readonly style: Style<O>,
    options: Partial<Options<O>> = {},
  ) {
    const buildModel = new BuildModel(this.validateOptions(options));

    this.buildProperties(buildModel);
    this.buildAttributes(buildModel);
    this.buildBody(buildModel);

    this.properties = buildModel.getProperties();
    this.content = '';
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

  private validateOptions(options: unknown): Options<O> {
    return mask(
      options,
      StructHelper.buildStructByDefinition(this.style.getDefinition()),
    ) as Options<O>;
  }

  private buildAttributes(buildModel: BuildModel<O>) {
    const prng = buildModel.getPrng();
    const options = buildModel.getOptions();
    const attributes = buildModel.getAttributes();
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
