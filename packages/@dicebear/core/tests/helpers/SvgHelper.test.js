import assert from 'node:assert';
import { describe, it } from 'node:test';

import { SvgHelper } from '../../lib/helpers/SvgHelper.js';
import { AttributesCollection } from '../../lib/collections/AttributesCollection.js';
import { Builder } from '../../lib/Builder.js';
import { AttributeHelper } from '../../lib/helpers/AttributeHelper.js';
import { PropertyHelper } from '../../lib/helpers/PropertyHelper.js';
import { OptionsCollection } from '../../lib/collections/OptionsCollection.js';
import { createStyle } from '../../lib/index.js';

import minimalDefinition from '../fixtures/definitions/minimal.json' assert { type: 'json' };
import shapeFaceDefinition from '../fixtures/definitions/shape-face.json' assert { type: 'json' };

describe('SvgHelper', () => {
  const minimalStyle = createStyle(minimalDefinition);
  const shapeFaceStyle = createStyle(shapeFaceDefinition);

  it('escape', () => {
    assert.strictEqual(SvgHelper.escape('&'), '&amp;');
    assert.strictEqual(SvgHelper.escape("'"), '&apos;');
    assert.strictEqual(SvgHelper.escape('"'), '&quot;');
    assert.strictEqual(SvgHelper.escape('<'), '&lt;');
    assert.strictEqual(SvgHelper.escape('>'), '&gt;');

    assert.strictEqual(
      SvgHelper.escape('<path d="M0 0"/>'),
      '&lt;path d=&quot;M0 0&quot;/&gt;',
    );
  });

  it('createAttrString', () => {
    const attributes = new AttributesCollection();

    attributes.set('width', '100');
    attributes.set('height', '100');
    attributes.set('must-be-escaped="', '"');

    assert.strictEqual(
      SvgHelper.createAttrString(attributes),
      'width="100" height="100" must-be-escaped=&quot;="&quot;"',
    );
  });

  it('addBackground #1', () => {
    const builder = new Builder(minimalStyle);
    const options = new OptionsCollection(minimalStyle, {
      backgroundColor: ['fff000'],
    });

    AttributeHelper.fillAttributes(builder);
    PropertyHelper.fillProperties(builder, options);

    assert.strictEqual(
      SvgHelper.addBackground(builder, '<body />'),
      '<rect fill="rgba(255, 240, 0, 1)" width="1" height="1" /><body />',
    );
  });

  it('addBackground #2', () => {
    const builder = new Builder(minimalStyle);
    const options = new OptionsCollection(minimalStyle, {
      backgroundColor: [],
    });

    AttributeHelper.fillAttributes(builder);
    PropertyHelper.fillProperties(builder, options);

    assert.strictEqual(
      SvgHelper.addBackground(builder, '<body />'),
      '<body />',
    );
  });

  it('addScale #1', () => {
    const builder = new Builder(minimalStyle);
    const options = new OptionsCollection(minimalStyle, {
      scale: 200,
    });

    AttributeHelper.fillAttributes(builder);
    PropertyHelper.fillProperties(builder, options);

    assert.strictEqual(
      SvgHelper.addScale(builder, '<body />'),
      '<g transform="translate(-0.5 -0.5) scale(2)"><body /></g>',
    );
  });

  it('addScale #2', () => {
    const builder = new Builder(minimalStyle);
    const options = new OptionsCollection(minimalStyle, {
      scale: 100,
    });

    AttributeHelper.fillAttributes(builder);
    PropertyHelper.fillProperties(builder, options);

    assert.strictEqual(SvgHelper.addScale(builder, '<body />'), '<body />');
  });

  it('addScale #3', () => {
    const builder = new Builder(minimalStyle);
    const options = new OptionsCollection(minimalStyle, {
      scale: undefined,
    });

    AttributeHelper.fillAttributes(builder);
    PropertyHelper.fillProperties(builder, options);

    assert.strictEqual(SvgHelper.addScale(builder, '<body />'), '<body />');
  });

  it('addTranslate #1', () => {
    const builder = new Builder(minimalStyle);
    const options = new OptionsCollection(minimalStyle, {
      translateX: 100,
      translateY: 100,
    });

    AttributeHelper.fillAttributes(builder);
    PropertyHelper.fillProperties(builder, options);

    assert.strictEqual(
      SvgHelper.addTranslate(builder, '<body />'),
      '<g transform="translate(1 1)"><body /></g>',
    );
  });

  it('addTranslate #2', () => {
    const builder = new Builder(minimalStyle);
    const options = new OptionsCollection(minimalStyle, {
      translateX: 100,
      translateY: 0,
    });

    AttributeHelper.fillAttributes(builder);
    PropertyHelper.fillProperties(builder, options);

    assert.strictEqual(
      SvgHelper.addTranslate(builder, '<body />'),
      '<g transform="translate(1 0)"><body /></g>',
    );
  });

  it('addTranslate #3', () => {
    const builder = new Builder(minimalStyle);
    const options = new OptionsCollection(minimalStyle, {
      translateX: 0,
      translateY: 0,
    });

    AttributeHelper.fillAttributes(builder);
    PropertyHelper.fillProperties(builder, options);

    assert.strictEqual(SvgHelper.addTranslate(builder, '<body />'), '<body />');
  });

  it('addRotate #1', () => {
    const builder = new Builder(minimalStyle);
    const options = new OptionsCollection(minimalStyle, {
      rotate: 90,
    });

    AttributeHelper.fillAttributes(builder);
    PropertyHelper.fillProperties(builder, options);

    assert.strictEqual(
      SvgHelper.addRotate(builder, '<body />'),
      '<g transform="rotate(90 0.5 0.5)"><body /></g>',
    );
  });

  it('addRotate #2', () => {
    const builder = new Builder(minimalStyle);
    const options = new OptionsCollection(minimalStyle, {
      rotate: 0,
    });

    AttributeHelper.fillAttributes(builder);
    PropertyHelper.fillProperties(builder, options);

    assert.strictEqual(SvgHelper.addRotate(builder, '<body />'), '<body />');
  });

  it('addFlip #1', () => {
    const builder = new Builder(minimalStyle);
    const options = new OptionsCollection(minimalStyle, {
      flip: true,
    });

    AttributeHelper.fillAttributes(builder);
    PropertyHelper.fillProperties(builder, options);

    assert.strictEqual(
      SvgHelper.addFlip(builder, '<body />'),
      '<g transform="scale(-1 1) translate(-1 0)"><body /></g>',
    );
  });

  it('addFlip #2', () => {
    const builder = new Builder(minimalStyle);
    const options = new OptionsCollection(minimalStyle, {
      flip: false,
    });

    AttributeHelper.fillAttributes(builder);
    PropertyHelper.fillProperties(builder, options);

    assert.strictEqual(SvgHelper.addFlip(builder, '<body />'), '<body />');
  });

  it('addRadius #1', () => {
    const builder = new Builder(minimalStyle);
    const options = new OptionsCollection(minimalStyle, {
      radius: 50,
    });

    AttributeHelper.fillAttributes(builder);
    PropertyHelper.fillProperties(builder, options);

    assert.strictEqual(
      SvgHelper.addRadius(builder, '<body />'),
      '<mask id="viewboxMask"><rect width="1" height="1" rx="0.5" ry="0.5" fill="#fff" /></mask><g mask="url(#viewboxMask)"><body /></g>',
    );
  });

  it('addRadius #2', () => {
    const builder = new Builder(minimalStyle);
    const options = new OptionsCollection(minimalStyle, {
      radius: 0,
    });

    AttributeHelper.fillAttributes(builder);
    PropertyHelper.fillProperties(builder, options);

    assert.strictEqual(
      SvgHelper.addRadius(builder, '<body />'),
      '<mask id="viewboxMask"><rect width="1" height="1" rx="0" ry="0" fill="#fff" /></mask><g mask="url(#viewboxMask)"><body /></g>',
    );
  });

  it('addRadius #3', () => {
    const builder = new Builder(minimalStyle);
    const options = new OptionsCollection(minimalStyle, {
      radius: 0,
      clip: false,
    });

    AttributeHelper.fillAttributes(builder);
    PropertyHelper.fillProperties(builder, options);

    assert.strictEqual(SvgHelper.addRadius(builder, '<body />'), '<body />');
  });

  it('randomizeIds #1', () => {
    const builder = new Builder(minimalStyle);
    const options = new OptionsCollection(minimalStyle, {
      radius: 50,
      randomizeIds: true,
    });

    AttributeHelper.fillAttributes(builder);
    PropertyHelper.fillProperties(builder, options);

    assert.notEqual(
      SvgHelper.randomizeIds(
        builder,
        '<mask id="viewboxMask"><rect width="1" height="1" rx="0.5" ry="0.5" fill="#fff" /></mask><g mask="url(#viewboxMask)"><body /></g>',
      ),
      '<mask id="viewboxMask"><rect width="1" height="1" rx="0.5" ry="0.5" fill="#fff" /></mask><g mask="url(#viewboxMask)"><body /></g>',
    );
  });

  it('randomizeIds #2', () => {
    const builder = new Builder(minimalStyle);
    const options = new OptionsCollection(minimalStyle, {
      radius: 50,
      randomizeIds: false,
    });

    AttributeHelper.fillAttributes(builder);
    PropertyHelper.fillProperties(builder, options);

    assert.strictEqual(
      SvgHelper.randomizeIds(
        builder,
        '<mask id="viewboxMask"><rect width="1" height="1" rx="0.5" ry="0.5" fill="#fff" /></mask><g mask="url(#viewboxMask)"><body /></g>',
      ),
      '<mask id="viewboxMask"><rect width="1" height="1" rx="0.5" ry="0.5" fill="#fff" /></mask><g mask="url(#viewboxMask)"><body /></g>',
    );
  });

  it('replacePlaceholders #1', () => {
    const builder = new Builder(minimalStyle);
    const options = new OptionsCollection(minimalStyle, {
      seed: 'John Doe',
    });

    AttributeHelper.fillAttributes(builder);
    PropertyHelper.fillProperties(builder, options);

    builder.getProperties().set('danger', '<script>alert("danger")</script>');

    assert.strictEqual(
      SvgHelper.replacePlaceholders(
        builder,
        '{{doesNotExist}}-{{initials}}-{{danger}}',
      ),
      '-JD-&lt;script&gt;alert(&quot;danger&quot;)&lt;/script&gt;',
    );
  });

  it('replacePlaceholders #2', () => {
    const builder = new Builder(minimalStyle);
    const options = new OptionsCollection(minimalStyle, {});

    PropertyHelper.fillProperties(builder, options);

    assert.strictEqual(
      SvgHelper.replacePlaceholders(builder, '<body />'),
      '<body />',
    );
  });

  it('createComponentSymbol #1', () => {
    const builder = new Builder(shapeFaceStyle);
    const options = new OptionsCollection(shapeFaceStyle, {
      eyes: ['ellipse'],
      face: ['ellipse'],
      faceRotation: [-10, 10],
      faceOffsetX: [-10, 10],
      faceOffsetY: [-10, 10],
    });

    PropertyHelper.fillProperties(builder, options);

    const eyesComponent = shapeFaceDefinition.components[0];
    const faceComponent = shapeFaceDefinition.components[1];

    assert.strictEqual(eyesComponent.name, 'eyes');
    assert.strictEqual(faceComponent.name, 'face');

    assert.strictEqual(
      SvgHelper.createComponentSymbol(builder, eyesComponent),
      '<symbol id="component-eyes"><mask id="eyesEllipse-a" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="14" y="-9" width="29" height="29"><rect x="14" y="-9" width="29" height="29" fill="#D9D9D9"/></mask><g mask="url(#eyesEllipse-a)"><circle cx="13" cy="10" r="10" fill="url(#color-eyes)"/><circle cx="43" cy="10" r="10" fill="url(#color-eyes)"/></g></symbol>',
    );

    assert.strictEqual(
      SvgHelper.createComponentSymbol(builder, faceComponent),
      '<symbol id="component-face"><g transform="translate(-3, 0) rotate(-3 57.5 50)"><circle cx="58" cy="50" r="50" fill="url(#color-face)"/></g></symbol>',
    );
  });

  it('createComponentSymbol #2', () => {
    const builder = new Builder(shapeFaceStyle);
    const options = new OptionsCollection(shapeFaceStyle, {
      eyes: [],
      face: ['ellipse'],
      faceRotation: [0],
      faceOffsetX: [0],
      faceOffsetY: [0],
    });

    PropertyHelper.fillProperties(builder, options);

    const eyesComponent = shapeFaceDefinition.components[0];
    const faceComponent = shapeFaceDefinition.components[1];

    assert.strictEqual(eyesComponent.name, 'eyes');
    assert.strictEqual(faceComponent.name, 'face');

    assert.strictEqual(
      SvgHelper.createComponentSymbol(builder, eyesComponent),
      '',
    );

    assert.strictEqual(
      SvgHelper.createComponentSymbol(builder, faceComponent),
      '<symbol id="component-face"><circle cx="58" cy="50" r="50" fill="url(#color-face)"/></symbol>',
    );
  });

  it('createComponentSymbol #3', () => {
    const style = createStyle({
      body: {
        content: '',
        width: 1,
        height: 1,
      },
      components: [
        {
          name: 'component1',
          width: 1,
          height: 1,
          rotation: [10],
          values: [
            {
              name: 'default',
              default: true,
              content: '<component1 />',
            },
          ],
        },
        {
          name: 'component2',
          width: 1,
          height: 1,
          offset: {
            x: [10],
          },
          values: [
            {
              name: 'default',
              default: true,
              content: '<component1 />',
            },
          ],
        },
      ],
    });

    const builder = new Builder(style);
    const options = new OptionsCollection(style, {});

    PropertyHelper.fillProperties(builder, options);

    const component1 = style.getComponents()[0];
    const component2 = style.getComponents()[1];

    assert.strictEqual(component1.name, 'component1');
    assert.strictEqual(component2.name, 'component2');

    assert.strictEqual(
      SvgHelper.createComponentSymbol(builder, component1),
      '<symbol id="component-component1"><g transform="translate(0, 0) rotate(10 0.5 0.5)"><component1 /></g></symbol>',
    );

    assert.strictEqual(
      SvgHelper.createComponentSymbol(builder, component2),
      '<symbol id="component-component2"><g transform="translate(10, 0) rotate(0 0.5 0.5)"><component1 /></g></symbol>',
    );
  });

  it('createColorGradient #1', () => {
    const builder = new Builder(shapeFaceStyle);
    const options = new OptionsCollection(shapeFaceStyle, {
      faceColor: ['fff000'],
    });

    PropertyHelper.fillProperties(builder, options);

    const faceColor = shapeFaceDefinition.colors[1];

    assert.strictEqual(faceColor.name, 'face');
    assert.strictEqual(
      SvgHelper.createColorGradient(builder, faceColor),
      '<linearGradient id="color-face"><stop stop-color="rgba(255, 240, 0, 1)"/></linearGradient>',
    );
  });

  it('createColorGradient #2', () => {
    const builder = new Builder(shapeFaceStyle);
    const options = new OptionsCollection(shapeFaceStyle, {
      backgroundColor: [],
    });

    PropertyHelper.fillProperties(builder, options);

    const backgroundColor = shapeFaceDefinition.colors[0];

    assert.strictEqual(backgroundColor.name, 'background');
    assert.strictEqual(
      SvgHelper.createColorGradient(builder, backgroundColor),
      '',
    );
  });
});
