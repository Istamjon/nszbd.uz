import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  CheckCircle2,
  Maximize2,
  LandPlot,
  Factory,
  Users,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { getIndustrialZone, getProjects } from "@/lib/content";
import { getMediaUrl } from "@/lib/media";
import { localePath } from "@/i18n/config";
import { Breadcrumb } from "@/components/breadcrumb";
import { ZoneCtaBanner } from "@/components/zone-cta-banner";

type PageProps = {
  params: Promise<{ locale: string; id: string }>;
};

// Professional SVG Icons without background
function GasIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2c.5 2.5 2 4.5 3.5 6.5C17 10.5 18 13 18 15.5A6 6 0 0 1 6 15.5c0-2 .5-3.5 1.5-5 1.5 2 3.5 2.5 4.5 1 1-1.5 0-3.5 0-5.5 0-1.5.5-3 0-4Z" />
      <path d="M12 14c0 1.5-1 2.5-2 2.5s-2-1-2-2.5 1-2 2-3c1 1 2 1.5 2 3Z" />
    </svg>
  );
}

function WaterIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  );
}

function ElectricityIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function RoadIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19L8 5h8l4 14" />
      <line x1="12" y1="8" x2="12" y2="11" />
      <line x1="12" y1="14" x2="12" y2="17" />
    </svg>
  );
}

function EAuksionLogo({ className = "h-8" }: { className?: string }) {
  return (
    <div className="inline-flex items-center">
      <div className="px-2.5 py-1.5 rounded-md bg-white border border-slate-200/80 shadow-xs inline-flex items-center">
        <Image
          src="https://static.e-auksion.uz/images/logo2.png"
          alt="E-Auksion"
          width={160}
          height={40}
          style={{ width: "auto" }}
          className={`${className} w-auto object-contain`}
          priority
        />
      </div>
    </div>
  );
}

// Matchers for linking badges back to /zones filters
const districtMatchers: Record<string, string[]> = {
  karmana: ["karman", "карман"],
  navoiy: ["navoiy", "навои"],
  zarafshon: ["zarafsh", "зарафш"],
  qiziltepa: ["qiziltep", "кызылтеп"],
  gozgon: ["gozgon", "g'ozg'on", "газган"],
  navbahor: ["navbahor", "навбахор"],
  uchquduq: ["uchquduq", "учкудук"],
  tomdi: ["tomdi", "тамд"],
  konimex: ["konimex", "канимех"],
  nurota: ["nurota", "нурат"],
  xatirchi: ["xatirchi", "хатырч"],
};

const typeMatchers: Record<string, string[]> = {
  youth: ["yoshlar", "молодёж", "youth"],
  business: ["tadbirkor", "предприн", "business", "kichik", "малая", "small", "maxsus", "специаль"],
};

function getRegionParam(regionText: string): string {
  const lower = regionText.toLowerCase();
  for (const [slug, patterns] of Object.entries(districtMatchers)) {
    if (patterns.some((p) => lower.includes(p))) {
      return slug;
    }
  }
  return "";
}

function getTypeParam(typeText: string): string {
  const lower = typeText.toLowerCase();
  for (const [slug, patterns] of Object.entries(typeMatchers)) {
    if (patterns.some((p) => lower.includes(p))) {
      return slug;
    }
  }
  return "";
}

