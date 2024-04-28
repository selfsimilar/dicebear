import { ColorError } from '../errors/ColorError';

type Rgba = [number, number, number, number];

export class ColorModel {
  private hex: string;
  private rgba: Rgba;
  private relativeLuminance: number;

  constructor(color: string) {
    this.rgba = this.toRgba(color);
    this.hex = this.toHex(this.rgba);
    this.relativeLuminance = this.calculateRelativeLuminance();
  }

  getRgba(): Rgba {
    return this.rgba;
  }

  getHex(): string {
    return this.hex;
  }

  getRelativeLuminance(): number {
    return this.relativeLuminance;
  }

  isTransparent(): boolean {
    return this.rgba[3] === 0;
  }

  private calculateRelativeLuminance(): number {
    // https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
    const rgb = this.rgba.slice(0, 3).map((c) => {
      c /= 255;

      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  }

  private toRgba(color: string): Rgba {
    if (color === 'transparent') {
      return [0, 0, 0, 0];
    }

    color = color.replace(/^#/, '');

    if (color.length === 8) {
      const r = parseInt(color.substring(0, 2), 16);
      const g = parseInt(color.substring(2, 4), 16);
      const b = parseInt(color.substring(4, 6), 16);
      const a = parseInt(color.substring(6, 8), 16) / 255;

      return [r, g, b, a];
    }

    if (color.length === 6) {
      const r = parseInt(color.substring(0, 2), 16);
      const g = parseInt(color.substring(2, 4), 16);
      const b = parseInt(color.substring(4, 6), 16);

      return [r, g, b, 1];
    }

    if (color.length === 3) {
      const r = parseInt(color.substring(0, 1), 16);
      const g = parseInt(color.substring(1, 2), 16);
      const b = parseInt(color.substring(2, 3), 16);

      return [r * 17, g * 17, b * 17, 1];
    }

    throw new ColorError(`Invalid color: ${color}`);
  }

  private toHex(color: [number, number, number, number]): string {
    const r = color[0].toString(16).padStart(2, '0');
    const g = color[1].toString(16).padStart(2, '0');
    const b = color[2].toString(16).padStart(2, '0');
    const a = (color[3] * 255).toString(16).padStart(2, '0');

    return `#${r}${g}${b}${a}`;
  }
}
