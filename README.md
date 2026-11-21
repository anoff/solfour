# Sol Four

Studio landing page for [solfour.app](https://solfour.app).

A static [Astro](https://astro.build) + [Tailwind](https://tailwindcss.com) site. Game cards render from `data/games.json`. The studio mark appears in the hero (and as the favicon) via `public/favicon.svg`; it is not baked into the card or OG art, and it is not overlaid on the game cards.

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
- Every game card links to its planned `*.solfour.app` host. DNS for those subdomains is Andreas’s.
- The About section names Andreas and links to [github.com/anoff](https://github.com/anoff).