export default async function SingleZonePage({ params }: PageProps) {
  const { locale: raw, id } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  const [cmsZone, allProjects] = await Promise.all([
    getIndustrialZone(id, locale),
    getProjects(locale),
  ]);

  if (!cmsZone) {
    notFound();
  }

  const imageUrl = getMediaUrl(cmsZone.fields.image) || "/zone-banner.jpg";

  const districtRel = cmsZone.fields.district;
  const districtName =
    typeof districtRel === "object" && districtRel !== null
      ? districtRel.fields?.name
      : undefined;

  const rawZoneType = Array.isArray(cmsZone.fields["zone-type"])
    ? cmsZone.fields["zone-type"][0] || ""
    : typeof cmsZone.fields["zone-type"] === "string"
    ? cmsZone.fields["zone-type"]
    : "";

  const rawRegion = Array.isArray(cmsZone.fields.region)
    ? cmsZone.fields.region[0] || ""
    : typeof cmsZone.fields.region === "string"
    ? cmsZone.fields.region
    : "";

  const finalRegion = String(districtName || rawRegion || "").trim();

  const rawLotUrls = cmsZone.fields["lot-urls"];
  const lotUrls: string[] = Array.isArray(rawLotUrls)
    ? (rawLotUrls as unknown[]).map((s) => String(s || "").trim()).filter(Boolean)
    : typeof rawLotUrls === "string" && rawLotUrls.trim()
    ? [rawLotUrls.trim()]
    : [];

  const zone = {
    name: cmsZone.fields.name,
    region: finalRegion,
    zoneType: rawZoneType,
    totalArea: cmsZone.fields["total-area"] || 0,
    freeArea: cmsZone.fields["free-area"] || 0,
    enterprises: cmsZone.fields["enterprises-count"] || 0,
    jobs: cmsZone.fields["jobs-created"] || 0,
    infrastructure: cmsZone.fields.infrastructure || "",
    description: cmsZone.fields.description?.replace(/<[^>]+>/g, "").trim() || "",
    lotDescription: (cmsZone.fields["lot-description"] || "").trim(),
    lotUrls,
  };

  const zoneProjects = (allProjects || []).filter((p) => {
    const zRel: any = p.fields["sanoat-zonasi"];
    if (!zRel) return false;
    const rels = Array.isArray(zRel) ? zRel : [zRel];
    return rels.some((r) => {
      if (typeof r === "string" || typeof r === "number") {
        return (
          String(r) === String(id) ||
          String(r) === String(cmsZone.uuid) ||
          String(r) === String((cmsZone as any).id)
        );
      }
      if (typeof r === "object" && r !== null) {
        if (r.uuid && (r.uuid === cmsZone.uuid || r.uuid === id)) return true;
        if (
          r.id &&
          (String(r.id) === String((cmsZone as any).id) || String(r.id) === String(id))
        ) {
          return true;
        }
        if (
          r.fields?.name &&
          zone.name &&
          r.fields.name.toLowerCase().trim() === zone.name.toLowerCase().trim()
        ) {
          return true;
        }
      }
      return false;
    });
  });

  const parseLotDescriptions = (desc: string, count: number): string[] => {
    if (!desc) return [];
    const pMatches = desc.match(/<p[\s\S]*?<\/p>/gi);
    if (pMatches && pMatches.length >= count) {
      return pMatches.map((p) => p.trim());
    }
    const doubleBreak = desc.split(/\r?\n\s*\r?\n/).map((s) => s.trim()).filter(Boolean);
    if (doubleBreak.length >= count) {
      return doubleBreak;
    }
    const singleBreak = desc.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
    if (singleBreak.length >= count) {
      return singleBreak;
    }
    return doubleBreak.length > 0 ? doubleBreak : [desc];
  };

  const descParagraphs = parseLotDescriptions(zone.lotDescription, zone.lotUrls.length);

  const lotsList =
    zone.lotUrls.length > 0
      ? zone.lotUrls.map((url, idx) => ({
          url,
          description:
            descParagraphs[idx] ||
            (descParagraphs.length === 1 ? descParagraphs[0] : zone.lotDescription),
        }))
      : zone.lotDescription
      ? [{ url: "https://e-auksion.uz", description: zone.lotDescription }]
      : [];

  const rawInfra = cmsZone.fields.infrastructure;
  const infraArray: string[] = Array.isArray(rawInfra)
    ? (rawInfra as unknown[]).map((s) => String(s || "").trim()).filter(Boolean)
    : typeof rawInfra === "string"
    ? rawInfra.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const dynamicInfraItems = infraArray.map((label, idx) => {
    const lower = String(label).toLowerCase();
    let Icon: React.ComponentType<{ className?: string }> = CheckCircle2;
    let color = "text-[#D19C30]";

    if (lower.includes("gaz") || lower.includes("gas")) {
      Icon = GasIcon;
      color = "text-amber-500 dark:text-amber-400";
    } else if (lower.includes("suv") || lower.includes("вод") || lower.includes("water")) {
      Icon = WaterIcon;
      color = "text-sky-500 dark:text-sky-400";
    } else if (
      lower.includes("elektr") ||
      lower.includes("электр") ||
      lower.includes("power") ||
      lower.includes("energy")
    ) {
      Icon = ElectricityIcon;
      color = "text-amber-400 dark:text-amber-300";
    } else if (
      lower.includes("yo‘l") ||
      lower.includes("yol") ||
      lower.includes("yo'l") ||
      lower.includes("дорог") ||
      lower.includes("road") ||
      lower.includes("asfalt") ||
      lower.includes("асфальт")
    ) {
      Icon = RoadIcon;
      color = "text-emerald-500 dark:text-emerald-400";
    }

    return {
      id: idx,
      label,
      Icon,
      color,
    };
  });

  const typeParam = getTypeParam(zone.zoneType);
  const regionParam = getRegionParam(zone.region);

  const typeHref = typeParam
    ? `${localePath(locale, "/zones")}?type=${encodeURIComponent(typeParam)}`
    : localePath(locale, "/zones");

  const regionHref = regionParam
    ? `${localePath(locale, "/zones")}?region=${encodeURIComponent(regionParam)}`
    : localePath(locale, "/zones");

  return (
    <div className="py-10 sm:py-14 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Bar: Breadcrumb */}
      <div>
        <Breadcrumb
          locale={locale}
          items={[
            { label: dict.nav.zones, href: localePath(locale, "/zones") },
            { label: zone.name },
          ]}
        />
      </div>

      {/* Header Section: Title and Badges (filter links) */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold">
            {zone.zoneType && (
              <Link
                href={typeHref}
                title={locale === "ru" ? "Фильтровать по типу" : locale === "en" ? "Filter by type" : "Turi bo'yicha saralash"}
                className="px-2.5 py-1 bg-[#D19C30]/10 text-[#D19C30] hover:bg-[#D19C30] hover:text-white dark:bg-[#D19C30]/20 dark:hover:bg-[#D19C30] dark:hover:text-white uppercase tracking-wider font-bold rounded-md transition-all shadow-sm"
              >
                {zone.zoneType}
              </Link>
            )}
            {zone.region && (
              <Link
                href={regionHref}
                title={locale === "ru" ? "Фильтровать по району" : locale === "en" ? "Filter by region" : "Hudud bo'yicha saralash"}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-[#D19C30] dark:hover:text-[#D19C30] rounded-md transition-all shadow-sm"
              >
                <MapPin className="w-3.5 h-3.5 text-[#D19C30]" />
                <span>{zone.region}</span>
              </Link>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#010c22] dark:text-white">
            {zone.name}
          </h1>
        </div>
      </div>

      {/* Zone Banner Image */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full bg-slate-900 overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
        <Image
          src={imageUrl}
          alt={zone.name}
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1152px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 4 Key Indicators Strip (Full-width, unified) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 bg-white dark:bg-[#041438] border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* 1. Umumiy yer maydoni */}
        <div className="flex items-center gap-3" title={dict.zonesPage.totalArea}>
          <Maximize2 className="w-6 h-6 text-[#D19C30] shrink-0" />
          <div>
            <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
              {dict.zonesPage.totalArea}
            </span>
            <span className="text-base sm:text-lg font-extrabold text-[#010c22] dark:text-white">
              {zone.totalArea} <span className="text-xs font-medium text-slate-500">{dict.zonesPage.areaUnit}</span>
            </span>
          </div>
        </div>

        {/* 2. Bo'sh yer maydoni */}
        <div className="flex items-center gap-3" title={dict.zonesPage.freeArea}>
          <LandPlot className="w-6 h-6 text-[#D19C30] shrink-0" />
          <div>
            <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
              {dict.zonesPage.freeArea}
            </span>
            <span className="text-base sm:text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
              {zone.freeArea} <span className="text-xs font-medium text-slate-500">{dict.zonesPage.areaUnit}</span>
            </span>
          </div>
        </div>

        {/* 3. Faoliyat yuritayotgan korxonalar */}
        <div className="flex items-center gap-3" title={dict.zonesPage.enterprises}>
          <Factory className="w-6 h-6 text-[#D19C30] shrink-0" />
          <div>
            <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
              {dict.zonesPage.enterprises}
            </span>
            <span className="text-base sm:text-lg font-extrabold text-[#D19C30]">
              {zone.enterprises}
            </span>
          </div>
        </div>

        {/* 4. Yaratilgan ish o'rinlari */}
        <div className="flex items-center gap-3" title={dict.zonesPage.jobs}>
          <Users className="w-6 h-6 text-[#D19C30] shrink-0" />
          <div>
            <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
              {dict.zonesPage.jobs}
            </span>
            <span className="text-base sm:text-lg font-extrabold text-[#010c22] dark:text-white">
              {zone.jobs}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Details */}
      {(zone.description || dynamicInfraItems.length > 0) && (
        <div className="space-y-6">
          {/* Description */}
          {zone.description && (
            <div className="p-6 sm:p-8 bg-white dark:bg-[#041438] border border-slate-200 dark:border-slate-800 space-y-3">
              <h2 className="text-lg font-bold text-[#010c22] dark:text-white">
                {dict.zonesPage.description}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {zone.description}
              </p>
            </div>
          )}

          {/* Infrastructure List (Dynamic items directly from CMS admin panel with professional SVG icons) */}
          {dynamicInfraItems.length > 0 && (
            <div className="p-6 sm:p-8 bg-white dark:bg-[#041438] border border-slate-200 dark:border-slate-800 space-y-4">
              <h2 className="text-lg font-bold text-[#010c22] dark:text-white">
                {dict.zonesPage.infrastructure}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {dynamicInfraItems.map((item) => {
                  const Icon = item.Icon;
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3.5 bg-slate-50 dark:bg-[#010c22]/50 border border-slate-200/60 dark:border-slate-800/60"
                    >
                      <Icon className={`w-5 h-5 shrink-0 ${item.color}`} />
                      <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100">
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* E-Auksion Lot Section (Logo + Description + Button bir qatorda) */}
      {lotsList.length > 0 && (
        <div className="space-y-3">
          {lotsList.map((lot, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 bg-white dark:bg-[#041438] border border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-sm rounded-md"
            >
              <div className="shrink-0 flex items-center">
                <EAuksionLogo />
              </div>

              <div className="flex-1 min-w-0">
                {lot.description ? (
                  <div
                    className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: lot.description }}
                  />
                ) : (
                  <p className="text-xs sm:text-sm text-slate-500 italic">
                    {dict.zonesPage.viewLotAuction}
                  </p>
                )}
              </div>

              <div className="shrink-0 flex items-center">
                <a
                  href={lot.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold rounded-md text-white bg-[#0052cc] hover:bg-[#0041a8] active:scale-95 transition-all shadow-sm whitespace-nowrap"
                >
                  <ExternalLink className="w-4 h-4 shrink-0" />
                  <span>{dict.zonesPage.viewLotAuction}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Loyihalar ro'yxati (Korxona nomi, qisqacha matn, button) */}
      {zoneProjects.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#010c22] dark:text-white">
              {locale === "ru"
                ? "Предприятия на территории зоны"
                : locale === "en"
                ? "Enterprises in This Zone"
                : "Zona hududidagi korxonalar"}
            </h2>
          </div>

          <div className="space-y-3">
            {zoneProjects.map((project) => {
              const companyName = project.fields["company-name"] || project.fields.title || "";
              const shortText =
                project.fields.description?.replace(/<[^>]+>/g, "").trim() ||
                project.fields["in-progress-project"]?.replace(/<[^>]+>/g, "").trim() ||
                project.fields["completed-project"]?.replace(/<[^>]+>/g, "").trim() ||
                "";

              return (
                <div
                  key={project.uuid}
                  className="p-5 sm:p-6 bg-white dark:bg-[#041438] border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-sm rounded-md hover:border-[#D19C30]/50 transition-colors group"
                >
                  <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
                    <Factory className="w-5 h-5 text-[#D19C30] shrink-0 mt-0.5 sm:mt-0" />
                    <div className="space-y-1 flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-[#010c22] dark:text-white truncate group-hover:text-[#D19C30] transition-colors">
                        {companyName}
                      </h3>
                      {shortText && (
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                          {shortText}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0">
                    <Link
                      href={localePath(locale, `/projects/${project.uuid}`)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-md text-white bg-[#010c22] hover:bg-[#D19C30] dark:bg-slate-800 dark:hover:bg-[#D19C30] active:scale-95 transition-all shadow-sm whitespace-nowrap"
                    >
                      <span>{dict.projectsPage.details}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom Assistance Banner (Compact, CTA with ApplyModal) */}
      <ZoneCtaBanner
        locale={locale}
        title={dict.zonesPage.ctaTitle}
        desc={dict.zonesPage.ctaDesc}
        ctaApply={dict.zonesPage.ctaApply}
        ctaContact={dict.zonesPage.ctaContact}
      />
    </div>
  );
}
