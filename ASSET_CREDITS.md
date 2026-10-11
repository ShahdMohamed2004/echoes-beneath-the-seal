# Artwork and asset credits — Living Pixel World 2.2

Created and Designed by Shahd Mohamed

Copyright © 2026 Shahd Mohamed. All rights reserved.

The 26 PNG production assets are original integer-grid project artwork: sixteen 192×1680 character atlases (48×80 frames; 21 action rows × four frames), seven 480×270 environment plates, one original prop atlas and two app icons. Production provenance is recorded in `asset-manifest.json`. The original renderer draws additional desk geometry, documents, physical ink, lens reflections and pooled pixel effects. No Noita, INMOST, Papers Please or ancient-Egypt asset pack artwork is included.

`tools/living-art.py` uses the original project primitives in `tools/art.py` to create individual head proportions, clothing, profile faces, gestures and infection silhouettes. `docs/character-sheets/` contains 16 original design sheets. Infection studies are not a claim that every character becomes infected in the story. Only eligible scene actors use those states. Animation timing, interruption and reduced-motion handling are in `src/animation.js`.

Palette roles: petrol/navy shadows, teal/cyan instrument light, parchment and honey task lighting, violet Echo traces, restrained red-orange danger, natural skin and clothing ramps. Cached source-local halos are separate from crisp sprite pixels. No generated full-screen texture is substituted for gameplay.

References consulted as references, not licensed assets:

- Noita official: https://www.noitagame.com/ — local material properties, bounded interacting systems.
- Lospec directory: https://lospec.com/pixel-art-tutorials/ and https://lospec.com/palette-list/ — references for cluster/palette study; directory listings are not claims that a specific tutorial was reproduced.
- Aseprite: https://www.aseprite.org/docs/animation/ and https://www.aseprite.org/docs/sprite-sheet/ — frame duration, timeline and sheet organization. Pillow generates this game's sheets; Aseprite is not a runtime dependency.
- MDN crisp pixel rendering: https://developer.mozilla.org/en-US/docs/Games/Techniques/Crisp_pixel_art_look
- Lucas Pope mobile document handling: https://dukope.com/devlogs/papers-please/mobile/

Noto Sans Arabic remains unmodified under SIL Open Font License 1.1, Copyright 2022 The Noto Project Authors. Source: https://github.com/google/fonts/tree/main/ofl/notosansarabic . Full license: `licenses/NotoSansArabic-OFL.txt`. The font and separately credited CC0 audio are excluded from the proprietary project license. Capacitor Core/App runtime code retain MIT notices in `licenses/`.
