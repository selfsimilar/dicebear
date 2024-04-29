import { ColorModel } from '../models/ColorModel.js';

export class ColorHelper {
  static getContrastColor(
    color: ColorModel,
    contrastColors: ColorModel[],
  ): ColorModel | undefined {
    let highestContrastColor: ColorModel | undefined = undefined;
    let highestContrast = 0;

    for (const contrastColor of contrastColors) {
      if (contrastColor.isTransparent()) {
        continue;
      }

      const contrast = ColorHelper.getContrastRatio(contrastColor, color);

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
