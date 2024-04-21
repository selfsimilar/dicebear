import assert from 'node:assert';
import { describe, it } from 'node:test';

import { SvgHelper } from '../../lib/helpers/SvgHelper.js';
import { AvatarModel } from '../../lib/models/AvatarModel.js';

describe('SvgHelper', () => {
  it('escape', () => {
    assert.strictEqual(SvgHelper.escape('&'), '&amp;');
    assert.strictEqual(SvgHelper.escape("'"), '&apos;');
    assert.strictEqual(SvgHelper.escape('"'), '&quot;');
    assert.strictEqual(SvgHelper.escape('<'), '&lt;');
    assert.strictEqual(SvgHelper.escape('>'), '&gt;');

    assert.strictEqual(
      SvgHelper.escape('<path d="M0 0"/>'),
      '&lt;path d=&quot;M0 0&quot;/&gt;',
    );
  });

  it('setSize', () => {
    // Square
    const square = new AvatarModel('', new Map([['viewBox', '0 0 100 100']]));

    SvgHelper.setSize(square, 200);

    assert.strictEqual(square.getAttributes().get('width'), '200');
    assert.strictEqual(square.getAttributes().get('height'), '200');

    // Horizontal rectangle
    const horizontalRectangle = new AvatarModel(
      '',
      new Map([['viewBox', '0 0 100 50']]),
    );

    SvgHelper.setSize(horizontalRectangle, 200);

    assert.strictEqual(horizontalRectangle.getAttributes().get('width'), '200');
    assert.strictEqual(
      horizontalRectangle.getAttributes().get('height'),
      '100',
    );

    // Vertical rectangle
    const verticalRectangle = new AvatarModel(
      '',
      new Map([['viewBox', '0 0 50 100']]),
    );

    SvgHelper.setSize(verticalRectangle, 200);

    assert.strictEqual(verticalRectangle.getAttributes().get('width'), '100');
    assert.strictEqual(verticalRectangle.getAttributes().get('height'), '200');
  });

  it('addBackground', () => {
    const avatarModel = new AvatarModel(
      '<body />',
      new Map([['viewBox', '0 0 100 100']]),
    );

    SvgHelper.addBackground(avatarModel, '#ffffff', '#000000', 'solid', 0);

    assert.strictEqual(
      avatarModel.getBody(),
      '<rect fill="#ffffff" width="100" height="100" /><body />',
    );

    SvgHelper.addBackground(
      avatarModel,
      '#ffffff',
      '#000000',
      'gradientLinear',
      90,
    );

    assert.strictEqual(
      avatarModel.getBody(),
      '<rect fill="url(#backgroundLinear)" width="100" height="100" /><defs><linearGradient id="backgroundLinear" gradientTransform="rotate(90 0.5 0.5)"><stop stop-color="#ffffff"/><stop offset="1" stop-color="#000000"/></linearGradient></defs><rect fill="#ffffff" width="100" height="100" /><body />',
    );
  });

  it('addScale', () => {
    const avatarModel = new AvatarModel(
      '<body />',
      new Map([['viewBox', '0 0 100 100']]),
    );

    SvgHelper.addScale(avatarModel, 150);

    assert.strictEqual(
      avatarModel.getBody(),
      '<g transform="translate(-25 -25) scale(1.5)"><body /></g>',
    );
  });

  it('addTranslate(avatar, 50, 50)', () => {
    const avatarModel = new AvatarModel(
      '<body />',
      new Map([['viewBox', '0 0 100 100']]),
    );

    SvgHelper.addTranslate(avatarModel, 50, 50);

    assert.strictEqual(
      avatarModel.getBody(),
      '<g transform="translate(50 50)"><body /></g>',
    );
  });

  it('addTranslate(avatar, 0, 0)', () => {
    const avatarModel = new AvatarModel(
      '<body />',
      new Map([['viewBox', '0 0 100 100']]),
    );

    SvgHelper.addTranslate(avatarModel, 0, 0);

    assert.strictEqual(avatarModel.getBody(), '<body />');
  });

  it('addRotate', () => {
    const avatarModel = new AvatarModel(
      '<body />',
      new Map([['viewBox', '0 0 100 100']]),
    );

    SvgHelper.addRotate(avatarModel, 90);

    assert.strictEqual(
      avatarModel.getBody(),
      '<g transform="rotate(90 50 50)"><body /></g>',
    );
  });

  it('addFlip', () => {
    const avatarModel = new AvatarModel(
      '<body />',
      new Map([['viewBox', '0 0 100 100']]),
    );

    SvgHelper.addFlip(avatarModel);

    assert.strictEqual(
      avatarModel.getBody(),
      '<g transform="scale(-1 1) translate(-100 0)"><body /></g>',
    );
  });

  it('addRadius(avatarModel, 50)', () => {
    const avatarModel = new AvatarModel(
      '<body />',
      new Map([['viewBox', '0 0 100 100']]),
    );

    SvgHelper.addRadius(avatarModel, 50);

    assert.strictEqual(
      avatarModel.getBody(),
      '<mask id="viewboxMask"><rect width="100" height="100" rx="50" ry="50" fill="#fff" /></mask><g mask="url(#viewboxMask)"><body /></g>',
    );
  });

  it('addRadius(avatarModel, 0)', () => {
    const avatarModel = new AvatarModel(
      '<body />',
      new Map([['viewBox', '0 0 100 100']]),
    );

    SvgHelper.addRadius(avatarModel, 0);

    assert.strictEqual(
      avatarModel.getBody(),
      '<mask id="viewboxMask"><rect width="100" height="100" rx="0" ry="0" fill="#fff" /></mask><g mask="url(#viewboxMask)"><body /></g>',
    );
  });

  it('createAttrString', () => {
    const attributes = new Map([
      ['width', '100'],
      ['height', '100'],
      ['fill', '#000000'],
      ['id', 'no-valid-"value">'],
    ]);

    assert.strictEqual(
      SvgHelper.createAttrString(attributes),
      'width="100" height="100" fill="#000000" id="no-valid-&quot;value&quot;&gt;"',
    );
  });

  it('randomizeIds', () => {
    const avatarModel = new AvatarModel(
      '<mask id="viewboxMask"><rect width="100" height="100" rx="512" ry="512" fill="#fff" /></mask><g mask="url(#viewboxMask)"><body /></g>',
      new Map([['viewBox', '0 0 100 100']]),
    );

    SvgHelper.randomizeIds(avatarModel);

    assert.ok(!avatarModel.getBody().includes('viewboxMask'));
  });

  it('replacePlaceholders', () => {
    const avatarModel = new AvatarModel(
      `<text x="50%" y="50%" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'" font-size="50" fill="url(#color-text)" text-anchor="middle" dy="17.8">{{initials}}-{{invalidPlaceholder}}</text>`,
      new Map([['viewBox', '0 0 100 100']]),
      new Map([['initials', 'JD']]),
    );

    SvgHelper.replacePlaceholders(avatarModel);

    assert.strictEqual(
      avatarModel.getBody(),
      `<text x="50%" y="50%" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'" font-size="50" fill="url(#color-text)" text-anchor="middle" dy="17.8">JD-</text>`,
    );
  });
});
