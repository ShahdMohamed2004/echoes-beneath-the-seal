# Release verification — Archive Edition 2.0.0

Prepared 2026-10-10 UTC / 2026-10-11 Cairo. Created and Designed by Shahd Mohamed.

**Status: playable, tested web review build and source package. Public deployment has not been changed. Native projects are generated, but no native installer has been compiled or signed.**

## Verified results

- **11/11 Node tests passed.** Includes two full deterministic campaigns, all eight ending rules, 1,024 binary narrative-choice routes with denied-access fallbacks, anti-repeat dialogue, phase-accurate saves, legacy evidence migration, backup recovery, malformed-save rejection, coordinate mapping and material settling at 30/60/120 input frame rates.
- **20/20 Playwright tests passed**, zero skipped, zero unexpected failures, zero flaky tests. Final run began 2026-10-10 22:16:49 UTC and took 116.9 seconds. Full report: browser-results.json.
- **Four viewport/input configurations**, all on actual headless Chromium shell revision 1243: 1440×1000 desktop; 390×844 touch portrait at DPR 3; 844×390 touch landscape at DPR 2; 320×740 small touch at DPR 2.
- Every configuration completed the same fifteen-day true-ending route, skipped every daily film safely, revealed physical imprints, connected four deductions, and dragged paper, seal and key. Touch drag tests used Chromium's real touch input dispatch, not only synthetic DOM clicks.
- Every configuration also completed the refusal/denied-access route, changed Arabic/English, restored the current citizen and inspection after reload, changed text size/mute, started a distinct new run, cancelled an interaction without choosing a decision, cached assets and continued offline.
- Additional browser checks observed natural cinematic completion, changing rendered frames, successful decoding of all **19 WAV assets**, and the privacy page loading correctly offline.
- Standalone HTML was opened from a local file URL at desktop and phone viewports. It played an inspection/decision without runtime errors or any HTTP requests. All nineteen embedded sounds decoded. This verifies that it is a working playable review artifact, not a screenshot.
- Build integrity checked declared assets, PNG dimensions, WAV headers, relative PWA paths, absence of source maps, selected known secret patterns and a 5 MB raw production budget. Final `dist/`: **63 files, 2,688,547 bytes**. The content-versioned offline cache name is `echoes-794f8d30ff2d`.
- `npm audit` reported **0 known dependency vulnerabilities** at the recorded check. This is a dependency database result, not proof of perfect security.
- Android and iOS project generation and `cap sync` succeeded. CocoaPods/Xcode steps were explicitly skipped by the CLI because those tools were absent. Shared-asset hashes are recorded separately; hash identity does not replace native runtime tests.

## Scope of implementation

Original upstream citizen records, names, fifteen-day decisions and eight ending types are preserved in canonical data. The implementation adds sixteen distinct local character atlases with eight states, seven environment plates, authored per-day and ending scenes, a prop atlas, original icons, fixed-step desk physics, an animated cord, contextual imprints, a recurring researcher, four evidence relationships, local audio, seeded replay variation, safe saves and a common responsive interface.

The browser build, PWA and wrappers use the same game bundle and content. Mobile has no reduced story or removed puzzle path. Named instrument controls and placement/reset actions are available at all sizes as equivalents to precision interactions. Native-device parity has **not** yet been established by actual native execution.

## Limitations and remaining acceptance work

1. **No public commit, PR, deployment or GitHub Release was made during preparation.** The existing repository is public and the connected account has admin/push rights; publication requires the final explicit approval. The existing live URL still serves the earlier game.
2. **No APK, AAB, IPA, EXE, MSI, DMG, AppImage or DEB has been built, signed, installed or released.** This sandbox lacks the required JDK/Android SDK, macOS/Xcode/CocoaPods and Rust/WebKitGTK desktop build prerequisites. Generated project/configuration files are included, with review workflows and instructions.
3. Firefox and WebKit/Safari were not available in the test image; installation attempts did not complete. iPhone-sized Chromium emulation is not Safari testing. Real Android/iPhone playthroughs, standalone installation, native save-file UI, OS lifecycle and store review remain external acceptance work.
4. The simulation focuses on three recoverable desk bodies. Doors, lamp, telephone, archive, window and printer are stateful interactions, not arbitrary full rigid-body furniture. No free-roaming maps, pathfinding or destructive terrain is implemented.
5. The soundscape combines twelve licensed foley recordings with seven original designed/synthesized tracks. It is not a fully recorded voice cast. The finite authored dialogue pools avoid consecutive repeats where alternatives exist; they do not guarantee infinitely unique dialogue.
6. Daily scenes are short compositions of original plates, sprite frames and contextual props, not fifteen pre-rendered animated films. Natural completion and all skip paths were tested; every visual gesture has not been reviewed by a human animator on hardware.
7. No on-device FPS, battery, thermal or long-duration memory benchmarks were collected. Frame-rate tests verify the physics algorithm in the test environment, not performance on low-end physical phones.
8. The result still needs human art-direction, narrative pacing and accessibility playtesting before calling it a finished commercial release. The broad production brief is not represented as fully certified acceptance across every platform.

## Security and provenance

The production build uses local assets and CSP, renders narrative/imported state through safe text nodes, validates save shape, carries license copies, and does not embed credentials or tracking services. External fonts and audio CDNs are not contacted at runtime. The targeted secret scan is not a full penetration test. Client-delivered material can still be extracted. No absolute security, anti-copying or store-approval claim is made.

See ASSET_CREDITS.md, AUDIO_CREDITS.md, COPYRIGHT.md, LICENSE, PRIVACY_POLICY.md, docs/PLATFORMS.md and SHA256SUMS.txt in the deliverables.
