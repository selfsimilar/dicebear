import type { Style } from '@dicebear/core';
import chalk from 'chalk';
import chalkTemplate from 'chalk-template';

export function outputStyleLicenseBanner(name: string, style: Style<unknown>) {
  const banner = ['-'.repeat(64)];

  if (style.meta.source?.name && style.meta.creator?.name) {
    banner.push(
      chalkTemplate`{bold ${style.meta.source.name}} by {bold ${style.meta.creator.name}}`,
    );
  } else if (style.meta.source?.name) {
    banner.push(chalkTemplate`{bold ${style.meta.source.name}}`);
  } else if (style.meta.creator?.name) {
    banner.push(
      chalkTemplate`{bold ${name}} by {bold ${style.meta.creator.name}}`,
    );
  }

  banner.push('');

  if (style.meta.creator?.url) {
    banner.push(`Homepage: ${style.meta.creator.url}`);
  }

  if (style.meta.source?.url) {
    banner.push(`Source: ${style.meta.source.url}`);
  }

  if (style.meta.license) {
    banner.push(
      `License: ${style.meta.license.name ?? 'Unknown'} - ${style.meta.license.url}`,
    );
  }

  banner.push('-'.repeat(64));
  banner.push('');

  console.log(chalk.blueBright(banner.join('\n')));
}
