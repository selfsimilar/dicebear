import { existsSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';

export class Filesystem {
  static async ensureDir(path: string) {
    if (!existsSync(path)) {
      await mkdir(path, { recursive: true });
    }
  }
}
