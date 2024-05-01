import assert from 'node:assert';
import { describe, it } from 'node:test';

import { Core, Style } from '../lib/index.js';

import initials from './fixtures/definitions/initials.json' assert { type: 'json' };
import { Struct } from 'superstruct';
import { Prng } from '../lib/Prng.js';
import { AvatarModel } from '../lib/models/AvatarModel.js';

describe('Core', () => {
  it('initials', () => {
    const style = Style.fromDefinition(initials);
    const avatar = Core.createAvatar(style, {
      seed: 'John Doe',
    });

    assert.equal(avatar.getProperties().get('initials'), 'JD');
    assert.equal(avatar.getProperties().get('seed'), 'John Doe');

    assert.deepEqual(avatar.getMetadata(), {
      creator: {
        name: 'DiceBear',
        url: 'https://www.dicebear.com',
      },
      license: {
        name: 'CC0 1.0',
        url: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
      source: {
        name: 'DiceBear',
        url: 'https://www.dicebear.com',
      },
    });

    assert.equal(
      avatar.toString(),
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><metadata xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/"><rdf:RDF><rdf:Description><dc:title>DiceBear</dc:title><dc:creator>DiceBear</dc:creator><dc:source xsi:type="dcterms:URI">https://www.dicebear.com</dc:source><dcterms:license xsi:type="dcterms:URI">https://creativecommons.org/publicdomain/zero/1.0/</dcterms:license><dc:rights>„DiceBear” (https://www.dicebear.com) by „DiceBear”, licensed under „CC0 1.0” (https://creativecommons.org/publicdomain/zero/1.0/)</dc:rights></rdf:Description></rdf:RDF></metadata><mask id="viewboxMask"><rect width="100" height="100" rx="0" ry="0" fill="#fff" /></mask><g mask="url(#viewboxMask)"><rect fill="#f538b6" width="100" height="100" /><g transform="rotate(360 50 50)"><defs><linearGradient id="color-text"><stop stop-color="#000000"/></linearGradient></defs><text x="50%" y="50%" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'" font-size="50" fill="url(#color-text)" text-anchor="middle" dy="17.8">JD</text></g></g></svg>`,
    );

    assert.equal(
      avatar.toDataUri(),
      `data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Cmetadata%20xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%20xmlns%3Axsi%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema-instance%22%20xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%20xmlns%3Adcterms%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%22%3E%3Crdf%3ARDF%3E%3Crdf%3ADescription%3E%3Cdc%3Atitle%3EDiceBear%3C%2Fdc%3Atitle%3E%3Cdc%3Acreator%3EDiceBear%3C%2Fdc%3Acreator%3E%3Cdc%3Asource%20xsi%3Atype%3D%22dcterms%3AURI%22%3Ehttps%3A%2F%2Fwww.dicebear.com%3C%2Fdc%3Asource%3E%3Cdcterms%3Alicense%20xsi%3Atype%3D%22dcterms%3AURI%22%3Ehttps%3A%2F%2Fcreativecommons.org%2Fpublicdomain%2Fzero%2F1.0%2F%3C%2Fdcterms%3Alicense%3E%3Cdc%3Arights%3E%E2%80%9EDiceBear%E2%80%9D%20(https%3A%2F%2Fwww.dicebear.com)%20by%20%E2%80%9EDiceBear%E2%80%9D%2C%20licensed%20under%20%E2%80%9ECC0%201.0%E2%80%9D%20(https%3A%2F%2Fcreativecommons.org%2Fpublicdomain%2Fzero%2F1.0%2F)%3C%2Fdc%3Arights%3E%3C%2Frdf%3ADescription%3E%3C%2Frdf%3ARDF%3E%3C%2Fmetadata%3E%3Cmask%20id%3D%22viewboxMask%22%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20rx%3D%220%22%20ry%3D%220%22%20fill%3D%22%23fff%22%20%2F%3E%3C%2Fmask%3E%3Cg%20mask%3D%22url(%23viewboxMask)%22%3E%3Crect%20fill%3D%22%23f538b6%22%20width%3D%22100%22%20height%3D%22100%22%20%2F%3E%3Cg%20transform%3D%22rotate(360%2050%2050)%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22color-text%22%3E%3Cstop%20stop-color%3D%22%23000000%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22system-ui%2C%20-apple-system%2C%20'Segoe%20UI'%2C%20Roboto%2C%20'Helvetica%20Neue'%2C%20'Noto%20Sans'%2C%20'Liberation%20Sans'%2C%20Arial%2C%20sans-serif%2C%20'Apple%20Color%20Emoji'%2C%20'Segoe%20UI%20Emoji'%2C%20'Segoe%20UI%20Symbol'%2C%20'Noto%20Color%20Emoji'%22%20font-size%3D%2250%22%20fill%3D%22url(%23color-text)%22%20text-anchor%3D%22middle%22%20dy%3D%2217.8%22%3EJD%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E`,
    );

    assert.equal(
      avatar.toJson(),
      `{"svg":"<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 100 100\\"><metadata xmlns:rdf=\\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\\" xmlns:xsi=\\"http://www.w3.org/2001/XMLSchema-instance\\" xmlns:dc=\\"http://purl.org/dc/elements/1.1/\\" xmlns:dcterms=\\"http://purl.org/dc/terms/\\"><rdf:RDF><rdf:Description><dc:title>DiceBear</dc:title><dc:creator>DiceBear</dc:creator><dc:source xsi:type=\\"dcterms:URI\\">https://www.dicebear.com</dc:source><dcterms:license xsi:type=\\"dcterms:URI\\">https://creativecommons.org/publicdomain/zero/1.0/</dcterms:license><dc:rights>„DiceBear” (https://www.dicebear.com) by „DiceBear”, licensed under „CC0 1.0” (https://creativecommons.org/publicdomain/zero/1.0/)</dc:rights></rdf:Description></rdf:RDF></metadata><mask id=\\"viewboxMask\\"><rect width=\\"100\\" height=\\"100\\" rx=\\"0\\" ry=\\"0\\" fill=\\"#fff\\" /></mask><g mask=\\"url(#viewboxMask)\\"><rect fill=\\"#f538b6\\" width=\\"100\\" height=\\"100\\" /><g transform=\\"rotate(360 50 50)\\"><defs><linearGradient id=\\"color-text\\"><stop stop-color=\\"#000000\\"/></linearGradient></defs><text x=\\"50%\\" y=\\"50%\\" font-family=\\"system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'\\" font-size=\\"50\\" fill=\\"url(#color-text)\\" text-anchor=\\"middle\\" dy=\\"17.8\\">JD</text></g></g></svg>","metadata":{"license":{"name":"CC0 1.0","url":"https://creativecommons.org/publicdomain/zero/1.0/"},"creator":{"name":"DiceBear","url":"https://www.dicebear.com"},"source":{"name":"DiceBear","url":"https://www.dicebear.com"}},"properties":[["initials","JD"],["seed","John Doe"],["flip",false],["rotate",360],["scale",100],["radius",0],["size",null],["backgroundColor",["#f538b6","#0ca2ed"]],["backgroundType","solid"],["backgroundRotation",159],["translateX",0],["translateY",0],["clip",true],["randomizeIds",false],["textColor","000000"]]}`,
    );
  });
});
