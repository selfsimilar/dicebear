import { Prng } from '../Prng.js';
import { ColorModel } from '../models/ColorModel.js';

export class ColorHelper {
  static getBackgroundColors(
    prng: Prng,
    backgroundColor: ColorModel[],
    backgroundType: 'solid' | 'gradientLinear',
  ): [ColorModel, ColorModel] {
    let shuffledBackgroundColors = prng.shuffle(backgroundColor);

    if (shuffledBackgroundColors.length <= 1) {
      // If no background colour or only one background colour has been selected,
      // the random sorting logic can be omitted.
      shuffledBackgroundColors = backgroundColor;

      // A function call should in any case make an identical number of calls to the Prng.
      prng.next();
    } else if (
      backgroundColor.length == 2 &&
      backgroundType == 'gradientLinear'
    ) {
      // If the background is to be a colour gradient and exactly two background
      // colours have been specified, do not sort them randomly. In this case, we
      // assume that the order of the background colours was chosen on purpose.
      shuffledBackgroundColors = backgroundColor;

      // A function call should in any case make an identical number of calls to the Prng.
      prng.next();
    } else {
      shuffledBackgroundColors = prng.shuffle(backgroundColor);
    }

    if (shuffledBackgroundColors.length === 0) {
      shuffledBackgroundColors = [new ColorModel('transparent')];
    }

    const primary = shuffledBackgroundColors[0];
    const secondary =
      shuffledBackgroundColors[1] ?? shuffledBackgroundColors[0];

    return [primary, secondary];
  }

  static getBackgroundRotation(
    prng: Prng,
    backgroundRotation: number[],
  ): number {
    return prng.integer(
      backgroundRotation.length ? Math.min(...backgroundRotation) : 0,
      backgroundRotation.length ? Math.max(...backgroundRotation) : 0,
    );
  }

  static getBackgroundType(
    prng: Prng,
    backgroundType: Array<'solid' | 'gradientLinear'>,
  ): 'solid' | 'gradientLinear' {
    return prng.pick(backgroundType, 'solid');
  }

  static getContrastColor(
    colors: ColorModel[],
    contrastColors: ColorModel[],
  ): ColorModel | undefined {
    let highestContrastColor: ColorModel | undefined = undefined;
    let highestContrast = 0;

    for (const contrastColor of contrastColors) {
      if (contrastColor.isTransparent()) {
        continue;
      }

      const contrast = Math.min(
        ...colors.map((color) =>
          ColorHelper.getContrastRatio(contrastColor, color),
        ),
      );

      if (!highestContrastColor || contrast > highestContrast) {
        highestContrastColor = contrastColor;
        highestContrast = contrast;
      }
    }

    return highestContrastColor;
  }

  static getContrastRatio(color1: ColorModel, color2: ColorModel) {
    // https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
    const luminance = [
      color1.getRelativeLuminance(),
      color2.getRelativeLuminance(),
    ];

    return (Math.max(...luminance) + 0.05) / (Math.min(...luminance) + 0.05);
  }
}
