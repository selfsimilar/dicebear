import { Prng } from '../Prng.js';
import { Builder } from '../Builder.js';
import { ColorModel } from '../models/ColorModel.js';
import { DefinitionColor, DefinitionComponent } from '../types.js';
import { AttributesCollection } from '../collections/AttributesCollection.js';

export class SvgHelper {
  static escape(content: string): string {
    return content.replace(
      /[&'"><]/g,
      (match) =>
        ({
          '&': '&amp;',
          "'": '&apos;',
          '"': '&quot;',
          '>': '&gt;',
          '<': '&lt;',
        })[match] as string,
    );
  }

  static createAttrString(attributes: AttributesCollection): string {
    return attributes
      .all()
      .map(
        ([name, value]) =>
          `${SvgHelper.escape(name)}="${SvgHelper.escape(value as string)}"`,
      )
      .join(' ');
  }

  static addBackground(builder: Builder, body: string): string {
    const backgroundColor = builder.getProperties().get('backgroundColor');

    if (
      !(backgroundColor instanceof ColorModel) ||
      backgroundColor.isTransparent()
    ) {
      return body;
    }

    const { width, height } = builder.getViewBox();

    return `<rect fill="rgba(${backgroundColor.getRgba().join(', ')})" width="${width}" height="${height}" />${body}`;
  }

  static addScale(builder: Builder, body: string): string {
    const scale = builder.getProperties().getNumber('scale');

    if (scale === undefined || scale === 100) {
      return body;
    }

    const { width, height } = builder.getViewBox();

    const percent = (scale - 100) / 100;
    const translateX = (width / 2) * percent * -1;
    const translateY = (height / 2) * percent * -1;

    return `<g transform="translate(${translateX} ${translateY}) scale(${
      scale / 100
    })">${body}</g>`;
  }

  static addTranslate(builder: Builder, body: string): string {
    const { width, height } = builder.getViewBox();
    const translateX = builder.getProperties().getNumber('translateX');
    const translateY = builder.getProperties().getNumber('translateY');

    const x = translateX ? (width * translateX) / 100 : 0;
    const y = translateY ? (height * translateY) / 100 : 0;

    if (!x && !y) {
      return body;
    }

    return `<g transform="translate(${x} ${y})">${body}</g>`;
  }

  static addRotate(builder: Builder, body: string): string {
    const rotate = builder.getProperties().getNumber('rotate');

    if (!rotate) {
      return body;
    }

    const { width, height } = builder.getViewBox();

    return `<g transform="rotate(${rotate} ${width / 2} ${height / 2})">${body}</g>`;
  }

  static addFlip(builder: Builder, body: string): string {
    const flip = builder.getProperties().getBoolean('flip');

    if (!flip) {
      return body;
    }

    const { width } = builder.getViewBox();

    return `<g transform="scale(-1 1) translate(${width * -1} 0)">${body}</g>`;
  }

  static addRadius(builder: Builder, body: string): string {
    const radius = builder.getProperties().getNumber('radius');
    const clip = builder.getProperties().getBoolean('clip');

    if (!radius && !clip) {
      return body;
    }

    const { width, height } = builder.getViewBox();

    const rx = radius ? (width * radius) / 100 : 0;
    const ry = radius ? (height * radius) / 100 : 0;

    return (
      `<mask id="viewboxMask">` +
      `<rect width="${width}" height="${height}" rx="${rx}" ry="${ry}" fill="#fff" />` +
      `</mask>` +
      `<g mask="url(#viewboxMask)">${body}</g>`
    );
  }

  static randomizeIds(builder: Builder, body: string): string {
    const randomizeIds = builder.getProperties().getBoolean('randomizeIds');

    if (!randomizeIds) {
      return body;
    }

    const prng = Prng.fromRandom();
    const ids: Record<string, string> = {};

    return body.replace(
      /(id="|url\(#)([a-z0-9-_]+)([")])/gi,
      (match, m1, m2, m3) => {
        ids[m2] = ids[m2] || prng.string(8);

        return `${m1}${ids[m2]}${m3}`;
      },
    );
  }

  static replacePlaceholders(builder: Builder, body: string): string {
    return body.replace(/\{\{([^}]+)\}\}/gi, (match, m1) => {
      const placeholder = builder.getProperties().get(m1);

      if (typeof placeholder === 'string') {
        return this.escape(placeholder);
      }

      return '';
    });
  }

  static createComponentSymbol(
    builder: Builder,
    component: DefinitionComponent,
  ) {
    const properties = builder.getProperties();

    const componentValueName = properties.get(component.name);
    const componentRotation = properties.get(`${component.name}Rotation`);
    const componentOffsetX = properties.get(`${component.name}OffsetX`);
    const componentOffsetY = properties.get(`${component.name}OffsetY`);

    if (typeof componentValueName !== 'string') {
      return '';
    }

    const componentValue = builder
      .getStyle()
      .getComponentValueByName(component.name, componentValueName)!;

    let componentContent = componentValue.content;

    if (componentRotation || componentOffsetX || componentOffsetY) {
      componentContent = `<g transform="translate(${componentOffsetX ?? 0}, ${componentOffsetY ?? 0}) rotate(${componentRotation ?? 0} ${component.width / 2} ${component.height / 2})">${componentContent}</g>`;
    }

    return `<symbol id="component-${SvgHelper.escape(component.name)}">${componentContent}</symbol>`;
  }

  static createColorGradient(builder: Builder, color: DefinitionColor) {
    const properties = builder.getProperties();

    const colorValue = properties.get(`${color.name}Color`);

    if (!(colorValue instanceof ColorModel)) {
      return '';
    }

    return `<linearGradient id="color-${SvgHelper.escape(color.name)}"><stop stop-color="rgba(${colorValue.getRgba().join(', ')})"/></linearGradient>`;
  }
}
