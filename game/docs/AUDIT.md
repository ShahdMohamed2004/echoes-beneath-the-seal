# Baseline audit — 2026-10-10

Upstream: ShahdMohamed2004/echoes-beneath-the-seal, public, main at `28e765a0d4d0dcfc44e7c7769d47cf0b981cb1d1`. Connected GitHub account reported admin/push permissions. The repository contained only README.md and a 382-line index.html; no local sprite, audio, package, test, manifest or deployment-workflow files.

A real Chromium visit to the published page reported **`Unexpected token '<'`**. The last additive script contains a nested `<script>` start without closing its predecessor. This prevents the final effects/seal code from parsing. Evidence is retained in baseline-browser.json; the original source is archived as baseline.html.txt for review only and is excluded from the production build.

Confirmed existing content:

- Days 1–4: Hassan Abdel-Baky, Om Karim El-Sayed, Mona Fouad, Ashraf Nabil, Sameh Ramzy, Nadia Salama, Mahmoud Eid / Patient 07.
- Days 5–14: manager, Major Yasser, collapse in the queue, Dr. Hala, archive clerk Samir, coworker transformation, survivors, lab gate, Project Echo, personal file. Day 15 offers five final actions resolving to eight outcomes.
- Equipment: archive, CCTV, window, door, ceiling light, printer, scanner, computer, telephone, drawer. Documents support field comparison; archive records support search and printing.
- Variables G / ST track flags, evidence, food, medicine, infection, daily requirements, searched citizens, missing queue members and consequences.
- Arabic/English strings, canvas graphics, generic oscillator audio, localStorage key crlf2. Save only recorded day/G/ST/L, so Continue restarted the day and did not restore the current citizen/choice phase.

Confirmed defects addressed:

1. Duplicate function declarations override earlier versions of hud, scene, next, pick, menu, scn and ch; multiple animation loops and uncancelled intervals add state complexity.
2. `endg` checks `ST.ev.self` and `ST.ev.echo`; the printer actually writes `pself` and `pecho`. True/loop endings are blocked by this mismatch.
3. Language changes call scene-entry functions, risking stateful re-entry and resetting citizen inspection.
4. Pointer cancellation invokes the same handler as a drop, potentially applying a decision; the script itself is also blocked by the syntax error.
5. Physics applies only a short CSS seal movement; papers/key do not have a coherent simulation.
6. Random phone/network events gate progress, while blackouts, retry behavior and narrative effects lack a unified lifecycle.
7. Creature shape is selected by `day % 3`, introducing arbitrary demon/beast forms without corresponding story facts.
8. No original spritesheet library, per-day cutscene library, local licensed soundscape, offline support or native project exists.

Implementation preserves the original citizen data and decision texts in src/canon.js. It adds evidence/relationships and explicit state transitions. Legacy key names migrate into canonical evidence IDs. Existing ending types remain; true/loop unlocks now follow proof relationships instead of unreachable evidence counters. No unrelated free-roaming game or backend was introduced.

Baseline checklist carried into testing: all fifteen days, document comparison/scan/search, printer collection, guarded day progression, all eight ending rules, true-ending deductions, fresh-run isolation, save migration/recovery, exact phase restoration, language changes, pointer lifecycle, material settling, narrow-screen access and offline shell/assets.
