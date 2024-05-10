import { glob } from 'glob';
import { dirname, join, basename } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { pascalCase } from 'change-case';
import { ensureDir } from 'fs-extra';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const targetPath = join(__dirname, '..', 'lib');

const definitionPackagePath = new URL(
  dirname(import.meta.resolve('@dicebear/definitions/package.json')),
).pathname;

// find all definition files
const definitionFileList = (
  await glob('src/*.json', {
    cwd: definitionPackagePath,
  })
).sort((a, b) => a.localeCompare(b));

// Index file
const indexTarget = join(targetPath, 'index.js');
let indexContent = '';

for (const definitionFile of definitionFileList) {
  const styleName = basename(definitionFile, '.json');
  const className = pascalCase(styleName);

  // Index file
  indexContent += `export * from './styles/${className}.js';\n`;

  // Definition loader
  const definitionLoaderTarget = join(targetPath, 'loader', `${styleName}.cjs`);
  const definitionLoaderContent = `export default require('@dicebear/definitions/${definitionFile}');`;

  await ensureDir(dirname(definitionLoaderTarget));
  await writeFile(definitionLoaderTarget, definitionLoaderContent);

  // Style class
  const styleClassTarget = join(targetPath, 'styles', `${className}.js`);
  const styleClassContent = `import { Style } from '@dicebear/core';
import definition from '../loader/${styleName}.cjs';

export class ${className} extends Style {
  constructor() {
    super(definition);
  }
}
`;

  await ensureDir(dirname(styleClassTarget));
  await writeFile(styleClassTarget, styleClassContent);
}

await writeFile(indexTarget, indexContent);
