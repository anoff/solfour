import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(join(root, 'data/games.json'), 'utf8'));
const tokens = JSON.parse(readFileSync(join(root, 'data/tokens.json'), 'utf8'));
const css = readFileSync(join(root, 'src/styles/global.css'), 'utf8');
const cardSource = readFileSync(join(root, 'src/components/GameCard.astro'), 'utf8');
const hex = /^#[0-9A-Fa-f]{6}$/;

const expectedGenres = {
  areoid: 'Terraforming simulator',
  prospectors: 'Mining and tower defence',
  domes: 'Cosy economy builder',
  tharsis: 'Mars exploration sim',
};

test('games.json has studio fields and four games', () => {
  assert.equal(typeof data.studio.name, 'string');
  assert.equal(data.studio.wordmark, 'SOL FOUR');
  assert.equal(typeof data.studio.tagline, 'string');
  assert.equal(typeof data.studio.taglineStatus, 'string');
  assert.ok(Array.isArray(data.games));
  assert.equal(data.games.length, 4);
});

test('every game is a playable card on an https://*.solfour.app host', () => {
  for (const game of data.games) {
    assert.equal(typeof game.slug, 'string');
    assert.ok(game.slug.length > 0);
    assert.equal(typeof game.name, 'string');
    assert.ok(hex.test(game.signature), `${game.slug} signature`);
    assert.equal(typeof game.url, 'string', `${game.slug} url`);
    assert.equal(game.urlStatus, 'live', `${game.slug} urlStatus`);
    assert.equal(game.statusLabel, 'Live', `${game.slug} statusLabel`);
    const url = new URL(game.url);
    assert.equal(url.protocol, 'https:');
    assert.equal(url.hostname, `${game.slug}.solfour.app`);
    assert.equal(url.pathname, '/');
  }
});

test('every game has the exact genre from the art direction', () => {
  const seen = new Set();
  for (const game of data.games) {
    assert.equal(typeof game.genre, 'string', `${game.slug} genre type`);
    assert.ok(game.genre.trim().length > 0, `${game.slug} genre is empty`);
    assert.equal(game.genre, expectedGenres[game.slug], `${game.slug} genre`);
    seen.add(game.slug);
  }
  assert.deepEqual([...seen].sort(), Object.keys(expectedGenres).sort());
  assert.equal(data.games.find((game) => game.slug === 'tharsis').name, 'Tharsis');
});

test('no card is coming soon', () => {
  for (const game of data.games) {
    assert.notEqual(game.url, null, `${game.slug} url`);
    assert.notEqual(game.urlStatus, 'TODO', `${game.slug} urlStatus`);
    assert.notEqual(game.statusLabel, 'Coming soon', `${game.slug} statusLabel`);
  }
  assert.doesNotMatch(cardSource, /coming soon/i);
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
