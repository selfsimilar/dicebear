import { DefinitionMetadata } from '../types.js';
import { SvgHelper } from './SvgHelper.js';

export class LicenseHelper {
  static getLicenseAsXml(
    metadata: Exclude<DefinitionMetadata, undefined>,
  ): string {
    const sourceName = metadata.source?.name;
    const sourceUrl = metadata.source?.url;
    const creatorName = metadata.creator?.name;
    const licenseUrl = metadata.license?.url;
    const licenseText = metadata.license?.text;

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
      (licenseText
        ? `<dc:rights>${SvgHelper.escape(licenseText)}</dc:rights>`
        : '') +
      '</rdf:Description>' +
      '</rdf:RDF>' +
      '</metadata>'
    );
  }
}
