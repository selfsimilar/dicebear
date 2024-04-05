import { AvatarModel } from '../models/AvatarModel.js';
import { PRNG } from '../PRNG.js';

export class SvgHelper {
  static escape(content: string): string {
    return content.replace(/[&'"><]/g, function (m) {
      switch (m) {
        case '&':
          return '&amp;';
        case "'":
          return '&apos;';
        case '"':
          return '&quot;';
        case '<':
          return '&lt;';
        case '>':
          return '&gt;';
        default:
          return m;
      }
    });
  }

  static setSize(avatar: AvatarModel, size: number): void {
    avatar.setAttribute('width', size.toString());
    avatar.setAttribute('height', size.toString());
  }

  static addBackground(
    avatar: AvatarModel,
    primaryColor: string,
    secondaryColor: string,
    type: 'solid' | 'gradientLinear',
    rotation: number,
  ) {
    const { size } = avatar.getMetadata().canvas;

    switch (type) {
      case 'solid':
        avatar.setBody(
          `<rect fill="${primaryColor}" width="${size}" height="${size}" />` +
            avatar.getBody(),
        );

      case 'gradientLinear':
        avatar.setBody(
          `<rect fill="url(#backgroundLinear)" width="${size}" height="${size}" />` +
            `<defs>` +
            `<linearGradient id="backgroundLinear" gradientTransform="rotate(${rotation} 0.5 0.5)">` +
            `<stop stop-color="${primaryColor}"/>` +
            `<stop offset="1" stop-color="${secondaryColor}"/>` +
            `</linearGradient>` +
            `</defs>` +
            avatar.getBody(),
        );
    }
  }

  static addScale(avatar: AvatarModel, scale: number): void {
    const { size } = avatar.getMetadata().canvas;

    let percent = scale ? (scale - 100) / 100 : 0;

    let translateX = (size / 2) * percent * -1;
    let translateY = (size / 2) * percent * -1;

    avatar.setBody(
      `<g transform="translate(${translateX} ${translateY}) scale(${
        scale / 100
      })">${avatar.getBody()}</g>`,
    );
  }

  static addTranslate(avatar: AvatarModel, x?: number, y?: number) {
    const { size } = avatar.getMetadata().canvas;

    let translateX = x ? (size * x) / 100 : 0;
    let translateY = y ? (size * y) / 100 : 0;

    avatar.setBody(
      `<g transform="translate(${translateX} ${translateY})">${avatar.getBody()}</g>`,
    );
  }

  static addRotate(avatar: AvatarModel, rotate: number) {
    const { size } = avatar.getMetadata().canvas;

    avatar.setBody(
      `<g transform="rotate(${rotate} ${size / 2} ${size / 2})">${avatar.getBody()}</g>`,
    );
  }

  static addFlip(avatar: AvatarModel): void {
    const { size } = avatar.getMetadata().canvas;

    avatar.setBody(
      `<g transform="scale(-1 1) translate(${size * -1} 0)">${avatar.getBody()}</g>`,
    );
  }

  static addRadius(avatar: AvatarModel, radius: number) {
    const { size } = avatar.getMetadata().canvas;

    let r = radius ? (size * radius) / 100 : 0;

    avatar.setBody(
      `<mask id="viewboxMask">` +
        `<rect width="${size}" height="${size}" rx="${r}" ry="${r}" fill="#fff" />` +
        `</mask>` +
        `<g mask="url(#viewboxMask)">${avatar.getBody()}</g>`,
    );
  }

  static createAttrString(attributes: Record<string, string>): string {
    return Object.entries(attributes)
      .map(
        ([name, value]) =>
          `${SvgHelper.escape(name)}="${SvgHelper.escape(value)}"`,
      )
      .join(' ');
  }

  static randomizeIds(avatar: AvatarModel): void {
    const prng = PRNG.fromRandom();
    const ids: Record<string, string> = {};

    avatar.setBody(
      avatar
        .getBody()
        .replace(/(id="|url\(#)([a-z0-9-_]+)([")])/gi, (match, m1, m2, m3) => {
          ids[m2] = ids[m2] || prng.string(8);

          return `${m1}${ids[m2]}${m3}`;
        }),
    );
  }
}
