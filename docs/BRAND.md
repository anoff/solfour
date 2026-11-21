> This is the studio CI, copied from the working `CI.md`.
> In this pack, locked splash masters live under `games/<slug>/` (from `splash-final/`), not the older `splash/` paths named below. Favicons are under `brand/favicons/` (studio) and `games/<slug>/favicons/`. Showcase cards are `games/<slug>/card.png`.

# Sol Four — studio CI (concept)

Four individual browser games under one studio label, not a series. Each game keeps its own art style. Shared: the `solfour.app` domain (one subdomain per game), one icon frame, one splash layout, one UI font, and three primaries.

## Wordmark

`SOL FOUR` in Outfit Bold, tracked about 0.2 em, cream `#EFE6D2` on ink (or ink on cream). To the right of the words, optically centred on the cap height: a thin cream orbit ring with a rust-filled dot on the right (the fourth planet) and three smaller hollow cream dots on tighter implied orbits. No tagline on the mark itself.

## Icon frame

- Rounded square, corner radius 20% of the side.
- Game art fills the mask to the edge. No title on the icon.
- Cream hairline inside the mask, 2.4% of the side, `#EFE6D2` at 85% opacity. On light backgrounds, add a 1 px ink outer edge.
- Studio orbit-mark in the bottom-right, inset 8% from the edges, 12% of the side wide. If the art is busy, sit it on a 40%-opacity ink disc.

## Splash screens

Masters live in `splash/`. Each game has a 16:9 master at 1920×1080 and a 9:16 portrait variant at 1080×1920 for phones. Key art fills the frame. Typography is composited from one shared template so the four games read as one studio.

### Template

On a full-bleed key-art field, with a soft ink vignette at the top and a stronger one at the bottom so cream type stays readable:

- **Top-left** — the same corner on every crop. The locked studio favicon from `favicons-final/studio/`, then “a Sol Four game” in Outfit 500, cream `#EFE6D2`.
- **Bottom-left** of the safe area: the game’s locked favicon as a small brand glyph, then the game wordmark in Outfit 700, cream, slightly tracked. Red Dust Prospectors uses a two-line mark (Outfit 600 kicker “RED DUST” over Outfit 700 “PROSPECTORS”). Under the wordmark, a thin loading bar: an ink pill, a cream track, and a fill in the game’s signature colour, about 68% full. Under the bar, the subdomain in Outfit 400, cream at about 60%.

Shared primaries remain cream `#EFE6D2`, ink `#1B1E2B`, rust `#C2582F`. Loading-bar fills use the signatures: Areoid `#FF7A3D`, Prospectors `#4FD6E6`, Dust & Domes `#35B8A8`, Tharsis `#4B3F6B`.

### Safe areas

Keep all type and marks inside these insets so neither crop clips chrome on a phone (notch / status bar and home indicator):

| Crop | Sides | Top | Bottom |
|---|---|---|---|
| 16:9 (1920×1080) | 96 px | 80 px | 88 px |
| 9:16 (1080×1920) | 80 px | 160 px | 180 px |

### Key art

Each game keeps its own art style.

- **Areoid** — the existing flat planet painting, on the studio ink field.
- **Red Dust Prospectors** — the low-poly chibi prospector (faceted cream helmet, grey ear pods, dark teal visor, two glowing cyan eyes, rust scarf) on rust ground, with **no antenna**.
- **Dust & Domes** — the hand-painted cream habitat and settler on hex-cracked ochre soil.
- **Tharsis** — the closed pressurised rover and the astronaut standing on real Martian ground in the painterly dusk-canyon style, not floating.

Working key-art plates (without typography) sit in `art/keys/`.

### Timing (optional motion)

1. **0.00–0.35 s** — studio tag fades in, top-left.
2. **0.35–0.70 s** — game glyph and wordmark fade in, bottom-left.
3. **0.70–0.90 s** — loading bar and subdomain appear.
4. **0.90–2.20 s** — bar fills.
5. **2.20–2.50 s** hold, then **0.35 s** fade into the game.

