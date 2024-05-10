import { glob } from 'glob';
import { dirname, join, basename } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';
import { pascalCase } from 'change-case';
import { ensureDir } from 'fs-extra';
import { fileURLToPath } from 'node:url';
import { Definition } from '@dicebear/core';

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
const indexTarget = join(targetPath, 'index.d.ts');
let indexContent = '';

for (const definitionFile of definitionFileList) {
  const styleName = basename(definitionFile, '.json');
  const className = pascalCase(styleName);

  // Index file
  indexContent += `export * from './styles/${className}.js';\n`;

  // Definition loader
  const definitionLoaderTarget = join(
    targetPath,
    'loader',
    `${styleName}.d.cts`,
  );
  const definitionLoaderContent = `import type { Definition } from '@dicebear/core';

declare const definition: Definition;

module.exports = definition;`;

  await ensureDir(dirname(definitionLoaderTarget));
  await writeFile(definitionLoaderTarget, definitionLoaderContent);

  // Type properties
  const typeProperties: string[] = [];
  const definition = JSON.parse(
    await readFile(join(definitionPackagePath, definitionFile), {
      encoding: 'utf-8',
    }),
  ) as Definition;

  for (const component of definition.components ?? []) {
    const values = component.values
      .map((value) => value.name)
      .sort((a, b) => a.localeCompare(b))
      .map((name) => `'${name}'`)
      .join(' | ');

    typeProperties.push(`${component.name}?: Array<${values}>;`);

    if (component.offset) {
      typeProperties.push(`${component.name}Offset?: number;`);
    }

    if (component.probability) {
      typeProperties.push(`${component.name}Probability?: number;`);
    }

    if (component.rotation) {
      typeProperties.push(`${component.name}Rotation?: [number, number];`);
    }
  }

  for (const color of definition.colors ?? []) {
    if (color.name === 'background') {
      continue;
    }

    typeProperties.push(`${color.name}Color?: string[];`);
  }

  // Style class
  const styleClassTarget = join(targetPath, 'styles', `${className}.d.ts`);
  const styleClassContent = `import { Style } from '@dicebear/core';

type ${className}Options = {
  ${typeProperties.join('\n  ').trim()}
};

export declare class ${className} extends Style<${className}Options> {
  constructor();
}
`;

  await ensureDir(dirname(styleClassTarget));
  await writeFile(styleClassTarget, styleClassContent);
}

await writeFile(indexTarget, indexContent);
