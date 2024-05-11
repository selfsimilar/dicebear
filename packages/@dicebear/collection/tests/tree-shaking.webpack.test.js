import assert from 'node:assert';
import { describe, it } from 'node:test';

import { fileURLToPath } from 'url';
import webpack from 'webpack';
import { dirSync } from 'tmp';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

describe('webpack', () => {
  it('Tree shaking', async () => {
    const tmpDir = dirSync();

    const modules = await new Promise((resolve, reject) => {
      webpack(
        {
          entry: `${__dirname}/fixtures/tree-shaking/index.js`,
          mode: 'production',
          output: {
            path: tmpDir.name,
          },
        },
        (err, stats) => {
          err
            ? reject(err)
            : resolve(
                stats
                  .toJson()
                  .modules.filter((v) => v.usedExports)
                  .map((v) => v.identifier),
              );
        },
      );
    });

    for (const module of modules) {
      assert.doesNotMatch(module, /Adventurer/i);
    }
  });
});
