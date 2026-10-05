import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const asset = (name) => readFileSync(new URL(`../public/${name}`, import.meta.url));
const pngSignature = '89504e470d0a1a0a';

test('the logo and favicon share the approved double-storey a outline', () => {
  const logo = asset('logo.svg').toString();
  const favicon = asset('favicon.svg').toString();
  const glyph = /<path\b[^>]*\bd="([^"]+)"/;

  assert.match(logo, /Triple A - Assier Anteneh Alemu/);
  assert.equal(logo.match(/<use\b/g)?.length, 3);
  assert.match(logo, /x="112" fill="#aa3518"/);
  assert.ok(logo.match(glyph)?.[1]);
  assert.equal(logo.match(glyph)[1], favicon.match(glyph)?.[1]);
  assert.equal(favicon.match(/<circle\b/g)?.length, 3);
  assert.match(favicon, /fill="#f3f2ed"/);
  assert.doesNotMatch(logo + favicon, /<(?:script|image|filter|linearGradient|radialGradient)\b/);
});

test('browser, touch, and installed-app PNGs retain their declared dimensions', () => {
  for (const [name, size] of [
    ['favicon-16x16.png', 16],
    ['favicon-32x32.png', 32],
    ['apple-touch-icon.png', 180],
    ['android-chrome-192x192.png', 192],
    ['android-chrome-512x512.png', 512],
  ]) {
    const png = asset(name);
    assert.equal(png.subarray(0, 8).toString('hex'), pngSignature, name);
    assert.equal(png.readUInt32BE(16), size, name);
    assert.equal(png.readUInt32BE(20), size, name);
  }
});

test('the ICO fallback contains complete 16px, 32px, and 48px PNG frames', () => {
  const ico = asset('favicon.ico');
  assert.equal(ico.readUInt16LE(0), 0);
  assert.equal(ico.readUInt16LE(2), 1);
  assert.equal(ico.readUInt16LE(4), 3);

  for (const [index, size] of [16, 32, 48].entries()) {
    const entry = 6 + index * 16;
    const length = ico.readUInt32LE(entry + 8);
    const offset = ico.readUInt32LE(entry + 12);
    assert.equal(ico[entry], size);
    assert.equal(ico[entry + 1], size);
    assert.ok(length > 24 && offset >= 54 && offset + length <= ico.length);
    assert.equal(ico.subarray(offset, offset + 8).toString('hex'), pngSignature);
    assert.equal(ico.readUInt32BE(offset + 16), size);
    assert.equal(ico.readUInt32BE(offset + 20), size);
  }
});

test('the document and install manifest reference the refreshed local icon set', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const manifest = JSON.parse(asset('site.webmanifest').toString());
  const icons = [...html.matchAll(/<link rel="(?:icon|apple-touch-icon)"[^>]* href="([^"]+)"/g)];

  assert.equal(icons.length, 5);
  assert.match(html, /type="image\/svg\+xml" sizes="any"/);
  assert.match(html, /href="\/site\.webmanifest\?v=triple-a"/);
  assert.ok(manifest.name.startsWith('Assier Anteneh Alemu'));
  assert.equal(manifest.short_name, 'Triple A');
  assert.deepEqual(manifest.icons.map(({ sizes }) => sizes), ['192x192', '512x512']);
  for (const src of [...icons.map((match) => match[1]), ...manifest.icons.map((icon) => icon.src)]) {
    assert.ok(src.startsWith('/'));
    assert.ok(src.endsWith('?v=triple-a'));
    assert.ok(asset(src.slice(1).split('?')[0]).length > 0);
  }
});
