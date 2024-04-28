import { Prng } from '../Prng.js';
import { AvatarModel } from '../models/ComposeModel.js';
import { ColorModel } from '../models/ColorModel.js';

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

  static setSize(avatar: AvatarModel, targetSize: number): void {
    const { width, height } = avatar.getViewBox();
    const aspectRatio = width / height;

    const newWidth = aspectRatio > 1 ? targetSize : targetSize * aspectRatio;
    const newHeight = aspectRatio > 1 ? targetSize / aspectRatio : targetSize;

    const attributes = avatar.getAttributes();

    attributes.set('width', newWidth.toString());
    attributes.set('height', newHeight.toString());
  }

  static addBackground(
    avatar: AvatarModel,
    primaryColor: ColorModel,
    secondaryColor: ColorModel,
    type: 'solid' | 'gradientLinear',
    rotation: number,
  ) {
    const { width, height } = avatar.getViewBox();

    switch (type) {
      case 'solid':
        avatar.setBody(
          `<rect fill="rgba(${primaryColor.getRgba().join(', ')})" width="${width}" height="${height}" />` +
            avatar.getBody(),
        );

        break;

      case 'gradientLinear':
        avatar.setBody(
          `<rect fill="url(#backgroundLinear)" width="${width}" height="${height}" />` +
            `<defs>` +
            `<linearGradient id="backgroundLinear" gradientTransform="rotate(${rotation} 0.5 0.5)">` +
            `<stop stop-color="rgba(${primaryColor.getRgba().join(', ')})"/>` +
            `<stop offset="1" stop-color="rgba(${secondaryColor.getRgba().join(', ')})"/>` +
            `</linearGradient>` +
            `</defs>` +
            avatar.getBody(),
        );
    }
  }

  static addScale(avatar: AvatarModel, scale: number): void {
    const { width, height } = avatar.getViewBox();

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
    const { width, height } = avatar.getViewBox();

    const translateX = x ? (width * x) / 100 : 0;
    const translateY = y ? (height * y) / 100 : 0;

    if (!translateX && !translateY) {
      return;
    }

    avatar.setBody(
      `<g transform="translate(${translateX} ${translateY})">${avatar.getBody()}</g>`,
    );
  }

  static addRotate(avatar: AvatarModel, rotate: number) {
    const { width, height } = avatar.getViewBox();

    avatar.setBody(
      `<g transform="rotate(${rotate} ${width / 2} ${height / 2})">${avatar.getBody()}</g>`,
    );
  }

  static addFlip(avatar: AvatarModel): void {
    const { width } = avatar.getViewBox();

    avatar.setBody(
      `<g transform="scale(-1 1) translate(${width * -1} 0)">${avatar.getBody()}</g>`,
    );
  }

  static addRadius(avatar: AvatarModel, radius: number) {
    const { width, height } = avatar.getViewBox();

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
        const placeholder = avatar.getProperties().get(m1);

        if (typeof placeholder === 'string') {
          return placeholder;
        }

        return '';
      }),
    );
  }
}
