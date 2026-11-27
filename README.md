[![make.fun bounty](https://img.shields.io/badge/make.fun-black--friday--deal--finder--01-0e7c6b)](https://make.fun/c/black-friday-deal-finder-01)
[![Built on make.fun](https://img.shields.io/badge/built%20on-make.fun-ff2e88)](https://make.fun/c/black-friday-deal-finder-01)
[![referral](https://img.shields.io/badge/referral-njrtxptt-orange)](https://make.fun/?ref=njrtxptt)
[![license](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

# Friday Beacon — Real Black Friday Deals, Checked Today

A static deal-finder site for the make.fun bounty
[black-friday-deal-finder-01](https://make.fun/c/black-friday-deal-finder-01)
("Build the best real Black Friday deal finder").

**50 real Black Friday deals**, each read on **27 Nov 2026** from the store
itself or from a deals roundup that names the store. Every card shows the
product, store, store link, sale price, usual price, discount, check time,
source, and an honest verdict:

- **TRUE LOW** — lowest price on record (6 deals, incl. AirPods Pro 3 at $149)
- **STRONG DEAL** — at least 40% off, or at least $150 saved
- **GOOD DEAL** — a real saving, 20–39% off
- **ROUTINE SALE** — under 20% off; the card says so

Search, filter by category / store / minimum discount, sort by best deal,
biggest discount, biggest saving or price. The AirPods Pro 3 is compared
across stores (Amazon $149 = Walmart $149, Best Buy $180). Deal details open
in a modal. The site runs entirely from static files — no network requests,
no webfonts, no build step.

## Run it locally

```sh
node serve.ts        # serves app/ at http://localhost:8080
```

## Hand in

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts   # copies app/ + screenshots/, writes out/dossier.json
```

## How the deals were checked

On 27 Nov 2026 each price was read at the store or in a deals roundup that
names the store: RedmondPie's live Black Friday list, 9to5Toys, MacObserver,
AppleInsider, CNN Underscored, Yahoo shopping, TechRadar, HotHardware and
DealNews, plus the Best Buy product pages for the doorbusters. Each card names
its source and the day it was read. Where two roundups disagreed on a usual
price (the Nintendo Switch 2 bundle), the card says so. No product, price or
link is listed that no store or roundup showed. Prices change fast on Black
Friday — the store link on each card is the final word.

## Layout

- `app/index.html` — page shell
- `app/style.css` — design (system fonts only)
- `app/deals.js` — the 50 checked deals
- `app/filters.js` — filter / sort logic
- `app/render.js` — stats, hero, compare table, cards, modal
- `app/app.js` — wiring and state
- `main.ts` — hand-in program (copies app/ + screenshots/, writes dossier.json)
- `serve.ts` — local static server for testing
- `vendor/makefun-frontend.ts` — kit library, unchanged
- `screenshots/` — 4 real renders of the running site
