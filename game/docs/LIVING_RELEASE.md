# Echoes Beneath the Seal — Living Pixel World 2.2.0

Created and Designed by Shahd Mohamed

Copyright © 2026 Shahd Mohamed. All rights reserved.

This release expands the existing fifteen-day investigation without replacing its story, eight endings, evidence deductions or compatible progress.

- Sixteen individualized original Egyptian character atlases: 21 four-frame states, profile/three-quarter turns, expressive handover/listen/anger/relief/cough and staged infection silhouettes. Original design sheets are in `docs/character-sheets/`.
- Richer petrol/cyan/amber/violet palette, cached localized glow, window reflection, light-directed highlights and approximate shadows, lens edge distortion, bounded pooled motes/glints/fibers/ink/smoke/ash/sparks and droplets.
- Real stamp-to-paper contact and persistent ink retained; heavy contact disturbs lightweight sheets. Local water/ink drying, heated-printer steam and wet-paper spark quenching remain bounded and cannot destroy required clues.
- Thirty-six local audio files: fourteen new CC0 environment and human nonverbal samples, contextual profiles, seven saved mixer categories, crossfaded beds, stereo/distance/occlusion and algorithmic room reverb. Browser autoplay blocking has an explicit enable control.
- Fifteen timed secondary cinematic beats and all eight ending scenes; authored dialogue reacts to recorded evidence, negotiated choices, supplies and relationships. A conditional journal glossary clarifies the clue numbers and separates reused credentials from personal identity.
- Fixes: examining an early clue no longer suppresses a newly acquired clue in the same shift; invalid phase/day saves are rejected; stale out-of-range dialogue indices recover safely.

## Verification

- **27/27** Node tests, including all 1,024 late-story binary routes, all eight ending rules, save recovery, physical contact, local reactions and animation interruption.
- **56/56** Chromium browser tests, zero skipped/flaky/unexpected results, on 1440×1000, 390×844 touch, 844×390 touch and 320×740 touch.
- **8/8** additional desktop/touch-landscape save, full-campaign, responsive-effects and real read-only statistics checks after the final save hardening.
- **23/23** story scenes rendered: fifteen daily scenes with both timed sound beats, plus eight ending scenes, with no page runtime errors.
- Standalone `index.html`: desktop and phone-size local-file playback, **36 decoded sounds**, **zero external asset requests**, **zero runtime errors**, and one synchronized stamp sound/impression.
- **83 production files**, 5,816,999 bytes; shared Android/iOS copied assets match exactly. Dependency audit found no known vulnerabilities at verification time.

The existing protected Supabase statistics contract is unchanged. Read-only statistics were exercised; no valid production test votes were submitted. Student tables were never accessed or modified.

## Downloads and limits

`index.html` is the self-contained backup (about 8.75 MB). `Echoes-Living-Web-2.2.0.zip` is the complete production web/PWA package. Editable code is under `game/` in the repository. Existing `legacy.html` and database migrations are preserved.

Full requirement classification is in `docs/LIVING_AUDIT.md`. Native projects are prepared and synchronized, but native packages are not compiled/signed/device-tested; real hardware, Firefox and Safari acceptance remain unverified. Human sounds are nonverbal recordings, not fully voiced Egyptian dialogue. The game uses localized material/optical/acoustic approximations, not a full Noita engine or physically exact ray tracing. Audio before any gesture depends on browser policy. Saves are local, not cloud synchronized.

Public deployment and downloadable release verification are recorded separately after publication; these prepublication checks do not by themselves assert that a Pages build is live.
