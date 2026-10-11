# Living Pixel World 2.2 — requirement audit

Created and Designed by Shahd Mohamed

This audit refers to the 2.2 implementation, not the historical 2.0/2.1 reports. Status **V** means implemented and exercised in Chromium/Node; **P** means implemented with limits to testing or to the interpretation stated; **B** means blocked by unavailable platform tooling/hardware. It is not a claim of exhaustive manual acceptance on every device.

| Spec section | Status | Implementation and evidence |
|---|---|---|
| 1 Actual-game audit | V | Public main b1f51c8, modular source and actual Pages deployment inspected; `LIVING_BASELINE.md`; live statistics tests. Fixed same-shift clue suppression, stale dialogue indices and impossible imported phase/day combinations. |
| 2 Signature style | V | Original art primitives and Living palette; Noita/Aseprite/Lospec consulted as references; no copied game art. |
| 3 Palette/glow/particles | V/P | Navy/petrol plates, cyan instruments, warm paper/lamps, violet traces, red-orange electrical danger. Cached localized halos, crisp highlights, lens glints, pooled motes/glints/ink/fibers/smoke/ash/sparks/splashes. Visual sampling on four viewports; subjective art quality still benefits from player review. |
| 4 Egyptian cast | V/P | 16 original atlases, individual face proportions and accessories, front/profile/three-quarter turns, practical contemporary clothes, 16 design sheets. Infection states alter pose, limbs and negative space. This is stylized pixel art, not a claim of photoreal likeness or exhaustive cultural review. |
| 5 Responsive animation | V | 21 available action states × four frames; priority/interrupt/return behavior, timed handover/listen/fear/anger/relief/cough and infection silhouettes. Not every state is a story event for every person. Reduced motion retains representative poses. |
| 6 Cohesive desk | V | Shared 480×420 world, compact responsive contextual story/controls, visible props, accessible control alternatives; canvas-only touch capture and normal page scrolling. |
| 7 Paper/seal/key | V | Seven moving bodies, fixed-step motion, overlap, rotation, fold/open, cord, actual eligible contact, one impression/decision, persistent local ink and key/lock matching. Layered paper and box tool collisions are deliberately bounded approximations. |
| 8 Local material simulation | V | Wetting and drying state; fresh ink bleeding; pooled droplets/dust/steam/sparks; droplets vaporize at the active hot printer; sparks quench on wet paper. Essential clues cannot be randomly destroyed. No full-world fluid solver is claimed. |
| 9 Forensic optics | V | Actual scene-region magnification with small reusable buffer, rim distortion, moving reflection, rotated light cone, sustained examination and clue-specific receipts. Scanning/document fields provide readable alternatives. |
| 10 Living environment | V/P | State-controlled rain, light/power, printer, door, archive, threat and Echo traces; window-clipped reflection, local highlights, moving approximate prop shadows and occasional storm responses. Shadows are planar approximations, not ray-traced occlusion. |
| 11 Soundscape | V/P | 36 decoded local WAVs; weather, power, ventilation, traffic, footsteps/creaks, machinery, door/lock, physical impacts, timed film cues; six nonverbal human samples and creature profiles. Crossfaded beds, panning, distance, muffling and algorithmic room reverb. Fully spoken Egyptian dialogue and a recorded crowd conversation are not implemented; dialogue and essential cues have bilingual text. |
| 12 Asset licenses | V | Per-asset creator/source/license/modification records. Original visuals; Noto OFL; Kenney, OpenGameArt, rubberduck and OwlishMedia CC0 audio. Only compatible selected assets shipped locally. No paid packs or copied reference audio. |
| 13 Egyptian identity | V/P | Egyptian colloquial authored lines, contemporary cast, Arabic office signage, paperwork, grounded bureaucratic humor. English preserves facts. Human editorial/cultural review remains useful. |
| 14 Story expansion | V | Project Echo, Patient 07, therapeutic volunteering, transfer of fourteen, limited responsibility, institutional cover-up and erasure retained and clarified across evidence. Credential reuse is distinguished from personal identity. |
| 15 Clue graph | V | Four existing pairwise deductions, physical trace/registry/CCTV/printed records, conditional code glossary (07, 14, 02:14, 3142, S.M., M-07). No numeric evidence-count shortcut replaces deductions. |
| 16 Dialogue/events/reports | V | Seeded nonrepeating alternatives plus authored context rules tied to actual evidence, supplies, negotiated copy and relationships. Daily report/reward settlement is idempotent; upgrades spend fictional credits and affect optics/wetting/alignment. |
| 17 Cinematics | V/P | All 15 daily scenes and eight ending scenes rendered in browser; 15 secondary audio/effect beats checked. Character actions, composition, environmental details and documented conditional variations are present. These remain short stylized 2D sequences, not full bespoke animated films. |
| 18 Integrated physics | V | Fixed 1/120 step, inertia/friction/lift/contact, disturbance of light paper, bounded particles, unified loop; stamp/ink/decision/audio agreement and 30/60/120 Hz checks. |
| 19 Global statistics | V | Existing opt-in protected RPCs retained, live aggregate reads, eligible denominators and insufficient samples, mocked retry test. No valid test vote or student-table access in this update. No service-role secret, unique-player or cloud-save claim. |
| 20 Desktop/mobile parity | V/P | Same source/story/evidence/audio/physics at 1440×1000, 390×844 touch, 844×390 touch and 320×740 touch. Actual Chromium mouse/touch exercised; physical phones, Safari and Firefox unverified. |
| 21 Performance | V/P | One game RAF; 180 fixed FX slots plus 96 recycled material slots; localized 48×48 lens buffer; bounded audio voices/cooldowns; reduced/automatic FX; hidden-page work suspension. Production assets under 6 MB before transfer compression. Low-end real-device frame rates are unverified. |
| 22 Ownership/distribution | V/B | Exact author/copyright lines preserved. Web/PWA and standalone build, source and license records. Shared native project assets refreshed; signed Android/iOS/desktop binaries blocked by missing SDK/Xcode/Rust/signing/hardware. No native store publication claimed. |
| 23 Testing/proof | V/P | Node routes/saves/material/animation tests, four-viewport browser matrix, all daily/end scenes, standalone offline and public-site checks. Current evidence files are named LIVING_*; older TACTILE/2.0 files are historical. |

## Explicit limits

- Browser policy can block audio before a gesture. The page attempts playback and offers a clear working sound-enable control; it does not bypass browser policy.
- Dialogue is not fully voice acted; the six human recordings are short nonverbal reactions, not Egyptian dialogue performances.
- Full free-world fluid simulation, destructible scene geometry and physically exact optics/acoustic ray tracing are not implemented. The requested investigation-centered local approach is used.
- No real hardware acceptance, Firefox/WebKit coverage, signed native executables or cloud-save synchronization is established by this release.
- Publication evidence and final test counts are in `LIVING_RELEASE.md` and the accompanying JSON reports; a file existing is not treated as proof that every interaction was manually tested.
