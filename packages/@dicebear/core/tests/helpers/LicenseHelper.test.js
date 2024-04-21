import assert from 'node:assert';
import { describe, it } from 'node:test';

import { LicenseHelper } from '../../lib/helpers/LicenseHelper.js';

describe('LicenseHelper', () => {
  it('xml', () => {
    assert.equal(
      LicenseHelper.xml({}),
      '<metadata xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/"><rdf:RDF><rdf:Description><dc:rights>Design by „Unknown”</dc:rights></rdf:Description></rdf:RDF></metadata>',
    );

    assert.equal(
      LicenseHelper.xml({
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
      }),
      '<metadata xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/"><rdf:RDF><rdf:Description><dc:title>Source</dc:title><dc:creator>Creator</dc:creator><dc:source xsi:type="dcterms:URI">https://source.com</dc:source><dcterms:license xsi:type="dcterms:URI">https://license.com</dcterms:license><dc:rights>Remix of „Source” (https://source.com) by „Creator”, licensed under „License” (https://license.com)</dc:rights></rdf:Description></rdf:RDF></metadata>',
    );

    assert.equal(
      LicenseHelper.xml({
        source: {
          name: 'Source',
          url: 'https://source.com',
        },
        license: {
          name: 'License',
          url: 'https://license.com',
        },
      }),
      '<metadata xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/"><rdf:RDF><rdf:Description><dc:title>Source</dc:title><dc:source xsi:type="dcterms:URI">https://source.com</dc:source><dcterms:license xsi:type="dcterms:URI">https://license.com</dcterms:license><dc:rights>Remix of „Source” (https://source.com) by „Unknown”, licensed under „License” (https://license.com)</dc:rights></rdf:Description></rdf:RDF></metadata>',
    );

    assert.equal(
      LicenseHelper.xml({
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
      '<metadata xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/"><rdf:RDF><rdf:Description><dc:title>Source</dc:title><dc:creator>Creator</dc:creator><dc:rights>Remix of „Source” by „Creator”, licensed under „License”</dc:rights></rdf:Description></rdf:RDF></metadata>',
    );
  });

  it('text', () => {
    assert.equal(
      LicenseHelper.text({
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
      }),
      'Remix of „Source” (https://source.com) by „Creator”, licensed under „License” (https://license.com)',
    );

    assert.equal(
      LicenseHelper.text({
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
      'Remix of „Source” by „Creator”, licensed under „License”',
    );

    assert.equal(
      LicenseHelper.text({
        source: {
          name: 'Source',
          url: 'https://source.com',
        },
      }),
      'Remix of „Source” (https://source.com) by „Unknown”',
    );

    assert.equal(
      LicenseHelper.text({
        source: {
          url: 'https://source.com',
        },
        creator: {
          url: 'https://creator.com',
        },
        license: {
          url: 'https://license.com',
        },
      }),
      'Design (https://source.com) by „Unknown”',
    );

    assert.equal(LicenseHelper.text({}), 'Design by „Unknown”');

    assert.equal(
      LicenseHelper.text({
        source: {
          name: 'Source',
        },
        creator: {
          name: 'DiceBear',
        },
        license: {
          name: 'MIT',
        },
      }),
      '„Source” by „DiceBear”, licensed under „MIT”',
    );

    assert.equal(
      LicenseHelper.text({
        creator: {
          name: 'DiceBear',
        },
        license: {
          name: 'MIT',
        },
      }),
      'Design by „DiceBear”, licensed under „MIT”',
    );
  });
});
