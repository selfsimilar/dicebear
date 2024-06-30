import assert from 'node:assert';
import { describe, it } from 'node:test';

import { toPng } from '../lib/node/index.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const avatar = fs.readFileSync(path.resolve(__dirname, 'fixtures/avatar.svg'), {
  encoding: 'utf8',
});

describe('png', () => {
  it(`Convert to png buffer`, async () => {
    assert.doesNotThrow(() => toPng(avatar).toArrayBuffer());
  });

  it(`Convert to png data uri`, async () => {
    assert.doesNotThrow(() => toPng(avatar).toDataUri());
  });
});
