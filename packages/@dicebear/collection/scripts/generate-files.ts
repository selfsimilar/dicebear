import type { StyleDefinition } from '@dicebear/core';
import { glob } from 'glob';
import { dirname, join } from 'node:path';
import { readFile, rm, mkdir, writeFile } from 'node:fs/promises';
import { camelCase, pascalCase } from 'change-case';
import {
  OptionalKind,
  Project,
  PropertySignatureStructure,
  VariableDeclarationKind,
} from 'ts-morph';

const definitionUrl = new URL(
  dirname(import.meta.resolve('@dicebear/definitions/package.json')),
);
const definitionPath = join(definitionUrl.pathname, 'src');

// empty definition path
const targetPath = join(import.meta.dirname, '..', 'src');

await rm(targetPath, { recursive: true });
await mkdir(targetPath);

// find all definition files
const definitionFiles = (
  await glob('*.json', {
    cwd: definitionPath,
  })
).sort((a, b) => a.localeCompare(b));

// generate files
const project = new Project();

await Promise.all(
  definitionFiles.map(async (file) => {
    const content = await readFile(join(definitionPath, file), {
      encoding: 'utf-8',
    });
    const name = file.replace('.json', '');

    const definition = JSON.parse(content) as StyleDefinition;

    const sourceFile = project.createSourceFile(join(targetPath, `${name}.ts`));

    sourceFile.addImportDeclaration({
      moduleSpecifier: '@dicebear/core',
      namedImports: ['createStyle', 'StyleDefinition'],
    });

    sourceFile.addImportDeclaration({
      moduleSpecifier: `@dicebear/definitions/${name}.json`,
      defaultImport: 'definition',
      attributes: [{ name: 'type', value: 'json' }],
    });

    sourceFile.addInterface({
      name: `${pascalCase(name)}Options`,
      properties: [
        ...(definition.components?.reduce<
          OptionalKind<PropertySignatureStructure>[]
        >((acc, component) => {
          let values = component.values
            .map((value) => value.name)
            .sort((a, b) => a.localeCompare(b))
            .map((name) => `'${name}'`)
            .join(' | ');

          let result = [
            ...acc,
            {
              name: component.name,
              type: `Array<${values}>`,
              hasQuestionToken: true,
            },
          ];

          if (component.offset) {
            result.push({
              name: `${component.name}Offset`,
              type: 'number',
              hasQuestionToken: true,
            });
          }

          if (component.probability) {
            result.push({
              name: `${component.name}Probability`,
              type: 'number',
              hasQuestionToken: true,
            });
          }

          if (component.rotation) {
            result.push({
              name: `${component.name}Rotation`,
              type: '[number, number]',
              hasQuestionToken: true,
            });
          }

          return result;
        }, []) ?? []),
        ...(definition.colors
          ?.map((color) => {
            return {
              name: `${color.name}Color`,
              type: 'string[]',
            };
          })
          .filter((v) => v.name !== 'backgroundColor') ?? []),
      ],
    });

    sourceFile.addVariableStatement({
      declarationKind: VariableDeclarationKind.Const,
      declarations: [
        {
          name: camelCase(name),
          initializer: `createStyle<${pascalCase(name)}Options>(definition as StyleDefinition)`,
        },
      ],
    });

    sourceFile.addExportDeclaration({
      namedExports: [camelCase(name)],
    });

    await sourceFile.save();
  }),
);

// generate index file
const indexSourceFile = project.createSourceFile(join(targetPath, 'index.ts'));

for (const file of definitionFiles) {
  const name = file.replace('.json', '');

  indexSourceFile.addExportDeclaration({
    moduleSpecifier: `./${name}.js`,
  });
}

await indexSourceFile.save();

// generate async file
const asyncSourceFile = project.createSourceFile(join(targetPath, 'async.ts'));

for (const file of definitionFiles) {
  const name = file.replace('.json', '');

  asyncSourceFile.addVariableStatement({
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: camelCase(name),
        initializer: `() => import('./${name}.js')`,
      },
    ],
  });
}

asyncSourceFile.addExportDeclaration({
  namedExports: definitionFiles.map((file) =>
    camelCase(file.replace('.json', '')),
  ),
});

await asyncSourceFile.save();
