import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { getNews } from "@/lib/content";
import { getMediaUrl } from "@/lib/media";
import { localePath } from "@/i18n/config";
import { Pagination } from "@/components/pagination";
import { Breadcrumb } from "@/components/breadcrumb";
import { formatDate } from "@/lib/date";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
};

export default async function NewsPage({ params, searchParams }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);
  const pageSize = 6;

  const news = await getNews(locale);
  const totalPages = Math.max(1, Math.ceil(news.length / pageSize));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  const paginatedNews = news.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize
  );

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb locale={locale} items={[{ label: dict.nav.news }]} />
      {/* Header */}
      <div className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#010c22] dark:text-white mb-4">
          {dict.newsPage.title}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          {dict.newsPage.subtitle}
        </p>
      </div>

      {/* News Grid */}
      {paginatedNews.length === 0 ? (
        <div className="py-16 text-center text-slate-500 dark:text-slate-400">
          <p>{dict.newsPage.subtitle}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedNews.map((item) => {
            const imageUrl = getMediaUrl(item.fields.image) || "/news-banner.jpg";
            const dateStr = formatDate(item.fields["published-date"] || item.published_at || "");

            return (
              <article
                key={item.uuid}
                className="flex flex-col bg-white dark:bg-[#041438] border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-[#D19C30]/70 dark:hover:border-[#D19C30]/60 transition-all duration-300 ease-out group"
              >
                <div className="relative h-48 bg-slate-900 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={item.fields.title || ""}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    {dateStr && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-[#D19C30]" />
                        <span>{dateStr}</span>
                      </div>
                    )}
                    <h2 className="text-lg font-bold text-[#010c22] dark:text-white group-hover:text-[#D19C30] transition-colors line-clamp-2 mb-3">
                      {item.fields.title}
                    </h2>
                    {item.fields.excerpt && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-6">
                        {item.fields.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Link
                      href={localePath(locale, `/news/${item.uuid}`)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D19C30] group-hover:translate-x-1.5 transition-transform duration-200 ease-out"
                    >
                      <span>{dict.newsPage.readMore}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          baseUrl={localePath(locale, "/news")}
          dict={dict.pagination}
          totalItems={news.length}
          pageSize={pageSize}
        />
      )}
    </div>
  );
}
