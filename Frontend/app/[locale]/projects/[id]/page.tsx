import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ExternalLink,
  Coins,
  Users,
  LandPlot,
  Factory,
  MapPin,
  Calendar,
  Building2,
} from "lucide-react";
import { getProject } from "@/lib/content";
import { getMediaUrl } from "@/lib/media";
import { localePath } from "@/i18n/config";
import { Breadcrumb } from "@/components/breadcrumb";
import { ZoneCtaBanner } from "@/components/zone-cta-banner";

type PageProps = {
  params: Promise<{ locale: string; id: string }>;
};

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

export default async function SingleProjectPage({ params }: PageProps) {
  const { locale: raw, id } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  const cmsProject = await getProject(id, locale);
  if (!cmsProject) {
    notFound();
  }

  const imageUrl = getMediaUrl(cmsProject.fields["project-image"]) || "/about-company.jpg";

  const zoneRel = cmsProject.fields["sanoat-zonasi"];
  const zoneName = typeof zoneRel === "object" && zoneRel !== null ? zoneRel.fields?.name : undefined;
  const zoneId = typeof zoneRel === "object" && zoneRel !== null ? zoneRel.uuid : undefined;

  const districtRel = cmsProject.fields.district;
  const districtName = typeof districtRel === "object" && districtRel !== null ? districtRel.fields?.name : undefined;

  const rawLotUrls = cmsProject.fields["lot-urls"] || cmsProject.fields.lots;
  const lotUrls: string[] = Array.isArray(rawLotUrls)
    ? (rawLotUrls as unknown[]).map((s) => String(s || "").trim()).filter(Boolean)
    : typeof rawLotUrls === "string" && rawLotUrls.trim()
    ? [rawLotUrls.trim()]
    : [];

  const project = {
    companyName: cmsProject.fields["company-name"] || "",
    title: cmsProject.fields.title || "",
    description: cmsProject.fields.description?.replace(/<[^>]+>/g, "") || "",
    region: districtName || cmsProject.fields.region || "",
    address: cmsProject.fields.address || "",
    area: cmsProject.fields.area || 0,
    investment: cmsProject.fields["investment-amount"] || "",
    workers: cmsProject.fields["workers-count"] || 0,
    year: cmsProject.fields["established-year"] || 0,
    stir: cmsProject.fields.stir || "",
    status: cmsProject.fields.status || "",
    zone: zoneName,
    zoneId: zoneId,
    lots: lotUrls,
    inProgress: cmsProject.fields["in-progress-project"],
    completed: cmsProject.fields["completed-project"],
    lotDescription: (cmsProject.fields["lot-description"] || "").trim(),
    lotUrls,
  };

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

  const descParagraphs = parseLotDescriptions(project.lotDescription, project.lotUrls.length);

  const lotsList =
    project.lotUrls.length > 0
      ? project.lotUrls.map((url, idx) => ({
          url,
          description:
            descParagraphs[idx] ||
            (descParagraphs.length === 1 ? descParagraphs[0] : project.lotDescription),
        }))
      : project.lotDescription
      ? [{ url: "https://e-auksion.uz", description: project.lotDescription }]
      : [];

  return (
    <div className="py-10 sm:py-14 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Bar: Breadcrumb */}
      <div>
        <Breadcrumb
          locale={locale}
          items={[
            { label: dict.nav.projects, href: localePath(locale, "/projects") },
            { label: project.title },
          ]}
        />
      </div>

      {/* Header Section: Company Name and Title */}
      <div className="space-y-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            {project.companyName && (
              <span className="text-[#D19C30] uppercase tracking-wider font-bold">
                {project.companyName}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#010c22] dark:text-white">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Project Cover Banner */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full bg-slate-900 rounded-md overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1152px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Main Content: Description, In-Progress & Completed Milestones */}
      <div className="bg-white dark:bg-[#041438] p-6 sm:p-10 border border-slate-200 dark:border-slate-800 rounded-md shadow-sm space-y-8">
        {project.description && (
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            {project.description}
          </p>
        )}

        {/* In-progress Project Milestones */}
        {project.inProgress && (
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-[#010c22] dark:text-white">
              {dict.projectsPage.inProgressTitle}
            </h3>
            <div
              className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed prose dark:prose-invert max-w-none whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: project.inProgress }}
            />
          </div>
        )}

        {/* Completed Project Milestones */}
        {project.completed && (
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-[#010c22] dark:text-white">
              {dict.projectsPage.completedTitle}
            </h3>
            <div
              className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed prose dark:prose-invert max-w-none whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: project.completed }}
            />
          </div>
        )}
      </div>

      {/* Loyiha haqida batafsil ma'lumot (Pastida, bitta sahifada) */}
      <div className="bg-white dark:bg-[#041438] p-6 sm:p-8 border border-slate-200 dark:border-slate-800 rounded-md shadow-sm space-y-6">
        <h2 className="text-lg sm:text-xl font-bold text-[#010c22] dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
          {dict.projectsPage.projectDetails}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Sanoat zonasi */}
          {project.zone && (
            <div className="flex items-start gap-3">
              <Factory className="w-5 h-5 text-[#D19C30] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-xs text-slate-500 dark:text-slate-400 block uppercase tracking-wider mb-0.5">
                  {dict.projectsPage.zoneLabel}
                </span>
                {project.zoneId ? (
                  <Link
                    href={localePath(locale, `/zones/${project.zoneId}`)}
                    className="text-sm font-bold text-[#D19C30] hover:underline block truncate"
                  >
                    {project.zone}
                  </Link>
                ) : (
                  <span className="text-sm font-bold text-[#D19C30] block truncate">
                    {project.zone}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Investitsiya hajmi */}
          {project.investment && (
            <div className="flex items-start gap-3">
              <Coins className="w-5 h-5 text-[#D19C30] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-xs text-slate-500 dark:text-slate-400 block uppercase tracking-wider mb-0.5">
                  {dict.projectsPage.investment}
                </span>
                <span className="text-sm font-bold text-[#D19C30] block truncate">
                  {project.investment}
                </span>
              </div>
            </div>
          )}

          {/* Ish o'rinlari */}
          {project.workers !== 0 && (
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-[#D19C30] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-xs text-slate-500 dark:text-slate-400 block uppercase tracking-wider mb-0.5">
                  {dict.projectsPage.jobs}
                </span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100 block truncate">
                  {project.workers} {dict.projectsPage.workersUnit}
                </span>
              </div>
            </div>
          )}

          {/* Yer maydoni */}
          {project.area !== 0 && (
            <div className="flex items-start gap-3">
              <LandPlot className="w-5 h-5 text-[#D19C30] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-xs text-slate-500 dark:text-slate-400 block uppercase tracking-wider mb-0.5">
                  {dict.projectsPage.area}
                </span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100 block truncate">
                  {project.area} {dict.projectsPage.areaUnit}
                </span>
              </div>
            </div>
          )}

          {/* Hudud */}
          {project.region && (
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#D19C30] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-xs text-slate-500 dark:text-slate-400 block uppercase tracking-wider mb-0.5">
                  {dict.projectsPage.region}
                </span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-100 block truncate">
                  {project.region}
                </span>
              </div>
            </div>
          )}

          {/* Manzil */}
          {project.address && (
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#D19C30] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-xs text-slate-500 dark:text-slate-400 block uppercase tracking-wider mb-0.5">
                  {dict.projectsPage.address}
                </span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 block truncate">
                  {project.address}
                </span>
              </div>
            </div>
          )}

          {/* STIR (INN) */}
          {project.stir && (
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-[#D19C30] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-xs text-slate-500 dark:text-slate-400 block uppercase tracking-wider mb-0.5">
                  {dict.projectsPage.stir}
                </span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 block truncate">
                  {project.stir}
                </span>
              </div>
            </div>
          )}

          {/* Tashkil etilgan yili */}
          {project.year !== 0 && (
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#D19C30] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-xs text-slate-500 dark:text-slate-400 block uppercase tracking-wider mb-0.5">
                  {dict.projectsPage.establishedYear}
                </span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 block truncate">
                  {project.year}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

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
                    {dict.projectsPage.viewLotAuction}
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
                  <span>{dict.projectsPage.viewLotAuction}</span>
                </a>
              </div>
            </div>
          ))}
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
