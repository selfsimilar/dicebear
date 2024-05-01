import assert from 'node:assert';
import { describe, it } from 'node:test';

import { createStyle } from '../../lib/index.js';
import { LicenseHelper } from '../../lib/helpers/LicenseHelper.js';

import minimalStyle from '../fixtures/definitions/minimal.json' assert { type: 'json' };

describe('LicenseHelper', () => {
  it('getLicenseAsXml', () => {
    const memorizableStyle = createStyle(minimalStyle);

    assert.equal(
      LicenseHelper.getLicenseAsXml(memorizableStyle),
      '<metadata xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/"><rdf:RDF><rdf:Description><dc:rights>Design by „Unknown”</dc:rights></rdf:Description></rdf:RDF></metadata>',
    );

    assert.equal(
      LicenseHelper.getLicenseAsXml(memorizableStyle),
      '<metadata xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/"><rdf:RDF><rdf:Description><dc:rights>Design by „Unknown”</dc:rights></rdf:Description></rdf:RDF></metadata>',
    );

    assert.equal(
      LicenseHelper.getLicenseAsXml(
        createStyle({
          metadata: {
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
            },
          },
          ...minimalStyle,
        }),
      ),
      '<metadata xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/"><rdf:RDF><rdf:Description><dc:title>Source</dc:title><dc:creator>Creator</dc:creator><dc:source xsi:type="dcterms:URI">https://source.com</dc:source><dcterms:license xsi:type="dcterms:URI">https://license.com</dcterms:license><dc:rights>Remix of „Source” (https://source.com) by „Creator”, licensed under „License” (https://license.com)</dc:rights></rdf:Description></rdf:RDF></metadata>',
    );

    assert.equal(
      LicenseHelper.getLicenseAsXml(
        createStyle({
          metadata: {
            source: {
              name: 'Source',
              url: 'https://source.com',
            },
            license: {
              name: 'License',
              url: 'https://license.com',
            },
          },
          ...minimalStyle,
        }),
      ),
      '<metadata xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/"><rdf:RDF><rdf:Description><dc:title>Source</dc:title><dc:source xsi:type="dcterms:URI">https://source.com</dc:source><dcterms:license xsi:type="dcterms:URI">https://license.com</dcterms:license><dc:rights>Remix of „Source” (https://source.com) by „Unknown”, licensed under „License” (https://license.com)</dc:rights></rdf:Description></rdf:RDF></metadata>',
    );

    assert.equal(
      LicenseHelper.getLicenseAsXml(
        createStyle({
          metadata: {
            source: {
              name: 'Source',
            },
            creator: {
              name: 'Creator',
            },
            license: {
              name: 'License',
            },
          },
          ...minimalStyle,
        }),
      ),
      '<metadata xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/"><rdf:RDF><rdf:Description><dc:title>Source</dc:title><dc:creator>Creator</dc:creator><dc:rights>Remix of „Source” by „Creator”, licensed under „License”</dc:rights></rdf:Description></rdf:RDF></metadata>',
    );
  });

  it('getLicenseAsText', () => {
    const memorizableStyle = createStyle(minimalStyle);

    assert.equal(
      LicenseHelper.getLicenseAsText(memorizableStyle),
      'Design by „Unknown”',
    );

    assert.equal(
      LicenseHelper.getLicenseAsText(memorizableStyle),
      'Design by „Unknown”',
    );

    assert.equal(
      LicenseHelper.getLicenseAsText(
        createStyle({
          metadata: {
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
            },
          },
          ...minimalStyle,
        }),
      ),
      'Remix of „Source” (https://source.com) by „Creator”, licensed under „License” (https://license.com)',
    );

    assert.equal(
      LicenseHelper.getLicenseAsText(
        createStyle({
          metadata: {
            source: {
              name: 'Source',
            },
            creator: {
              name: 'Creator',
            },
            license: {
              name: 'License',
            },
          },
          ...minimalStyle,
        }),
      ),
      'Remix of „Source” by „Creator”, licensed under „License”',
    );

    assert.equal(
      LicenseHelper.getLicenseAsText(
        createStyle({
          metadata: {
            source: {
              name: 'Source',
              url: 'https://source.com',
            },
          },
          ...minimalStyle,
        }),
      ),
      'Remix of „Source” (https://source.com) by „Unknown”',
    );

    assert.equal(
      LicenseHelper.getLicenseAsText(
        createStyle({
          metadata: {
            source: {
              url: 'https://source.com',
            },
            creator: {
              url: 'https://creator.com',
            },
            license: {
              url: 'https://license.com',
            },
          },
          ...minimalStyle,
        }),
      ),
      'Design (https://source.com) by „Unknown”',
    );

    assert.equal(
      LicenseHelper.getLicenseAsText(
        createStyle({
          metadata: {
            source: {
              name: 'Source',
            },
            creator: {
              name: 'DiceBear',
            },
            license: {
              name: 'MIT',
            },
          },
          ...minimalStyle,
        }),
      ),
      '„Source” by „DiceBear”, licensed under „MIT”',
    );

    assert.equal(
      LicenseHelper.getLicenseAsText(
        createStyle({
          metadata: {
            creator: {
              name: 'DiceBear',
            },
            license: {
              name: 'MIT',
            },
          },
          ...minimalStyle,
        }),
      ),
      'Design by „DiceBear”, licensed under „MIT”',
    );
  });
});
