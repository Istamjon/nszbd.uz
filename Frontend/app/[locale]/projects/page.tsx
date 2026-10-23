import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Coins, Users, LandPlot } from "lucide-react";
import { getProjects } from "@/lib/content";
import { getMediaUrl } from "@/lib/media";
import { localePath } from "@/i18n/config";
import { Pagination } from "@/components/pagination";
import { Breadcrumb } from "@/components/breadcrumb";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function ProjectsPage({ params, searchParams }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);
  const pageSize = 6;

  const projects = await getProjects(locale);
  const totalPages = Math.max(1, Math.ceil(projects.length / pageSize));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const paginatedProjects = projects.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize
  );

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb locale={locale} items={[{ label: dict.nav.projects }]} />
      {/* Header */}
      <div className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#010c22] dark:text-white mb-4">
          {dict.projectsPage.title}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          {dict.projectsPage.subtitle}
        </p>
      </div>

      {/* Projects Grid */}
      {paginatedProjects.length === 0 ? (
        <div className="py-16 text-center text-slate-500 dark:text-slate-400">
          <p>{dict.projectsPage.subtitle}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {paginatedProjects.map((item) => {
            const imageUrl = getMediaUrl(item.fields["project-image"]) || "/about-company.jpg";

            return (
              <div
                key={item.uuid}
                className="flex flex-col bg-white dark:bg-[#041438] border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-[#D19C30]/70 dark:hover:border-[#D19C30]/60 transition-all duration-300 ease-out group rounded-md"
              >
                <div className="relative h-56 bg-slate-900 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={item.fields["company-name"] || item.fields.title || ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                </div>

                <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-xs font-bold text-[#D19C30] uppercase tracking-wider block mb-1">
                      {item.fields["company-name"]}
                    </span>
                    <h2 className="text-xl font-bold text-[#010c22] dark:text-white group-hover:text-[#D19C30] transition-colors mb-3">
                      {item.fields.title}
                    </h2>
                    {item.fields.description && (
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-6">
                        {item.fields.description.replace(/<[^>]+>/g, "")}
                      </p>
                    )}

                    {/* Details Indicators (Pure SVG Icons without background or border) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 p-3 sm:p-3.5 bg-slate-50 dark:bg-[#010c22]/60 border border-slate-200/70 dark:border-slate-800/80 rounded-md mb-6">
                      {item.fields["investment-amount"] && (
                        <div
                          className="flex items-center gap-2 min-w-0"
                          title={dict.projectsPage.investment}
                        >
                          <Coins className="w-4 h-4 text-[#D19C30] shrink-0" />
                          <span className="font-bold text-xs sm:text-sm text-[#D19C30] truncate">
                            {item.fields["investment-amount"]}
                          </span>
                        </div>
                      )}
                      {item.fields["workers-count"] !== undefined && (
                        <div
                          className="flex items-center gap-2 min-w-0"
                          title={dict.projectsPage.jobs}
                        >
                          <Users className="w-4 h-4 text-[#D19C30] shrink-0" />
                          <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 truncate">
                            {item.fields["workers-count"]} {dict.projectsPage.workersUnit}
                          </span>
                        </div>
                      )}
                      {item.fields.area !== undefined && (
                        <div
                          className="flex items-center gap-2 min-w-0"
                          title={dict.projectsPage.area}
                        >
                          <LandPlot className="w-4 h-4 text-[#D19C30] shrink-0" />
                          <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 truncate">
                            {item.fields.area} {dict.projectsPage.areaUnit}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Link
                      href={localePath(locale, `/projects/${item.uuid}`)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D19C30] group-hover:translate-x-1.5 transition-transform duration-200 ease-out"
                    >
                      <span>{dict.projectsPage.details}</span>
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
          baseUrl={localePath(locale, "/projects")}
          dict={dict.pagination}
          totalItems={projects.length}
          pageSize={pageSize}
        />
      )}
    </div>
  );
}
