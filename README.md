# Echoes Beneath the Seal — Living Pixel World 2.2

**Created and Designed by Shahd Mohamed**

**Copyright © 2026 Shahd Mohamed. All rights reserved.**

Play: https://shahdmohamed2004.github.io/echoes-beneath-the-seal/

Tested downloads: https://github.com/ShahdMohamed2004/echoes-beneath-the-seal/releases/tag/v2.2.0

A contemporary Egyptian pixel-art investigation: fifteen shifts, a physical document desk, Project Echo, Patient 07, erased memories, evidence deductions and eight endings. This edition adds original expressive cast art, localized light/reflection/material effects, licensed human and environmental sound, and contextual dialogue while keeping progress compatible.

## Controls

Drag paper, seal, lens, torch and matching key with mouse or touch. Unfold documents before stamping. Aim the torch and lens at latent writing; discovered traces are filed in the journal. The accessible desk buttons perform the same actions. Match the key to Archive 09; equipment requests use fictional vouchers and never gate essential clues. Settings include master/music/ambience/effects/characters/creatures/cinematics, captions, reduced motion, effects detail, text size and lens response.

If your browser blocks sound, use **Enable world sound** or interact with a game control. Close all existing game tabs and reopen to activate an already-cached update. Do not clear local data unless you intend to remove saves; export/import is available in Settings.

## Source layout and build

Root files are the deployed production game. Editable source, tests, original asset tools, documents and prepared native projects are under `game/`. The previous `legacy.html` and game-only Supabase migrations are retained.

```sh
cd game
npm ci
npm test
npm run build
node tools/verify-build.mjs
npm run test:browser
```

From the standalone source ZIP, run those commands in its extracted source directory rather than adding another `game/` component. Browser tests require Playwright Chromium (`npx playwright install chromium` when not already available).

`tools/preview.mjs <output.html>` embeds the local assets and credits into one offline HTML file. The production PWA caches local game files after its first online visit. Saves stay on the device; manual save transfer is supported.

## Evidence and limitations

See `game/docs/LIVING_RELEASE.md`, `game/docs/LIVING_AUDIT.md`, `game/docs/LIVING_BROWSER_RESULTS.json` and `game/docs/LIVING_SCENES.json` (relative `docs/` in the source archive). These distinguish tested browser behavior, stylized physical approximations and unavailable platform acceptance. Older TACTILE/2.0 reports are historical, not certification of 2.2.

Native Android/iOS/desktop projects are preparation, not signed or device-tested applications. Full voiced dialogue, real-device Safari/Firefox verification and cloud saves are not claimed. The 36 local sounds include licensed nonverbal human reactions; per-file credits are in `AUDIO_CREDITS.md` and `audio-manifest.json`.

Optional global statistics require explicit consent and use narrow protected Supabase RPCs. Counts describe submitted runs, not verified unique people. No student-data integration is present. See `privacy.html`.

Original source and artwork remain under the proprietary project license. Third-party CC0 audio, OFL font and MIT runtime components retain their own licenses. Minification does not make downloadable browser code or assets impossible to extract.
