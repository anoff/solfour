import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(join(root, 'data/games.json'), 'utf8'));
const tokens = JSON.parse(readFileSync(join(root, 'data/tokens.json'), 'utf8'));
const css = readFileSync(join(root, 'src/styles/global.css'), 'utf8');

const hex = /^#[0-9A-Fa-f]{6}$/;
const plannedSubdomains = [
  'areoid.solfour.app',
  'prospectors.solfour.app',
  'domes.solfour.app',
  'tharsis.solfour.app',
];

test('games.json has studio fields and four games', () => {
  assert.equal(typeof data.studio.name, 'string');
  assert.equal(data.studio.wordmark, 'SOL FOUR');
  assert.equal(typeof data.studio.tagline, 'string');
  assert.equal(typeof data.studio.taglineStatus, 'string');
  assert.ok(Array.isArray(data.games));
  assert.equal(data.games.length, 4);
});

test('each game has the required shape', () => {
  for (const game of data.games) {
    assert.equal(typeof game.slug, 'string');
    assert.ok(game.slug.length > 0);
    assert.equal(typeof game.name, 'string');
    assert.ok(hex.test(game.signature), `${game.slug} signature`);
    assert.ok(game.url === null || typeof game.url === 'string');
    assert.equal(typeof game.urlStatus, 'string');
    if (typeof game.url === 'string') {
      const url = new URL(game.url);
      assert.equal(url.protocol, 'https:');
      assert.ok(
        !plannedSubdomains.includes(url.host),
        `${game.slug} must not use a planned CI host that is not live`,
      );
    }
  }
});

test('Areoid is a live playable card at areoid.anoff.io', () => {
  const areoid = data.games.find((game) => game.slug === 'areoid');
  assert.ok(areoid);
  assert.equal(areoid.urlStatus, 'live');
  assert.equal(typeof areoid.url, 'string');
  const url = new URL(areoid.url);
  assert.equal(url.protocol, 'https:');
  assert.equal(url.hostname, 'areoid.anoff.io');
});

test('Tharsis stays TODO until a live URL is confirmed', () => {
  const tharsis = data.games.find((game) => game.slug === 'tharsis');
  assert.ok(tharsis);
  assert.equal(tharsis.url, null);
  assert.equal(tharsis.urlStatus, 'TODO');
});

test('Tailwind theme hexes match data/tokens.json', () => {
  const expected = {
    cream: tokens.color.cream.hex.toLowerCase(),
    ink: tokens.color.ink.hex.toLowerCase(),
    rust: tokens.color.rust.hex.toLowerCase(),
    areoid: tokens.signatures.areoid.hex.toLowerCase(),
    prospectors: tokens.signatures.prospectors.hex.toLowerCase(),
    domes: tokens.signatures.domes.hex.toLowerCase(),
    tharsis: tokens.signatures.tharsis.hex.toLowerCase(),
  };
  const haystack = css.toLowerCase();
  for (const [name, value] of Object.entries(expected)) {
    const needle = `--color-${name}: ${value};`;
    assert.ok(haystack.includes(needle), `${name} ${value} missing from @theme`);
  }
});
