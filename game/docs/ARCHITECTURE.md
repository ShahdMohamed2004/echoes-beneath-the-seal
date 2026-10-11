# Architecture and maintenance

`src/canon.js` preserves literal upstream story data. `src/content.js` defines cast, bilingual narrative, evidence, deductions, contextual variants, hotspots and fifteen cinematic records. `src/core.js` owns deterministic state transitions, prerequisites, ending resolution, validation and migrations; it contains no browser rendering code. `src/main.js` connects accessible DOM controls to those same transitions. The investigation camera remains stationary.

`src/physics.js` advances at 1/120 second, bounded to twelve substeps after a delayed frame. Three bodies have distinct mass, restitution, friction and angular damping. Desk-plane separation prevents unstable piles; vertical gravity settles props against a recoverable desk boundary. The cord uses iterative Verlet constraints. This is a focused desk simulation, not a general rigid-body engine. Lamp, telephone, doors and drawer are contextual stateful props rather than freely movable rigid bodies.

`src/render.js` draws local 480×270 plates, 48×80 sprite frames, props and bounded particles using one requestAnimationFrame loop owned by main.js. Nearest-neighbor rendering preserves hard sprite edges. Glow is a separate low-opacity light layer. Actor animations have explicit rows and duration rules. Real window weather, lamp state, door barricade, open archive, day stage and ambulance choice affect the room. Films compose plate/actor/prop layouts rather than storing full-screen videos. There is no automatic low-detail phone fallback.

`src/audio.js` owns decoded local buffers, group gain nodes, loop nodes and one-shot cleanup. Collision velocity affects impact gain. Sources pan relative to desk position; closed doors apply filtering to contextual sounds. Active telephone/printer/impact noise feeds a visible threat state during late darkness. Captions make the rule usable while muted. The environment is not a stealth action game: approaching threats can be halted with light or a barricade and never create hidden audio-only failure conditions.

Every essential hotspot also has a >=44px button. Canvas coordinates are converted from its current client rectangle, independently of DPR. Only the canvas disables default touch gestures; surrounding page navigation remains available. Pointer IDs, primary-pointer filtering, capture, cancellation, page hiding and resize are handled. A cancelled seal drag cannot select a decision. The named action buttons are full equivalents to seal drops. Lamp placement/reset alternatives preserve investigation access for keyboard users.

## State and persistence

Save schema 3 includes seed/RNG, day, phase, citizen index, evidence, deductions, relationships, choices, flags, equipment, inventory, infection, dialogue variant history, saved prop positions, cinematic identity and preferences. Transient audio nodes, particle arrays and drag state are recreated. Cinematic restoration restarts the short scene safely. A printing job restarts its short timer; completed jobs remain collectible.

Fresh runs clear story consequences and use a new seed; only explicit last-variant metadata is carried over to avoid consecutive repeated wording. The extra day-two encounter changes its request and valid response. Current variants are stored so reload/language switching cannot reroll them. There are finite authored variants, not infinite unique outputs.

SaveStore validates before writes, retains the previous valid save as a backup, tries backup/legacy on corruption, bounds imported data, and rebuilds trusted narrative content from the saved seed. Arbitrary imported strings are not rendered as HTML. Legacy `crlf2` evidence is mapped to canonical IDs. Imported saves are user-controlled game data, not authenticated server truth. There is no cloud synchronization.

## Production and offline

The esbuild pipeline emits minified game.js and CSS, local assets, licenses, policy and manifests into dist/. No source maps, tests or development docs are published by this build. A content-derived cache name installs all required assets atomically. Existing clients retain their running version until closed; new worker activation removes only obsolete Echoes asset caches and never localStorage. Privacy and credit pages retain their own routes when offline.

Capacitor copies this exact directory to Android and iOS; Tauri uses it directly. No platform has a separate story implementation. App lifecycle handlers save/pause; Android Back closes a modal, skips a film or opens a save/resume menu. Native behavior still requires real native testing before release.

## Extending safely

- Add a citizen to the canon-derived case setup, supply both languages, a stable ID, correct response and a distinct actor. Add conditional variants without altering canonical facts.
- Add a sprite as an original PNG atlas and update CAST/animation metadata/asset-manifest. Test native-size silhouette and frame bounds.
- Add a scene to CINEMATICS with a justified environment, caption and composition. Keep skip and natural completion semantically equal.
- Add a clue to EVIDENCE, a physical or record-based acquisition path, and a DEDUCTIONS relationship. Prove ending reachability in tests.
- Acquire third-party assets only from a verified individual license. Retain exact license text and source/transform metadata.
- Run npm test, npm run build, npm run test:browser, npm audit and the build-integrity checker before publishing. Test denied-access alternatives, not only the true route.
- Rebuild dist before cap sync or native builds. Export local saves before changing app IDs or clearing app/browser data.

No unnecessary analytics, accounts, external models, credentials, or copied commercial game assets are present.
