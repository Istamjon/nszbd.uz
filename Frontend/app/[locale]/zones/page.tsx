import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight, RotateCcw, Maximize2, LandPlot, Factory, Users } from "lucide-react";
import { getIndustrialZones } from "@/lib/content";
import { getMediaUrl } from "@/lib/media";
import { localePath } from "@/i18n/config";
import { Pagination } from "@/components/pagination";
import { Breadcrumb } from "@/components/breadcrumb";
import { ZonesFilters } from "@/components/zones-filters";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ region?: string; type?: string; page?: string }>;
};

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

export default async function ZonesPage({ params, searchParams }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  const { region: selectedRegion, type: selectedType, page } = await searchParams;

  const allZones = await getIndustrialZones(locale);

  const districts = [
    { label: dict.zonesPage.allRegions, value: "" },
    { label: dict.districts.karmana, value: "karmana" },
    { label: dict.districts.navoiy, value: "navoiy" },
    { label: dict.districts.zarafshon, value: "zarafshon" },
    { label: dict.districts.qiziltepa, value: "qiziltepa" },
    { label: dict.districts.gozgon, value: "gozgon" },
    { label: dict.districts.navbahor, value: "navbahor" },
    { label: dict.districts.uchquduq, value: "uchquduq" },
    { label: dict.districts.tomdi, value: "tomdi" },
    { label: dict.districts.konimex, value: "konimex" },
    { label: dict.districts.nurota, value: "nurota" },
    { label: dict.districts.xatirchi, value: "xatirchi" },
  ];

  const zoneTypeOptions = [
    { label: dict.zonesPage.allTypes, value: "" },
    { label: dict.zonesPage.types.youth, value: "youth" },
    { label: dict.zonesPage.types.business, value: "business" },
  ];

  const filteredZones = allZones.filter((z) => {
    // 1. Region filter
    if (selectedRegion && selectedRegion !== "") {
      const matchers = districtMatchers[selectedRegion] || [selectedRegion.toLowerCase()];
      const rawReg = Array.isArray(z.fields.region)
        ? z.fields.region.join(" ")
        : String(z.fields.region || "");
      const regText = `${rawReg} ${z.fields.name || ""}`.toLowerCase();
      const hasRegionMatch = matchers.some((m) => regText.includes(m.toLowerCase()));
      if (!hasRegionMatch) return false;
    }

    // 2. Type filter
    if (selectedType && selectedType !== "") {
      const matchers = typeMatchers[selectedType] || [selectedType.toLowerCase()];
      const rawType = Array.isArray(z.fields["zone-type"])
        ? z.fields["zone-type"].join(" ")
        : String(z.fields["zone-type"] || "");
      const typeText = rawType.toLowerCase();
      const hasTypeMatch = matchers.some((m) => typeText.includes(m.toLowerCase()));
      if (!hasTypeMatch) return false;
    }

    return true;
  });

  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(filteredZones.length / pageSize));
  const safeCurrentPage = Math.min(Math.max(1, parseInt(page || "1", 10) || 1), totalPages);
  const paginatedZones = filteredZones.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize
  );

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb locale={locale} items={[{ label: dict.nav.zones }]} />

      {/* Header with right-aligned single row dropdown filters */}
      <div className="mb-10 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#010c22] dark:text-white mb-4">
              {dict.zonesPage.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {dict.zonesPage.subtitle}
            </p>
          </div>

          {/* Right corner single-row dropdown filters */}
          <div className="shrink-0 self-start md:self-end">
            <ZonesFilters
              selectedRegion={selectedRegion}
              selectedType={selectedType}
              districts={districts}
              zoneTypes={zoneTypeOptions}
              labels={{
                region: dict.zonesPage.filterRegion,
                type: dict.zonesPage.filterType,
                reset: dict.zonesPage.resetFilters,
              }}
            />
          </div>
        </div>
      </div>

      {/* Zones Grid */}
      {paginatedZones.length === 0 ? (
        <div className="py-16 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-[#041438] border border-slate-200 dark:border-slate-800 rounded-md p-8">
          <p className="text-base font-semibold mb-3">{dict.zonesPage.noZonesFound}</p>
          <Link
            href={localePath(locale, "/zones")}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#D19C30] hover:bg-[#b88523] rounded-md transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{dict.zonesPage.resetFilters}</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedZones.map((zone) => {
            const imageUrl = getMediaUrl(zone.fields.image) || "/zone-banner.jpg";

            return (
              <div
                key={zone.uuid}
                className="flex flex-col bg-white dark:bg-[#041438] border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-[#D19C30]/70 dark:hover:border-[#D19C30]/60 transition-all duration-300 ease-out group"
              >
                <div className="relative h-48 bg-slate-900 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={zone.fields.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  {(() => {
                    const reg = Array.isArray(zone.fields.region)
                      ? zone.fields.region[0]
                      : zone.fields.region;
                    const cleanReg = String(reg || "").trim();
                    if (!cleanReg) return null;
                    return (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-[#D19C30] text-white">
                          <MapPin className="w-3 h-3" />
                          {cleanReg}
                        </span>
                      </div>
                    );
                  })()}
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    {(() => {
                      const cardZoneType = Array.isArray(zone.fields["zone-type"])
                        ? zone.fields["zone-type"][0]
                        : zone.fields["zone-type"];
                      if (!cardZoneType) return null;
                      return (
                        <span className="text-[11px] font-bold text-[#D19C30] uppercase tracking-wider block mb-1">
                          {cardZoneType}
                        </span>
                      );
                    })()}
                    <h3 className="text-lg font-bold text-[#010c22] dark:text-white group-hover:text-[#D19C30] transition-colors mb-3">
                      {zone.fields.name}
                    </h3>
                    {zone.fields.description && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-6">
                        {zone.fields.description.replace(/<[^>]+>/g, "")}
                      </p>
                    )}

                    {/* 4 Key indicators in a single row without border or rounded */}
                    <div className="grid grid-cols-4 items-center gap-2 py-3 px-3 bg-slate-50 dark:bg-[#010c22]/60 mb-6 text-xs">
                      {/* 1. Umumiy yer maydoni */}
                      <div
                        className="flex items-center gap-1.5"
                        title={dict.zonesPage.totalArea}
                      >
                        <Maximize2 className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
                        <span className="font-bold text-slate-900 dark:text-white whitespace-nowrap text-xs">
                          {zone.fields["total-area"] || 0}
                          <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400 ml-0.5">
                            {dict.zonesPage.areaUnit}
                          </span>
                        </span>
                      </div>

                      {/* 2. Bo'sh yer maydoni */}
                      <div
                        className="flex items-center gap-1.5"
                        title={dict.zonesPage.freeArea}
                      >
                        <LandPlot className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap text-xs">
                          {zone.fields["free-area"] || 0}
                          <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400 ml-0.5">
                            {dict.zonesPage.areaUnit}
                          </span>
                        </span>
                      </div>

                      {/* 3. Faoliyat yuritayotgan korxonalar */}
                      <div
                        className="flex items-center gap-1.5"
                        title={dict.zonesPage.enterprises}
                      >
                        <Factory className="w-4 h-4 text-[#D19C30] shrink-0" />
                        <span className="font-bold text-slate-900 dark:text-white whitespace-nowrap text-xs">
                          {zone.fields["enterprises-count"] || 0}
                        </span>
                      </div>

                      {/* 4. Yaratilgan ish o'rinlari */}
                      <div
                        className="flex items-center gap-1.5"
                        title={dict.zonesPage.jobs}
                      >
                        <Users className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span className="font-bold text-slate-900 dark:text-white whitespace-nowrap text-xs">
                          {zone.fields["jobs-created"] || 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Link
                      href={localePath(locale, `/zones/${zone.uuid}`)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D19C30] group-hover:translate-x-1.5 transition-transform duration-200 ease-out"
                    >
                      <span>{dict.zonesPage.details}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          baseUrl={localePath(locale, "/zones")}
          queryParams={{ region: selectedRegion, type: selectedType }}
          dict={dict.pagination}
          totalItems={filteredZones.length}
          pageSize={pageSize}
        />
      )}
    </div>
  );
}
