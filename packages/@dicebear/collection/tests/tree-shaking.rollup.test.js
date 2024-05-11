import assert from 'node:assert';
import { describe, it } from 'node:test';

import { fileURLToPath } from 'url';
import { rollup } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

describe('rollup', () => {
  it('Tree shaking', async () => {
    const bundle = await rollup({
      input: `${__dirname}/fixtures/tree-shaking/index.js`,
      plugins: [nodeResolve(), json()],
    });

    const { output } = await bundle.generate({
      format: 'esm',
    });

    assert.strictEqual(output.length, 1);

    for (const module in output[0].modules) {
      assert.doesNotMatch(module, /Adventurer/i);
    }
  });
});
