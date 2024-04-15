import { Metadata } from '../types.js';
import { SvgHelper } from './SvgHelper.js';

export class LicenseHelper {
  static xml(metadata: Metadata): string {
    const sourceName = metadata.source?.name;
    const sourceUrl = metadata.source?.url;
    const creatorName = metadata.creator?.name;
    const licenseUrl = metadata.license?.url;
    const copyright = LicenseHelper.text(metadata);

    if (
      !sourceName &&
      !creatorName &&
      !sourceUrl &&
      !licenseUrl &&
      !copyright
    ) {
      return '';
    }

    // https://nsteffel.github.io/dublin_core_generator/generator.html
    return (
      '<metadata' +
      ' xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"' +
      ' xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"' +
      ' xmlns:dc="http://purl.org/dc/elements/1.1/"' +
      ' xmlns:dcterms="http://purl.org/dc/terms/">' +
      '<rdf:RDF>' +
      '<rdf:Description>' +
      (sourceName
        ? `<dc:title>${SvgHelper.escape(sourceName)}</dc:title>`
        : '') +
      (creatorName
        ? `<dc:creator>${SvgHelper.escape(creatorName)}</dc:creator>`
        : '') +
      (sourceUrl
        ? `<dc:source xsi:type="dcterms:URI">${SvgHelper.escape(sourceUrl)}</dc:source>`
        : '') +
      (licenseUrl
        ? `<dcterms:license xsi:type="dcterms:URI">${SvgHelper.escape(
            licenseUrl,
          )}</dcterms:license>`
        : '') +
      (copyright
        ? `<dc:rights>${SvgHelper.escape(copyright)}</dc:rights>`
        : '') +
      '</rdf:Description>' +
      '</rdf:RDF>' +
      '</metadata>'
    );
  }

  static text(metadata: Metadata): string {
    let title = metadata.source?.name ? `„${metadata.source?.name}”` : 'Design';
    const creator = `„${metadata.creator?.name ?? 'Unknown'}”`;

    if (metadata.source) {
      title += ` (${metadata.source})`;
    }

    let result = '';

    if (
      metadata.license?.name !== 'MIT' &&
      metadata.creator?.name !== 'DiceBear' &&
      metadata.source?.name
    ) {
      result += 'Remix of ';
    }

    result += `${title} by ${creator}`;

    if (metadata.license?.name) {
      result += `, licensed under „${metadata.license?.name}”`;

      if (metadata.license?.url) {
        result += ` (${metadata.license.url})`;
      }
    }

    return result;
  }
}
