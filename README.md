# Echoes Beneath the Seal — Tactile Edition 2.1

Created and Designed by Shahd Mohamed

Copyright © 2026 Shahd Mohamed. All rights reserved.

The production browser/PWA files are at the repository root. Editable source, tests, licenses, native wrappers and reproducible tools are in [`game/`](./game/). The earlier original page remains at [`legacy.html`](./legacy.html).

## Play

https://shahdmohamed2004.github.io/echoes-beneath-the-seal/

Drag the seal onto an unfolded request. Choose its face before dragging, or use a decision button to position and press the same seal accessibly. Drag the lens and inspection light over small writing; compare, rotate, unfold and align papers. Samir’s key fits the archive lock. Daily reports record real decisions and issue fictional equipment vouchers.

The fifteen-day mystery, Project Echo, Patient 07, evidence deductions and eight endings are preserved. Save export/import stays local; existing Archive Edition saves and the older `crlf2` format migrate without restarting the story.

## Build and test

```sh
cd game
npm ci
npm test
npm run build
npx playwright install chromium
npm run test:browser
node tools/preview.mjs ../Echoes-Tactile-index.html
```

Serve `game/dist/` for a modular production build. The preview tool produces a self-contained HTML with graphics, fonts, sound, credits and privacy text embedded. The published app and native wrappers use the same source. Generated native projects are not signed or device-tested releases.

## Verified statistics boundary

The previous published build was audited: its Supabase ending-only RPC returned actual aggregates, denied direct table reads and rejected invalid endings. That interface and its historical totals remain intact. The new detailed outcome panel is separately opt-in, with fixed Boolean outcomes, random per-run retry receipts and gateway-address throttling. It displays actual eligible denominators and labels samples below five as insufficient. It cannot prove unique players or defeat a determined client.

Only game-specific objects were queried or created. Student tables are outside the scope. No service-role key or privileged token is shipped. See [`game/docs/STATS_VERIFICATION.json`](./game/docs/STATS_VERIFICATION.json), the game-only [migration](./game/supabase/migrations/20261011_echo_run_outcomes.sql), and [privacy policy](./privacy.html).

## Assets and implementation evidence

22 local WAVs, 16 original character atlases with ten animation rows, seven scene backgrounds, local Arabic font and original desk rendering. No commercial reference-game assets or reference-video sounds were copied. See [audio credits](./AUDIO_CREDITS.md), [asset credits](./ASSET_CREDITS.md) and the [interaction checklist](./game/docs/TACTILE_CHECKLIST.md).

The exact test results and platform limitations are recorded in [`game/docs/TACTILE_RELEASE.md`](./game/docs/TACTILE_RELEASE.md). Real-device, Safari/Firefox, voice acting and signed native/store acceptance are not claimed.
