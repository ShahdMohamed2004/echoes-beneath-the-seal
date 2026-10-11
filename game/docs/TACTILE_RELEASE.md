# Tactile Edition — implementation release notes

Version 2.1.0; prepared 11 October 2026.

The actual current GitHub build was audited before editing. Its 19 local embedded WAV assets and optional two-RPC ending poll were working. This release keeps the original fifteen-day story, eight endings, saves and student-data boundary, while changing the desk interaction model.

## Implemented

- A single expanded stationary scene contains request/registry papers, folder, seal, matching key, moving magnifier, inspection light and cord. Dialogue and actions remain compact, with accessible equivalents.
- Mouse, pen and touch share pointer capture and world-coordinate conversion. Documents can overlap, rotate, fold, open and align. Solid tools transfer momentum and settle under a 120 Hz fixed step.
- The seal must meet an unfolded request. A 180 ms contact produces persistent paper-local ink, reaction motion, a real impact sound and one decision. Wood receives only a temporary smudge, dust and wood audio. Release outside the canvas never triggers an action button.
- The lens samples real rendered pixels at ×2/×3, with reflections. Light plus lens alignment reveals meaningful microprint and preserved evidence deductions.
- Local wetness affects ink spreading/drying. Material particles are bounded; rain, dust, printer steam and late-game electrical sparks have contextual triggers.
- Sixteen original character sheets use ten animation rows including new suspicion and exhaustion. Talking pauses after a short delivery; incorrect decisions trigger fear, and transformation remains tied to Mahmoud's scene.
- 22 local WAVs decode in the complete HTML backup: 12 Kenney CC0 foley clips, 7 designed audio beds and 3 added CC0 recordings. Mixer buses, interruption cleanup, captions and persistent volume controls are included. Browsers may require a first gesture before audio.
- Shift reports use recorded data. Fictional equipment vouchers settle once per completed shift; three upgrades affect lens reach/zoom, light response and paper wetness without locking story routes.
- Save validation retains ink, paper poses, equipment, evidence dates and decision logs. Legacy and previous-version saves remain supported.
- A separate minimal opt-in outcome service validates Boolean metrics, provides retry idempotency and best-effort per-address throttling. Aggregates show eligible sample sizes and insufficient-data labels. Original ending-only totals remain available via their existing RPCs.

## Verification artifacts

The complete Chromium matrix passed **44/44** scenarios across desktop (1440×1000), touch portrait (390×844), touch landscape (844×390) and small touch (320×740), with zero skipped, flaky or unexpected tests. It included the full fifteen-day true-ending route on all four configurations. **18/18** Node tests passed, including all 1,024 late-story binary paths. The self-contained file opened at desktop and phone sizes with zero runtime errors, zero external asset requests, 22 decoded sounds and exactly one stamp sound for its one recorded impression. A final timing-only animation correction received a separate four-viewport render/audio/offline regression check.

`build-verification.json`, `TACTILE_STANDALONE.json`, `STATS_VERIFICATION.json`, `LIVE_AUDIT.json`, `TACTILE_BROWSER_RESULTS.json` and `TACTILE_CHECKLIST.md` contain specific checks. The final browser result file is copied from the completed run, not estimated in advance.

Valid database submissions, duplicate retries, aggregate counts, invalid fields, rate limiting and private-table denial were exercised as `anon` inside a transaction and rolled back. Subsequent HTTP read showed zero real detailed-outcome submissions; no test rows were counted in the public sample.

## Practical limits

This is a browser release with generated shared native projects. Real phone hardware, Safari/Firefox, signed APK/IPA/desktop packages and app-store acceptance are not verified. Character dialogue is written, not voice acted. The material system is local, not a full cellular simulation of the world. Server validation does not prove that a public client played an authentic run or that submissions represent unique people. Saves do not automatically sync. Human play, listening and narrative review are still necessary acceptance steps.

Created and Designed by Shahd Mohamed

Copyright © 2026 Shahd Mohamed. All rights reserved.
