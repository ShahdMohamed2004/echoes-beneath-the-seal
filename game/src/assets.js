// The review build embeds the exact same assets; installed/web builds use local URLs.
export const assetURL=path=>globalThis.ECHO_ASSETS?.[path]||path;
