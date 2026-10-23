import { NotFoundError } from "@elmapicms/js-sdk";
import type { Locale } from "@/i18n/config";
import { elmapi } from "./elmapi-server";
import type {
  ContentEntry,
  SiteSettingsFields,
  ZoneFields,
  ProjectFields,
  LeadershipFields,
  NewsFields,
  LegalDocFields,
  NoteFields,
  Paginated,
} from "./types";

export type NoteSort =
  | "published_at:desc"
  | "published_at:asc"
  | "title:asc"
  | "title:desc";

export type ListNotesOptions = {
  page?: number;
  perPage?: number;
  titleContains?: string;
  slugEq?: string;
  slugContains?: string;
  authorContains?: string;
  publishedAfter?: string;
  matchTitleOrSlug?: string;
  sort?: NoteSort;
};

export function asList<T>(response: T[] | { data: T[] } | unknown): T[] {
  if (Array.isArray(response)) return response as T[];
  if (response && typeof response === "object" && "data" in response) {
    return (response as { data: T[] }).data;
  }
  return [];
}

export function buildNotesWhere(
  options: ListNotesOptions = {},
): Record<string, unknown> | undefined {
  const where: Record<string, unknown> = {};

  if (options.matchTitleOrSlug) {
    const term = options.matchTitleOrSlug;
    where.or = [{ title: { like: term } }, { slug: { like: term } }];
  } else {
    if (options.titleContains) {
      where.title = { like: options.titleContains };
    }
    if (options.slugEq) {
      where.slug = { eq: options.slugEq };
    } else if (options.slugContains) {
      where.slug = { like: options.slugContains };
    }
  }

  if (options.authorContains) {
    where["author-name"] = { like: options.authorContains };
  }

  if (options.publishedAfter) {
    where.published_at = { gte: options.publishedAfter };
  }

  return Object.keys(where).length > 0 ? where : undefined;
}

export async function listNotes(
  locale: Locale,
  options: ListNotesOptions = {},
): Promise<Paginated<ContentEntry<NoteFields>>> {
  try {
    const res = await elmapi.content.list("notes", {
      locale,
      page: options.page ?? 1,
      limit: options.perPage ?? 10,
    });
    if (Array.isArray(res)) {
      return { data: res as ContentEntry<NoteFields>[] };
    }
    return res as Paginated<ContentEntry<NoteFields>>;
  } catch {
    return { data: [] };
  }
}

export async function countNotes(
  locale: Locale,
  options: ListNotesOptions = {},
): Promise<number> {
  try {
    const res = await elmapi.content.list("notes", { locale });
    return asList(res).length;
  } catch {
    return 0;
  }
}

export async function listNotesOffset(
  locale: Locale,
  options: { limit?: number; offset?: number } = {},
): Promise<ContentEntry<NoteFields>[]> {
  try {
    const res = await elmapi.content.list("notes", {
      locale,
      ...options,
    });
    return asList<ContentEntry<NoteFields>>(res);
  } catch {
    return [];
  }
}

export async function getNoteBySlug(
  locale: Locale,
  slug: string,
): Promise<ContentEntry<NoteFields> | null> {
  try {
    const res = await elmapi.content.list("notes", {
      locale,
      where: { slug: { eq: slug } },
    });
    const list = asList<ContentEntry<NoteFields>>(res);
    return list[0] ?? null;
  } catch {
    return null;
  }
}

/** Singleton: Site settings */
export async function getSiteSettings(
  locale: Locale,
): Promise<ContentEntry<SiteSettingsFields> | null> {
  try {
    return (await elmapi.content.list("site-settings", {
      state: "published",
      locale,
    })) as ContentEntry<SiteSettingsFields>;
  } catch (error) {
    if (error instanceof NotFoundError) return null;
    return null;
  }
}

/** Sanoat zonalari ro'yxati */
export async function getIndustrialZones(
  locale: Locale,
): Promise<ContentEntry<ZoneFields>[]> {
  try {
    const res = await elmapi.content.list("sanoat-zonalari", {
      state: "published",
      locale,
      limit: 100,
    });
    return asList<ContentEntry<ZoneFields>>(res);
  } catch {
    return [];
  }
}

