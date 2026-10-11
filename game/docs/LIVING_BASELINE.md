# Living Pixel World — baseline inventory

Audited against public main b1f51c8829b5810812ff8e057a4a4b3c43eee948 and the editable 2.1 source on 11 October 2026. The repository now contains a modular `game/` source and root production build, not an inline-only implementation.

| Area | Baseline finding | Work for this release |
|---|---|---|
| Story / saves / endings | Working authored 15-day campaign, eight endings, four evidence deductions, v3 and legacy saves | Preserve canon; improve evidence timing and character reactions |
| Desk / stamping | Working seven props, fixed-step dynamics, persistent local-coordinate impressions, actual magnification | Add contextual response and highlights, retained accessible controls |
| Evidence examination | A per-day examination flag can suppress a later trace acquired that day | Key examination by current document and clue, retain save compatibility |
| Materials | Bounded droplets, dust, steam and sparks, wetness and ink drying; allocation/filter each frame | Pooled multi-material reactions, distinguish simulated state from decorative approximation |
| Lighting | A few radial fills, window rain and lamp glow; mostly muted plates | Cached local light maps, directed beam, source-bound reflection, event-specific FX |
| Characters | 16 original 48×80 atlases with ten states, generic face geometry | Individual proportions/details, authored extra action rows, stage silhouettes, turn sheets |
| Animation | Frame timing works; result and fear use few states, no explicit priority interruption | Timed reaction state machine and world sound responses |
| Audio | 22 local WAV files (Kenney / OpenGameArt CC0 and original designed beds); basic category gain/pan/filter | Context event scheduling, crossfaded beds, room reverb/distance, explicit autoplay status |
| Statistics | Narrow opt-in game RPCs, run receipts, rate limits and sample denominators | Preserve contract; public read-only regression; no student-table access |
| Deployment | GitHub Pages Actions, source and production in same authorized public repo | Test, atomic bundle import, deploy, compare public bytes |
| Native | Android/iOS/Tauri project preparation only | Refresh shared assets; hardware/signing remain unverified |

Reference use: Noita official material rules; Aseprite timeline/tag/frame-duration docs; Lospec tutorial directory. No proprietary reference art or audio is copied. Free assets require per-file redistribution-compatible licensing; original generated sound design is labelled as such rather than as field recording.
