import { Builder } from '../Builder';
import { ViewBox } from '../types';

export class AttributesHelper {
  static memoizedParseViewBox = new Map<string, ViewBox>();

  static fillAttributes(builder: Builder) {
    const style = builder.getStyle();
    const attributes = builder.getAttributes();

    for (const { name, value } of style.getAttributes()) {
      attributes.set(name, value);
    }

    if (!attributes.has('xmlns')) {
      attributes.set('xmlns', 'http://www.w3.org/2000/svg');
    }

    if (!attributes.has('viewBox')) {
      attributes.set(
        'viewBox',
        `0 0 ${style.getBody().width} ${style.getBody().height}`,
      );
    }

    this.fillSizeAttributes(builder);
  }

  static fillSizeAttributes(builder: Builder) {
    const targetSize = builder.getProperties().get('size');

    if (typeof targetSize !== 'number') {
      return;
    }

    const { width, height } = builder.getViewBox();
    const aspectRatio = width / height;

    const newWidth = aspectRatio > 1 ? targetSize : targetSize * aspectRatio;
    const newHeight = aspectRatio > 1 ? targetSize / aspectRatio : targetSize;

    const attributes = builder.getAttributes();

    attributes.set('width', newWidth.toString());
    attributes.set('height', newHeight.toString());
  }

  static parseViewBox(viewBox: string): ViewBox {
    if (this.memoizedParseViewBox.has(viewBox)) {
      return this.memoizedParseViewBox.get(viewBox)!;
    }

    const [x, y, width, height] = viewBox
      .split(' ')
      .map((value) => Number(value));

    const result = { x, y, width, height };

    this.memoizedParseViewBox.set(viewBox, result);

    return result;
  }
}
