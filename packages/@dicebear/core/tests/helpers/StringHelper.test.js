import assert from 'node:assert';
import { describe, it } from 'node:test';

import { StringHelper } from '../../lib/helpers/StringHelper.js';

describe('StringHelper', () => {
  it('getInitials', () => {
    assert.equal(StringHelper.getInitials(''), '');
    assert.equal(StringHelper.getInitials('B.K.'), 'BK');
    assert.equal(StringHelper.getInitials('Ben'), 'BE');
    assert.equal(StringHelper.getInitials('Shanya Wilkes'), 'SW');
    assert.equal(StringHelper.getInitials('Marlena Astrid Staton'), 'MS');
    assert.equal(StringHelper.getInitials('Joel Z. Monahan'), 'JM');
    assert.equal(StringHelper.getInitials('John C. McClure'), 'JM');
    assert.equal(StringHelper.getInitials('Marie-Louise Forster'), 'MF');
    assert.equal(StringHelper.getInitials('Marie-Louise'), 'MA');
    assert.equal(StringHelper.getInitials('m.forster@example.com'), 'MF');
    assert.equal(StringHelper.getInitials('ma.forster@example.com'), 'MA');
    assert.equal(StringHelper.getInitials('Łukasz'), 'ŁU');
    assert.equal(StringHelper.getInitials('Łukasz Łukasz'), 'ŁŁ');
    assert.equal(StringHelper.getInitials('👩🏽‍💻❤️ 💐'), '');
  });
});
