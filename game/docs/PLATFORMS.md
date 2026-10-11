# Platform and release handoff

All wrappers consume the same `dist/`. No native release artifacts were built or signed in this Linux workspace. Generating a Capacitor project is not an APK/IPA build, a simulator build is not an installable iPhone release, and desktop configuration is not a verified installer.

| Target | Implemented | Verification still required |
|---|---|---|
| Web | Production build, original assets, shared gameplay, bilingual UI | Live deployment after approval; Firefox and Safari engine checks |
| PWA | Relative manifest, icons, complete versioned asset cache, installation guidance | Actual standalone installation/update lifecycle on Android and iPhone |
| Android | Real Gradle project, shared assets, original launcher/splash, RTL, lifecycle/back handling | JDK 21 + Android SDK build, emulator/device playthrough, signing APK/AAB |
| iOS | Real Xcode project, iOS 16 target, orientation/safe area, icons/splash, shared assets | macOS/Xcode/CocoaPods, simulator/device playthrough, signing, TestFlight/App Store review |
| Desktop | Tauri Rust/configuration and platform icons | Rust + platform WebView toolchains, installers, install/uninstall/save/audio checks, signing/notarization |

## Android

`npm ci && npm run native:sync`, then use Android Studio or `cd android && ./gradlew assembleDebug` with JDK 21 and SDK prerequisites. A debug APK is a development artifact, not a production-signed release. Configure release signing in the local/CI secure environment, never in committed files. Build `assembleRelease` and `bundleRelease` only after that configuration and actual device validation. Android cloud backup is disabled; this project does not promise cloud save synchronization.

## iOS

On a supported macOS/Xcode host, install Node and CocoaPods, run `npm ci && npm run native:sync`, then open the workspace with `npx cap open ios`. Set the authorized Apple development team. Validate portrait, landscape, interrupted audio, app suspension, Back-equivalent navigation, offline startup and save import/export. Review native dependency privacy declarations using the actual release toolchain. Submit only with the creator’s Apple account and explicit release authorization. No Apple account, certificate, provisioning profile or App Store review was available here.

## Desktop

Install Tauri prerequisites for each target OS, then `npm ci && npx tauri build`. The supplied wrapper uses the same local game, so it does not merely open the public website. Code signing and notarization are not configured. Test the real generated installer and application before distributing it. Do not label unsigned packages as signed or bypass operating-system warnings.

## GitHub Pages

Existing public URL: https://shahdmohamed2004.github.io/echoes-beneath-the-seal/

The current GitHub connection has admin/push permissions. No public mutation is performed until publication approval. The production build uses relative URLs; tests serve it under exactly this project subpath. Select GitHub Actions as the Pages build source and run `Publish approved web build` on the approved revision. It runs mandatory tests and deploys only the production directory. Verify the site, privacy page, service worker version and legacy save recovery afterward. Keep earlier verified build artifacts for rollback.

Existing public development source remains public unless the owner chooses a separate private development repository. Production-only publishing does not conceal source already committed to a public branch. Do not change repository visibility/permissions as an incidental deployment step.

## Store preparation

Branding, application IDs, icons, description, privacy page, author notices and shared core are supplied. Store content-rating forms must honestly disclose psychological horror, infection and implied violence. No certified age rating has been assigned. GitHub issue tracker is the supplied support route; the owner should choose any store-required support email before submitting. No account, ad, analytics or tracking SDK is added. Re-evaluate data-safety declarations against the exact signed native package before submission.

## Distribution and checksums

Only the source, verified web build and standalone review HTML are deliverable artifacts from this session. SHA256SUMS.txt covers those exact archives. Future native workflows upload review artifacts only after successful builds; they do not automatically create public releases. Run actual platform acceptance tests, then produce signed releases and regenerate checksums. Checksums detect file mismatches; they do not establish authorship or replace signing.

No absolute anti-copying, security, performance, store approval or cross-device-save guarantee is made.