Reduced motion: static layout, bar already full, 80 ms fades.

### Files

| Game | 16:9 | 9:16 |
|---|---|---|
| Areoid | `splash/areoid-16x9.png` | `splash/areoid-9x16.png` |
| Red Dust Prospectors | `splash/prospectors-16x9.png` | `splash/prospectors-9x16.png` |
| Dust & Domes | `splash/domes-16x9.png` | `splash/domes-9x16.png` |
| Tharsis | `splash/tharsis-16x9.png` | `splash/tharsis-9x16.png` |

A contact sheet of all eight is at `splash-sheet.png`.

## UI font

[Outfit](https://fonts.google.com/specimen/Outfit) (SIL OFL, Google Fonts). 400 for body, 600 for labels, 700 for the wordmark. Game logos may keep their own lettering on the splash; menus, chrome and loading type use Outfit.

## Colour

### Shared primaries

| Token | Hex | Source | Adjusts |
|---|---|---|---|
| Cream | `#EFE6D2` | Tharsis HUD cream (already in the earlier franchise draft) | Areoid / Prospectors `--ink` `#F6EDE6` (a touch warmer); Dust & Domes `--light` `#F5F2EB` and glyph cream `#F2E8D5` (a touch duskier). In-game text tokens can stay; studio chrome uses this cream. |
| Ink | `#1B1E2B` | Tharsis indigo / deep sky | Areoid / Prospectors `--bg` `#0B0706` and `--panel` `#16100D` stay for in-game glass; studio chrome uses this cooler ink. Dust & Domes `--inset` `#252D32` is already a close cool dark. |
| Rust | `#C2582F` | Tharsis hardware rust-orange | A calmer cousin of Areoid / Prospectors `--accent` `#FF7A3D` (those games keep the hotter orange as their signature). Almost Dust & Domes `--rust` `#BD6547` (slightly cleaner and more orange). |

### Per-game signatures

| Game | Hex | Already is | Role |
|---|---|---|---|
| Areoid | `#FF7A3D` | `--accent` | CTA and "this is Areoid" orange |
| Red Dust Prospectors | `#4FD6E6` | `tower-fire` / hero visor | The teal-cyan that lifts the hero off the rust ground |
| Dust & Domes | `#35B8A8` | Player-0 teal / territory wash | Land, player, and calm settler accent |
| Tharsis | `#4B3F6B` | Palette violet (shadow / depth) | Ident colour for the rover game; HUD rust stays for warnings only |

## Subdomains

| Game | Host |
|---|---|
| Studio home | `solfour.app` |
| Areoid | `areoid.solfour.app` |
| Red Dust Prospectors | `prospectors.solfour.app` |
| Dust & Domes | `domes.solfour.app` |
| Tharsis | `tharsis.solfour.app` |

## Favicons vs showcase cards

The painted icons in `icons/` are showcase cards for the solfour.app overview: each game keeps its own art style inside the shared frame. They are too detailed to read as a 16 px tab icon.

The locked favicon set lives in `favicons-final/<name>/`. Earlier rounds are kept in `favicons/` (v1), `favicons-v2/`, `favicons-v3/` and `favicons-v4/`. Marks use the same ink rounded square and cream hairline, with one bold flat glyph per game. `icon.svg` is the master (32, 180 and 512 px). `icon-16.svg` is a simplified, borderless 16-grid variant so the mark still holds in a browser tab.

| Mark | Locked as | Glyph |
|---|---|---|
| Studio | v1 | Cream Sol disc, cream orbit, rust fourth-planet dot |
| Areoid | v2 | Orange planet with a terminator, cream polar cap, teal patch and craters |
| Prospectors | v3 | Chibi cream helmet, dark teal visor, two cyan eyes, rust scarf; no antenna |
| Dust & Domes | v2 | Cream habitat, metal ribs, rust belt, warm door and porthole |
| Tharsis | v4 | Dusk sky, cream/peach sun, cream peak with a dusty-violet flank, rust plain edge to edge |