/** Bitta sanoat zonasi */
export async function getIndustrialZone(
  id: string,
  locale: Locale,
): Promise<ContentEntry<ZoneFields> | null> {
  try {
    // 1. To'g'ridan-to'g'ri so'ralgan locale bo'yicha olish
    try {
      const res = await elmapi.content.get("sanoat-zonalari", id, { locale });
      if (res) return res as ContentEntry<ZoneFields>;
    } catch {}

    // 2. Agar ID boshqa tilda bo'lsa, translation_locale orqali mos tarjimasini olish
    try {
      const resTrans = await elmapi.content.get("sanoat-zonalari", id, {
        translation_locale: locale,
      } as any);
      if (resTrans) return resTrans as ContentEntry<ZoneFields>;
    } catch {}

    // 3. Fallback: asl yozuvni o'zini qaytarish
    return (await elmapi.content.get("sanoat-zonalari", id)) as ContentEntry<ZoneFields>;
  } catch {
    return null;
  }
}

/** Investitsiya loyihalari ro'yxati */
export async function getProjects(
  locale: Locale,
): Promise<ContentEntry<ProjectFields>[]> {
  try {
    const res = await elmapi.content.list("loyihalar", {
      state: "published",
      locale,
      limit: 100,
    });
    return asList<ContentEntry<ProjectFields>>(res);
  } catch {
    return [];
  }
}

/** Bitta investitsiya loyihasi */
export async function getProject(
  id: string,
  locale: Locale,
): Promise<ContentEntry<ProjectFields> | null> {
  try {
    // 1. To'g'ridan-to'g'ri so'ralgan locale bo'yicha olish
    try {
      const res = await elmapi.content.get("loyihalar", id, { locale });
      if (res) return res as ContentEntry<ProjectFields>;
    } catch {}

    // 2. Agar ID boshqa tilda bo'lsa, translation_locale orqali mos tarjimasini olish
    try {
      const resTrans = await elmapi.content.get("loyihalar", id, {
        translation_locale: locale,
      } as any);
      if (resTrans) return resTrans as ContentEntry<ProjectFields>;
    } catch {}

    // 3. Fallback: asl yozuvni o'zini qaytarish
    return (await elmapi.content.get("loyihalar", id)) as ContentEntry<ProjectFields>;
  } catch {
    return null;
  }
}

/** Rahbariyat ro'yxati */
export async function getLeadership(
  locale: Locale,
): Promise<ContentEntry<LeadershipFields>[]> {
  try {
    const res = await elmapi.content.list("rahbariyat", {
      state: "published",
      locale,
    });
    return asList<ContentEntry<LeadershipFields>>(res);
  } catch {
    return [];
  }
}

/** Yangiliklar ro'yxati */
export async function getNews(
  locale: Locale,
): Promise<ContentEntry<NewsFields>[]> {
  try {
    const res = await elmapi.content.list("yangiliklar", {
      state: "published",
      locale,
      limit: 100,
    });
    return asList<ContentEntry<NewsFields>>(res);
  } catch {
    return [];
  }
}

/** Bitta yangilik */
export async function getSingleNews(
  id: string,
  locale: Locale,
): Promise<ContentEntry<NewsFields> | null> {
  try {
    return (await elmapi.content.get("yangiliklar", id, {
      locale,
    })) as ContentEntry<NewsFields>;
  } catch {
    return null;
  }
}

/** Huquqiy hujjatlar ro'yxati */
export async function getLegalDocuments(
  locale: Locale,
): Promise<ContentEntry<LegalDocFields>[]> {
  try {
    const res = await elmapi.content.list("huquqiy-hujjatlar", {
      state: "published",
      locale,
    });
    return asList<ContentEntry<LegalDocFields>>(res);
  } catch {
    return [];
  }
}

/** Tuman va shaharlar ro'yxati */
export async function getDistricts(
  locale: Locale,
): Promise<ContentEntry<{ name: string; code?: string }>[]> {
  try {
    const res = await elmapi.content.list("tuman-shahar", {
      state: "published",
      locale,
      limit: 100,
    });
    return asList<ContentEntry<{ name: string; code?: string }>>(res);
  } catch {
    return [];
  }
}
