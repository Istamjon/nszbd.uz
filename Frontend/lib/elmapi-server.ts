import { createClient } from "@elmapicms/js-sdk";

if (process.env.NODE_ENV !== "production") {
  process.on("warning", (warning) => {
    if (
      warning.name === "Warning" &&
      warning.message.includes("NODE_TLS_REJECT_UNAUTHORIZED")
    ) {
      return;
    }
  });
}

/**
 * Server-only CMS client with the project API token.
 * Lazy-initialized so build-time env placeholder doesn't throw.
 * Never import this module from client components.
 */
let _elmapi: ReturnType<typeof createClient> | null = null;

export function getElmapi() {
  if (!_elmapi) {
    _elmapi = createClient({
      baseUrl: process.env.ELMAPI_BASE_URL!,
      projectId: process.env.ELMAPI_PROJECT_ID!,
      apiKey: process.env.ELMAPI_API_KEY!,
    });
  }
  return _elmapi;
}

// Backward-compatible named export via Proxy
export const elmapi = new Proxy({} as ReturnType<typeof createClient>, {
  get(_target, prop) {
    return (getElmapi() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
