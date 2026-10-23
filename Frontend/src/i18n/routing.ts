import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["uz", "ru", "en"],
  defaultLocale: "uz",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

// Navigation APIs configured with next-intl routing
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
