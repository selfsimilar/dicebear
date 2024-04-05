import { createStyle, StyleDefinition } from '@dicebear/core';
import definition from '@dicebear/definitions/shapes.json' with { type: 'json' };

interface ShapesOptions {
  shape1?: Array<
    | 'ellipse'
    | 'ellipseFilled'
    | 'line'
    | 'polygon'
    | 'polygonFilled'
    | 'rectangle'
    | 'rectangleFilled'
  >;
  shape1Offset?: number;
  shape1Rotation?: [number, number];
  shape2?: Array<
    | 'ellipse'
    | 'ellipseFilled'
    | 'line'
    | 'polygon'
    | 'polygonFilled'
    | 'rectangle'
    | 'rectangleFilled'
  >;
  shape2Offset?: number;
  shape2Rotation?: [number, number];
  shape3?: Array<
    | 'ellipse'
    | 'ellipseFilled'
    | 'line'
    | 'polygon'
    | 'polygonFilled'
    | 'rectangle'
    | 'rectangleFilled'
  >;
  shape3Offset?: number;
  shape3Rotation?: [number, number];
  shape1Color: string[];
  shape2Color: string[];
  shape3Color: string[];
}

const shapes = createStyle<ShapesOptions>(definition as StyleDefinition);

export { shapes };
