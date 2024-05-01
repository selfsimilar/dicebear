import assert from 'node:assert';
import { describe, it } from 'node:test';

import { DependencyHelper } from '../../lib/helpers/DependencyHelper.js';

describe('DependencyHelper', () => {
  it('getDependenciesFromSvg', () => {
    assert.deepEqual(DependencyHelper.getDependenciesFromSvg(''), {
      components: new Set(),
      colors: new Set(),
    });

    assert.deepEqual(
      DependencyHelper.getDependenciesFromSvg(
        '<use href="url(#component-foo)" />',
      ),
      {
        components: new Set(['foo']),
        colors: new Set(),
      },
    );

    assert.deepEqual(
      DependencyHelper.getDependenciesFromSvg(
        '<use href="url(#component-foo)" /><use href="url(#component-bar)" />',
      ),
      {
        components: new Set(['foo', 'bar']),
        colors: new Set(),
      },
    );

    assert.deepEqual(
      DependencyHelper.getDependenciesFromSvg(
        '<use href="url(#component-foo)" /><use fill="url(#color-baz)" href="url(#component-bar)" />',
      ),
      {
        components: new Set(['foo', 'bar']),
        colors: new Set(['baz']),
      },
    );
  });
});
