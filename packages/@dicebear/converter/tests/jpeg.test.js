import assert from 'node:assert';
import { describe, it } from 'node:test';

import { toJpeg } from '../lib/node/index.js';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const avatar = fs.readFileSync(path.resolve(__dirname, 'fixtures/avatar.svg'), {
  encoding: 'utf8',
});

describe('jpeg', () => {
  it(`Convert to jpeg buffer`, async () => {
    assert.doesNotThrow(() => toJpeg(avatar).toArrayBuffer());
  });

  it(`Convert to jpeg data uri`, async () => {
    assert.doesNotThrow(() => toJpeg(avatar).toDataUri());
  });
});
