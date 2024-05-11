import assert from 'node:assert';
import { describe, it } from 'node:test';

import { LicenseHelper } from '../../lib/helpers/LicenseHelper.js';

import minimalDefinition from '../fixtures/definitions/json/minimal.json' with { type: 'json' };

describe('LicenseHelper', () => {
  it('getLicenseAsXml', () => {
    assert.equal(
      LicenseHelper.getLicenseAsXml(minimalDefinition.metadata ?? {}),
      '<metadata xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/"><rdf:RDF><rdf:Description></rdf:Description></rdf:RDF></metadata>',
    );

    assert.equal(
      LicenseHelper.getLicenseAsXml(minimalDefinition.metadata ?? {}),
      '<metadata xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/"><rdf:RDF><rdf:Description></rdf:Description></rdf:RDF></metadata>',
    );

    assert.equal(
      LicenseHelper.getLicenseAsXml({
        source: {
          name: 'Source',
          url: 'https://source.com',
        },
        creator: {
          name: 'Creator',
          url: 'https://creator.com',
        },
        license: {
          name: 'License',
          url: 'https://license.com',
          text: 'Remix of „Source” (https://source.com) by „Creator”, licensed under „License” (https://license.com)',
        },
      }),
      '<metadata xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/"><rdf:RDF><rdf:Description><dc:title>Source</dc:title><dc:creator>Creator</dc:creator><dc:source xsi:type="dcterms:URI">https://source.com</dc:source><dcterms:license xsi:type="dcterms:URI">https://license.com</dcterms:license><dc:rights>Remix of „Source” (https://source.com) by „Creator”, licensed under „License” (https://license.com)</dc:rights></rdf:Description></rdf:RDF></metadata>',
    );

    assert.equal(
      LicenseHelper.getLicenseAsXml({
        source: {
          name: 'Source',
          url: 'https://source.com',
        },
        license: {
          name: 'License',
          url: 'https://license.com',
          text: 'Remix of „Source” (https://source.com) by „Unknown”, licensed under „License” (https://license.com)',
        },
      }),
      '<metadata xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/"><rdf:RDF><rdf:Description><dc:title>Source</dc:title><dc:source xsi:type="dcterms:URI">https://source.com</dc:source><dcterms:license xsi:type="dcterms:URI">https://license.com</dcterms:license><dc:rights>Remix of „Source” (https://source.com) by „Unknown”, licensed under „License” (https://license.com)</dc:rights></rdf:Description></rdf:RDF></metadata>',
    );

    assert.equal(
      LicenseHelper.getLicenseAsXml({
        source: {
          name: 'Source',
        },
        creator: {
          name: 'Creator',
        },
        license: {
          name: 'License',
        },
      }),
      '<metadata xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/"><rdf:RDF><rdf:Description><dc:title>Source</dc:title><dc:creator>Creator</dc:creator></rdf:Description></rdf:RDF></metadata>',
    );
  });
});
