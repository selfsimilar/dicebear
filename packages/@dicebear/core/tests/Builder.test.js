import assert from 'node:assert';
import { describe, it } from 'node:test';

import { Builder } from '../lib/Builder.js';
import { AttributeHelper } from '../lib/helpers/AttributeHelper.js';
import { PropertyHelper } from '../lib/helpers/PropertyHelper.js';
import { OptionsCollection } from '../lib/collections/OptionsCollection.js';

import { ShapeFace } from './fixtures/definitions/styles/ShapeFace.js';
import shapeFaceDefinition from './fixtures/definitions/json/shape-face.json' with { type: 'json' };

describe('Builder', () => {
  const shapeFaceStyle = new ShapeFace();

  it('getViewBox', () => {
    const builder = Builder.create(shapeFaceStyle);

    AttributeHelper.fillAttributes(builder);

    assert.deepStrictEqual(builder.getViewBox(), {
      height: 115,
      width: 115,
      x: 0,
      y: 0,
    });
  });

  it('getStyle', () => {
    const builder = Builder.create(shapeFaceStyle);

    assert.strictEqual(builder.getStyle(), shapeFaceStyle);
  });

  it('getProperties', () => {
    const builder = Builder.create(shapeFaceStyle);

    PropertyHelper.fillProperties(
      builder,
      new OptionsCollection(shapeFaceStyle, {}),
    );

    assert.strictEqual(builder.getProperties().all().length, 20);
  });

  it('getAttributes', () => {
    const builder = Builder.create(shapeFaceStyle);

    AttributeHelper.fillAttributes(builder);

    assert.strictEqual(builder.getAttributes().all().length, 4);
  });

  it('build', () => {
    const builder = Builder.create(shapeFaceStyle);

    AttributeHelper.fillAttributes(builder);
    PropertyHelper.fillProperties(
      builder,
      new OptionsCollection(shapeFaceStyle, {}),
    );

    assert.strictEqual(
      builder.build(),
      '<svg fill="none" shape-rendering="auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115 115"><metadata xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/"><rdf:RDF><rdf:Description><dc:title>Shape Face</dc:title><dc:creator>Florian Körner</dc:creator><dc:source xsi:type="dcterms:URI">https://www.dicebear.com</dc:source><dcterms:license xsi:type="dcterms:URI">https://creativecommons.org/publicdomain/zero/1.0/</dcterms:license><dc:rights>„Shape Face” (https://www.dicebear.com) by „Florian Körner”, licensed under „CC0 1.0” (https://creativecommons.org/publicdomain/zero/1.0/)</dc:rights></rdf:Description></rdf:RDF></metadata><mask id="viewboxMask"><rect width="115" height="115" rx="0" ry="0" fill="#fff" /></mask><g mask="url(#viewboxMask)"><rect fill="rgba(234, 84, 85, 1)" width="115" height="115" /><g transform="rotate(360 57.5 57.5)"><defs><linearGradient id="color-face"><stop stop-color="rgba(255, 212, 96, 1)"/></linearGradient><linearGradient id="color-eyes"><stop stop-color="rgba(0, 0, 0, 1)"/></linearGradient></defs><symbol id="component-eyes"><mask id="eyesEllipse-a" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="14" y="-9" width="29" height="29"><rect x="14" y="-9" width="29" height="29" fill="#D9D9D9"/></mask><g mask="url(#eyesEllipse-a)"><circle cx="13" cy="10" r="10" fill="url(#color-eyes)"/><circle cx="43" cy="10" r="10" fill="url(#color-eyes)"/></g></symbol><symbol id="component-face"><g transform="translate(-3, 0) rotate(-3 57.5 50)"><circle cx="58" cy="50" r="50" fill="url(#color-face)"/></g></symbol><g transform="translate(0 7)"><use href="#component-face"/></g><g transform="translate(30 37)"><use href="#component-eyes"/></g></g></g></svg>',
    );
  });

  it('buildBody', () => {
    const builder = Builder.create(shapeFaceStyle);

    AttributeHelper.fillAttributes(builder);
    PropertyHelper.fillProperties(
      builder,
      new OptionsCollection(shapeFaceStyle, {}),
    );

    assert.strictEqual(
      builder.buildBody(),
      '<mask id="viewboxMask"><rect width="115" height="115" rx="0" ry="0" fill="#fff" /></mask><g mask="url(#viewboxMask)"><rect fill="rgba(234, 84, 85, 1)" width="115" height="115" /><g transform="rotate(360 57.5 57.5)"><defs><linearGradient id="color-face"><stop stop-color="rgba(255, 212, 96, 1)"/></linearGradient><linearGradient id="color-eyes"><stop stop-color="rgba(0, 0, 0, 1)"/></linearGradient></defs><symbol id="component-eyes"><mask id="eyesEllipse-a" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="14" y="-9" width="29" height="29"><rect x="14" y="-9" width="29" height="29" fill="#D9D9D9"/></mask><g mask="url(#eyesEllipse-a)"><circle cx="13" cy="10" r="10" fill="url(#color-eyes)"/><circle cx="43" cy="10" r="10" fill="url(#color-eyes)"/></g></symbol><symbol id="component-face"><g transform="translate(-3, 0) rotate(-3 57.5 50)"><circle cx="58" cy="50" r="50" fill="url(#color-face)"/></g></symbol><g transform="translate(0 7)"><use href="#component-face"/></g><g transform="translate(30 37)"><use href="#component-eyes"/></g></g></g>',
    );
  });

  it('getDependencies', () => {
    const builder = Builder.create(shapeFaceStyle);

    AttributeHelper.fillAttributes(builder);
    PropertyHelper.fillProperties(
      builder,
      new OptionsCollection(shapeFaceStyle, {}),
    );

    const { colors, components } = builder.getDependencies();

    assert.deepStrictEqual(colors, [
      shapeFaceDefinition.colors[1],
      shapeFaceDefinition.colors[2],
    ]);

    assert.deepStrictEqual(components, [
      shapeFaceDefinition.components[0],
      shapeFaceDefinition.components[1],
    ]);
  });
});
