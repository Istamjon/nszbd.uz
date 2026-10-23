export const locales = ["uz", "ru", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "uz";

export const localeLabels: Record<Locale, string> = {
  uz: "O'zbekcha",
  ru: "Русский",
  en: "English",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Build a locale path respecting as-needed prefix (uz has no prefix, ru/en have prefixes) */
export function localePath(locale: Locale, path = ""): string {
  const normalized = path === "/" || path === "" ? "" : path.startsWith("/") ? path : `/${path}`;
  if (locale === defaultLocale) {
    return normalized || "/";
  }
  return `/${locale}${normalized}`;
}

