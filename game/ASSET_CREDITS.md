# Original artwork and visual research

Created and Designed by Shahd Mohamed

All 26 PNG assets in asset-manifest.json are original integer-grid drawings produced for this game by tools/art.py. Each exists locally and is loaded by the game or its install manifest. There are sixteen 192×640 transparent character atlases, seven 480×270 environment plates, one prop atlas, and two application icons. No character or background from another game is included.

The character atlases use 48×80 frames with pivot [24,76]. Rows: idle, talk, walk, reach, fear, pain, transform, echo. Each row contains four frames. Timings and looping semantics are in assets/characters/animations.json. Runtime state selection is in src/render.js. Not every row is triggered for every character; rows describe available states, not a claim that every combination is a story event.

Research consulted on 2026-10-10 (references only; no assets copied):

- Lucas Pope, mobile document handling: https://dukope.com/devlogs/papers-please/mobile/ — preserve comparison and decisions; provide readable layouts and task-specific manipulation.
- INMOST official site: https://inmostgame.com/ — interconnected perspectives, environmental decay and emotional pacing.
- Motion Twin animation interview: https://www.nintendolife.com/news/2018/05/feature_reanimating_the_roguelike_with_dead_cells_developer_motiontwin — readable poses and motion. This project's assets are 2D drawings, not Motion Twin's 3D pipeline.
- Lospec cluster tutorials: https://lospec.com/pixel-art-tutorials/tags/clusters — deliberate connected pixel shapes and controlled texture.
- MDN Pointer Events: https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Using_Pointer_Events — unified mouse/pen/touch lifecycle.

Pixel geometry remains sharp; the renderer applies low-intensity light halos separately. The palette uses deep blue-green shadows, aged paper, amber task lighting, desaturated skin ramps and sparse crimson. The Arabic font is served locally.

Noto Sans Arabic is included unmodified from the Google Fonts / Noto project under SIL Open Font License 1.1. Copyright 2022 The Noto Project Authors. Acquired 2026-10-10 from https://github.com/google/fonts/tree/main/ofl/notosansarabic . Its full license is retained in licenses/NotoSansArabic-OFL.txt. This font is excluded from the game's proprietary license. Capacitor Core and App runtime code retain their MIT notices in licenses/.
