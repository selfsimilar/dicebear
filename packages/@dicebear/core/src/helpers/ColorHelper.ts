import { Prng } from '../Prng.js';

export class ColorHelper {
  static convertColor(color: string): string {
    return 'transparent' === color ? color : `#${color}`;
  }

  static getBackgroundColors(
    prng: Prng,
    backgroundColor: string[],
    backgroundType: 'solid' | 'gradientLinear',
  ): [string, string] {
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
      shuffledBackgroundColors = ['transparent'];
    }

    const primary = shuffledBackgroundColors[0];
    const secondary =
      shuffledBackgroundColors[1] ?? shuffledBackgroundColors[0];

    return [
      ColorHelper.convertColor(primary),
      ColorHelper.convertColor(secondary),
    ];
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
    return prng.pick(backgroundType, 'solid') ?? 'solid';
  }

  static getHighestContrastColor(
    color: string,
    contrastColors: string[],
  ): string | undefined {
    const colorContrastRatio = ColorHelper.getContrastRatio(color);

    let highestContrastColor: string | undefined = undefined;
    let highestContrastRatioDifference = 0;

    for (const contrastColor of contrastColors) {
      if (contrastColor === 'transparent') {
        continue;
      }

      const contrastColorContrastRatio =
        ColorHelper.getContrastRatio(contrastColor);

      const contrastRatioDifference = Math.abs(
        colorContrastRatio - contrastColorContrastRatio,
      );

      if (contrastRatioDifference > highestContrastRatioDifference) {
        highestContrastColor = contrastColor;
        highestContrastRatioDifference = contrastRatioDifference;
      }
    }

    return highestContrastColor;
  }

  static getContrastRatio(color: string): number {
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    return (r * 299 + g * 587 + b * 114) / 1000;
  }
}
