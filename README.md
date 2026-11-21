# Sol Four

Studio landing page for [solfour.app](https://solfour.app).

A static [Astro](https://astro.build) + [Tailwind](https://tailwindcss.com) site. Game cards render from `data/games.json`. The studio mark is overlaid in markup from `public/favicon.svg` and is not baked into the card or OG art.

## Develop

```sh
npm install
npm run dev
```

## Check and build

```sh
npm test
npm run check
npm run build
npm run preview
```

CI runs the same test, `astro check`, and build on pull requests. A GitHub Pages deploy job is included for pushes to `master` (DNS for `solfour.app` is separate; this repo ships `public/CNAME`).

## Placeholders

- The wordmark is typeset `SOL FOUR` in Outfit Bold. The studio name is not locked, and there is no drawn wordmark yet.
- The tagline “Four games on Mars.” is a placeholder until Andreas picks one.
- Tharsis has no confirmed live URL in the art pack, so that card shows “Coming soon”.
- Areoid is linked to `https://areoid.anoff.io` as confirmed on 2026-11-21.
