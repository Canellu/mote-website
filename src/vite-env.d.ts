/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * The Cloudflare Web Analytics site token. Set it in the deployment's build
   * environment; leaving it unset is how a local or forked build serves no
   * analytics beacon at all.
   */
  readonly VITE_CF_BEACON_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
