import { Prng } from '../Prng.js';
import { AvatarModel } from '../models/AvatarModel.js';

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
    const attributes = avatar.getAttributes();

    attributes.set('width', size.toString());
    attributes.set('height', size.toString());
  }

  static addBackground(
    avatar: AvatarModel,
    primaryColor: string,
    secondaryColor: string,
    type: 'solid' | 'gradientLinear',
    rotation: number,
  ) {
    const width = avatar.getViewBoxWidth();
    const height = avatar.getViewBoxHeight();

    switch (type) {
      case 'solid':
        avatar.setBody(
          `<rect fill="${primaryColor}" width="${width}" height="${height}" />` +
            avatar.getBody(),
        );

        break;

      case 'gradientLinear':
        avatar.setBody(
          `<rect fill="url(#backgroundLinear)" width="${width}" height="${height}" />` +
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
    const width = avatar.getViewBoxWidth();
    const height = avatar.getViewBoxHeight();

    const percent = scale ? (scale - 100) / 100 : 0;

    const translateX = (width / 2) * percent * -1;
    const translateY = (height / 2) * percent * -1;

    avatar.setBody(
      `<g transform="translate(${translateX} ${translateY}) scale(${
        scale / 100
      })">${avatar.getBody()}</g>`,
    );
  }

  static addTranslate(avatar: AvatarModel, x?: number, y?: number) {
    const width = avatar.getViewBoxWidth();
    const height = avatar.getViewBoxHeight();

    const translateX = x ? (width * x) / 100 : 0;
    const translateY = y ? (height * y) / 100 : 0;

    avatar.setBody(
      `<g transform="translate(${translateX} ${translateY})">${avatar.getBody()}</g>`,
    );
  }

  static addRotate(avatar: AvatarModel, rotate: number) {
    const width = avatar.getViewBoxWidth();
    const height = avatar.getViewBoxHeight();

    avatar.setBody(
      `<g transform="rotate(${rotate} ${width / 2} ${height / 2})">${avatar.getBody()}</g>`,
    );
  }

  static addFlip(avatar: AvatarModel): void {
    const width = avatar.getViewBoxWidth();

    avatar.setBody(
      `<g transform="scale(-1 1) translate(${width * -1} 0)">${avatar.getBody()}</g>`,
    );
  }

  static addRadius(avatar: AvatarModel, radius: number) {
    const width = avatar.getViewBoxWidth();
    const height = avatar.getViewBoxHeight();

    const rx = radius ? (width * radius) / 100 : 0;
    const ry = radius ? (height * radius) / 100 : 0;

    avatar.setBody(
      `<mask id="viewboxMask">` +
        `<rect width="${width}" height="${height}" rx="${rx}" ry="${ry}" fill="#fff" />` +
        `</mask>` +
        `<g mask="url(#viewboxMask)">${avatar.getBody()}</g>`,
    );
  }

  static createAttrString(attributes: Map<string, string>): string {
    return [...attributes]
      .map(
        ([name, value]) =>
          `${SvgHelper.escape(name)}="${SvgHelper.escape(value)}"`,
      )
      .join(' ');
  }

  static randomizeIds(avatar: AvatarModel): void {
    const prng = Prng.fromRandom();
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

  static replacePlaceholders(avatar: AvatarModel): void {
    avatar.setBody(
      avatar.getBody().replace(/\{\{([^}]+)\}\}/gi, (match, m1) => {
        return avatar.getAttributes().get(m1) || '';
      }),
    );
  }
}
