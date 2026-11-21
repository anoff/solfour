# Sol Four landing page — art handoff

Build this in [anoff/solfour](https://github.com/anoff/solfour) as **one PR, do not merge**. Art Director does not write production code and will not push or open the PR.

Project: Sol Four studio site, to be served at `https://solfour.app`. Brand source: `brand/BRAND.md` (studio CI) and `brand/tokens.json`.

## Stack

- **Astro + Tailwind**, static output (`output: 'static'`). No SSR adapter.
- Game cards render from **one data file** (`src/data/games.ts`, or import `data/games.json` from this pack). Do not hand-write four HTML pages or duplicate card markup.
- Deploy to **GitHub Pages** with custom domain **solfour.app**: put `solfour.app` in `public/CNAME`, set `site: 'https://solfour.app'` and `base: '/'`. Andreas still has to point the DNS; the PR just ships the CNAME.
- TypeScript is fine. Do not add a CMS, a client-side router, or a UI library for this one page.

## Page

One page. Cream field, ink type, rust as a quiet accent. Outfit 400 body, 600 labels, 700 wordmark. The **cards carry the colour**; the page itself stays calm — no full-bleed key art, no rust background, no per-game page chrome.

1. **Hero, minimal.** Overlay the real studio mark, `brand/favicons/icon.svg` (a cream ring with a rust dot — not the old orbit-with-dots), plus the wordmark `SOL FOUR` in Outfit Bold, tracked about 0.2 em, ink on cream. One-line tagline under it. Until Andreas picks a final line, use the placeholder in `data/games.json`: “Four games on Mars.” Mark it as a placeholder in the PR description, not on the page.
2. **Game grid.** 2×2 on desktop, one column on mobile. Use each game’s showcase card (`card-512.webp` on the page, `card.png` is the 1024 master). The cards are plain rounded-corner paintings with a transparent outside and **no logo or mark baked in**. Do not add a frame, title, signature bar, or studio mark on top of the painting in the asset; if the page wants the studio mark, overlay `brand/favicons/icon.svg` in markup. A short name under or beside the card is enough. Signature colour may be a thin underline, a 1 px focus ring, or the name; keep it small.
3. **Links.** If `url` is a string, the card is a link (new tab is fine, `rel="noopener"`). If `url` is `null` (TODO), render a non-link card with a quiet “Coming soon” (or equivalent) — no `href="#"`, no invented host.
4. **Footer, tiny.** “Sol Four” and the year is enough. No newsletter, no social row.


### Base assets — no baked-in logos

Paintings, cards, key art, splashes and OG images in this pack carry **no logo and no studio mark**. Andreas ruled that marks are overlaid in code when needed, never composited into the base files.

- Showcase cards are a plain 1024×1024 rounded-corner crop (transparent outside). No hairline badge, no corner orbit, no wordmark on the painting.
- If the page (or a later splash) needs the studio mark, overlay `brand/favicons/icon.svg` in markup. That SVG is the real mark: a cream ring and a rust-filled fourth-planet dot on ink. Do not invent a second mark, and do not rasterise it into `card.*`, `key.*`, `og.*` or the splash masters.
- Titled splashes already keep only the game title and the signature underline. They have no studio tag and no game favicon. Leave them that way; overlay marks in the game when the renderer runs.
- Favicon files under `brand/favicons/` and `games/<slug>/favicons/` are the marks themselves, for tabs, the manifest, and overlays — not decorations baked into art.

### Motion and audio

- Honour `prefers-reduced-motion`: no translate/scale hover, no fade-in choreography. Instant state changes only.
- **The sting stays off on page load.** Browsers block autoplay, and a boot sting on a marketing page would annoy people. Do not autoplay, do not play on first click elsewhere, do not load the wav on the page.
- Optional only: a small, muted “Play sting” control in the footer that plays `solfour-sting` (take A, 3.9 s; mp3/ogg) after a user gesture. If you skip the button, that is fine. Do not use the short sting on this page (it is the quick-boot variant for the games).

### Meta

- Document title: `Sol Four`. Description can reuse the tagline.
- Open Graph and Twitter (`summary_large_image`) from `brand/og.png` (or `brand/og.jpg`, 1200×630). Absolute URLs via `site`.
- Favicons from `brand/favicons/`: `icon.svg` as the svg favicon, `icon-16.svg` where a 16-grid mark is useful, `32.png`, `180.png` as `apple-touch-icon`, `512.png` for the manifest, plus `favicon.ico`.
- A web manifest (name `Sol Four`, `background_color` / `theme_color` cream `#EFE6D2`, ink icons).

## Where the pack goes

Copy this pack into the repo, then point the site at the web copies. Suggested layout:

```
docs/BRAND.md                         ← brand/BRAND.md
src/data/games.ts                     ← typed wrapper around data/games.json
src/data/tokens.ts                    ← from brand/tokens.json, also wired into Tailwind
public/CNAME                          ← solfour.app
public/favicon.ico
public/favicon.svg                    ← brand/favicons/icon.svg
public/favicon-16.svg                 ← brand/favicons/icon-16.svg
public/favicon-32.png
public/apple-touch-icon.png           ← 180.png
public/icon-512.png
public/og.png / og.jpg / og.webp      ← brand/og.*
public/audio/solfour-sting.{mp3,ogg}  ← not the wav
public/audio/solfour-sting-short.{mp3,ogg}
public/games/<slug>/card-512.webp
public/games/<slug>/og.png            ← later per-game pages; not required on this page
assets/                               ← optional: png/jpg/wav masters, key art, splashes
                                      (keep in the repo, do not serve the wav or 1920 pngs
                                       from the landing page)
```

Masters stay in git. The landing page should request **WebP** (cards at 512, studio og if used on-page). Self-host Outfit (SIL OFL; fontsource or a woff2 in `public/fonts`) rather than a render-blocking Google Fonts CSS request.

`games/<slug>/` also holds titled and clean splashes (16:9 and 9:16), key art, and per-game favicons, for the studio library and later game boots. Coordinates for in-game splash type are in `brand/splash-layout.json`. They are not needed to ship this page.

## Data file

Use `data/games.json` as the source. Shape:

- `studio.name`, `studio.wordmark`, `studio.tagline`, `studio.taglineStatus`
- `games[]`: `slug`, `name`, `signature`, `url` (`string | null`), `urlStatus`

Current URLs, checked 2026-11-21 — **do not invent hosts**:

| Game | `url` | Status |
|---|---|---|
| Areoid | `null` | TODO. Planned CI host `areoid.solfour.app` is not live. `https://areoid.anoff.io/` exists but returns HTTP Basic 401 and is not documented in `anoff/areoid`. |
| Red Dust Prospectors | `https://prospectors.anoff.io/` | Live (200). From `anoff/red-dust` README / Pages. |
| Dust & Domes | `https://anoff.github.io/dust-and-domes/` | Live (200). Repo homepage + Pages on `main`. Planned `domes.solfour.app` is not live. |
| Tharsis | `null` | TODO. No live URL found. Planned `tharsis.solfour.app` is not live. |

When a TODO URL is confirmed, change only the data file.

## Acceptance

- Lighthouse (mobile and desktop, production build): **Performance ≥ 95** and **Accessibility ≥ 95**. Treat SEO / Best Practices as should-pass, not a blocker if a Pages preview URL hurts SEO.
- Usable at **360 px** wide: one column, no horizontal scroll, wordmark and cards remain readable, 44 px-class tap targets.
- **No layout shift**: width/height (or aspect-ratio) on the cards and favicon, font-display that does not shove the hero, no late-loading hero image above the fold without a reserved size.
- Keyboard: cards and the optional sting button are focusable; focus ring visible on cream (ink or rust).
- Colour contrast of ink on cream and cream-on-ink type meets WCAG AA. Do not put signature cyan or orange behind small text.
- 3–5 **user-attachment screenshots** in the PR: desktop 2×2, mobile at 360 px, a TODO card showing “Coming soon”, a focused card, and the optional sting button if you include it. No issue number in the PR title.

## Open items (do not block the PR)

1. **Studio name / wordmark still unlocked.** Set `SOL FOUR` in Outfit Bold for now; there is no drawn wordmark to ship.
2. **Tagline** is a placeholder (“Four games on Mars.”) until Andreas picks one.
3. **Areoid and Tharsis hrefs** are TODO, as in the table above. Confirm `areoid.anoff.io` (currently Basic-auth gated) before linking it.
4. Planned CI subdomains (`areoid.solfour.app`, `prospectors.solfour.app`, `domes.solfour.app`, `tharsis.solfour.app`) are the future hosts; they are not live and must not be used as links yet. `solfour.app` itself is also not live until DNS is pointed.
5. DNS for `solfour.app` and later game subdomains is Andreas’s, not this PR.

## Out of scope

- Per-game landing or press-kit pages (the pack is already laid out for them later).
- Rewriting showcase cards, favicons, or key art.
- Shipping rejected sting takes B and C, or any working-CI folder (`favicons/`, `favicons-v2`–`v4`, `splash/`, `refs/`, `compare-*`, `art/keys/`, `domes-art-pre-*`).
