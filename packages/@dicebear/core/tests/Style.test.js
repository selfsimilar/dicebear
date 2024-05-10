import assert from 'node:assert';
import { describe, it } from 'node:test';

import { createStyle } from '../lib/index.js';

import initialsDefinition from './fixtures/definitions/loader/initials.cjs';

describe('Style', () => {
  const initialsStyle = createStyle(initialsDefinition);

  it('getMetadata', () => {
    assert.deepStrictEqual(initialsStyle.getMetadata(), {
      license: {
        name: 'CC0 1.0',
        url: 'https://creativecommons.org/publicdomain/zero/1.0/',
        text: '„Initials”, licensed under „CC0 1.0” (https://creativecommons.org/publicdomain/zero/1.0/)',
      },
    });
  });

  it('getBody', () => {
    assert.deepStrictEqual(initialsStyle.getBody(), {
      content:
        "<text x=\"50%\" y=\"50%\" font-family=\"system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'\" font-size=\"50\" fill=\"url(#color-text)\" text-anchor=\"middle\" dy=\"17.8\">{{initials}}</text>",
      width: 100,
      height: 100,
    });
  });

  it('getAttributes', () => {
    assert.deepStrictEqual(initialsStyle.getAttributes(), []);
  });

  it('getComponents', () => {
    assert.deepStrictEqual(initialsStyle.getComponents(), []);
  });

  it('getColors', () => {
    assert.deepStrictEqual(initialsStyle.getColors(), [
      {
        name: 'background',
        values: [
          'c44f4f',
          'ac6039',
          '8e6e2f',
          '777728',
          '627e2a',
          '48822b',
          '2d862d',
          '2b8248',
          '2b8265',
          '2a7e7e',
          '347a9d',
          '4b73c3',
          '6a6acd',
          '825ec9',
          '9f53c6',
          'bb3ebb',
          'c14497',
          'c34b73',
        ],
      },
      {
        name: 'text',
        values: ['ffffff', '000000'],
        contrastTo: 'background',
      },
    ]);
  });
});
