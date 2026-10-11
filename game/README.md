# Echoes Beneath the Seal — editable source, 2.1.0

Created and Designed by Shahd Mohamed

Copyright © 2026 Shahd Mohamed. All rights reserved.

This directory contains the shared game source. The repository root holds the production browser files; GitHub Pages is deployed from the tested `dist/` build of this source.

```sh
npm ci
npm test
npm run build
npx playwright install chromium
npm run test:browser
node tools/verify-build.mjs
node tools/preview.mjs /path/to/Echoes-Tactile-index.html
```

The production build uses only local graphics, sounds and fonts. The optional statistics panel is the only explicit external service interaction; it contacts fixed, restricted Supabase RPCs only after the player clicks a statistics action. The public publishable key is not a privileged credential.

- [Tactile release notes](docs/TACTILE_RELEASE.md)
- [Interaction/audio checklist and actual limits](docs/TACTILE_CHECKLIST.md)
- [Published baseline audit](docs/LIVE_AUDIT.json)
- [Statistics verification](docs/STATS_VERIFICATION.json)
- [Desktop/mobile browser results](docs/TACTILE_BROWSER_RESULTS.json)
- [Standalone HTML verification](docs/TACTILE_STANDALONE.json)
- [Asset credits](ASSET_CREDITS.md) and [audio credits](AUDIO_CREDITS.md)

`src/canon.js` retains the original narrative. `core.js` owns decisions/save migration. `physics.js`, `desk.js`, and `desk-render.js` implement the physical workspace. `main.js` coordinates one loop and accessible controls. `desk-ui.js` provides accounting and equipment. `stats.js` is opt-in only. Game-specific SQL lives in `supabase/migrations`; student data is outside this project’s scope.

Native wrapper source is included. Run `npm run native:sync` before platform builds. Signed native packages and real-device acceptance are not supplied by this browser release. Prior 2.0 audit documents are historical; `TACTILE_*` files describe 2.1.
