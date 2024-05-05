import assert from 'node:assert';
import { describe, it } from 'node:test';

import { DependencyHelper } from '../../lib/helpers/DependencyHelper.js';
import { createStyle } from '../../lib/index.js';
import { PropertiesCollection } from '../../lib/collections/PropertiesCollection.js';
import { ColorModel } from '../../lib/models/ColorModel.js';

describe('DependencyHelper', () => {
  it('getDependenciesFromSvg', () => {
    const memoizableSvg = '';

    assert.deepEqual(DependencyHelper.getDependenciesFromSvg(memoizableSvg), {
      components: new Set(),
      colors: new Set(),
    });

    assert.deepEqual(DependencyHelper.getDependenciesFromSvg(memoizableSvg), {
      components: new Set(),
      colors: new Set(),
    });

    assert.deepEqual(
      DependencyHelper.getDependenciesFromSvg('<use href="#component-foo" />'),
      {
        components: new Set(['foo']),
        colors: new Set(),
      },
    );

    assert.deepEqual(
      DependencyHelper.getDependenciesFromSvg(
        '<use href="#component-foo)" /><use fill="url(#color-baz)" href="#component-bar" />',
      ),
      {
        components: new Set(['foo', 'bar']),
        colors: new Set(['baz']),
      },
    );
  });

  it('getDependenciesFromProperties', () => {
    const style = createStyle({
      body: {
        content: '<use href="#component-foo)" /><use href="#component-qux" />',
        width: 100,
        height: 100,
      },
      components: [
        {
          name: 'foo',
          height: 100,
          width: 100,
          values: [
            {
              name: 'default',
              content:
                '<use href="#component-bar)" /><use href="#component-qux" />',
            },
          ],
        },
        {
          name: 'bar',
          height: 100,
          width: 100,
          values: [
            {
              name: 'default',
              content:
                '<path d="M0 0" fill="url(#color-foo)"/><path d="M0 0" fill="url(#color-baz)"/>',
            },
          ],
        },
        {
          name: 'baz',
          height: 100,
          width: 100,
          values: [
            {
              name: 'default',
              content: '',
            },
          ],
        },
        {
          name: 'qux',
          height: 100,
          width: 100,
          values: [
            {
              name: 'default',
              content: '<use href="#component-quux" />',
            },
          ],
        },
        {
          name: 'quux',
          height: 100,
          width: 100,
          values: [
            {
              name: 'default',
              content: '',
            },
          ],
        },
      ],
      colors: [
        {
          name: 'foo',
          values: ['000000'],
        },
        {
          name: 'bar',
          values: ['000000'],
        },
        {
          name: 'baz',
          values: ['000000'],
        },
      ],
    });

    const properties = new PropertiesCollection();

    properties.set('foo', 'default');
    properties.set('bar', 'default');
    properties.set('baz', 'default');
    properties.set('qux', null);

    properties.set('fooColor', new ColorModel('ff0000'));
    properties.set('barColor', new ColorModel('00ff00'));
    properties.set('bazColor', null);

    assert.deepEqual(
      DependencyHelper.getDependenciesFromProperties(style, properties),
      {
        components: new Set(['foo', 'bar', 'qux']),
        colors: new Set(['foo', 'baz']),
      },
    );
  });
});
