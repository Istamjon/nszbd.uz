import type { NextConfig } from "next";

// Suppress harmless local TLS reject unauthorized warning in local development
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

type ImageRemotePattern = {
  protocol?: "http" | "https";
  hostname: string;
  port?: string;
  pathname?: string;
};

/** Allow next/image for the Elmapi host from ELMAPI_BASE_URL (set at build time). */
function elmapiRemotePatterns(): ImageRemotePattern[] {
  const patterns: ImageRemotePattern[] = [
    { protocol: "http", hostname: "localhost", pathname: "/**" },
    { protocol: "https", hostname: "static.e-auksion.uz", pathname: "/**" },
    { protocol: "https", hostname: "admin.nszbd.uz", pathname: "/**" },
  ];

  const base = process.env.ELMAPI_BASE_URL?.trim();
  if (!base) {
    patterns.push({
      protocol: "https",
      hostname: "elmapicms.test",
      pathname: "/uploads/**",
    });
    return patterns;
  }

  try {
    const url = new URL(base);
    patterns.push({
      protocol: url.protocol === "http:" ? "http" : "https",
      hostname: url.hostname,
      ...(url.port ? { port: url.port } : {}),
      pathname: "/**",
    });
  } catch {
    // ignore invalid ELMAPI_BASE_URL
  }

  return patterns;
}

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
    remotePatterns: elmapiRemotePatterns(),
  },
};

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
