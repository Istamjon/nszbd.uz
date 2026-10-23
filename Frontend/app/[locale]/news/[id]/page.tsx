import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  ArrowLeft,
  Phone,
  Mail,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { getSingleNews, getNews } from "@/lib/content";
import { getMediaUrl } from "@/lib/media";
import { localePath } from "@/i18n/config";
import { Breadcrumb } from "@/components/breadcrumb";
import { ShareButtons } from "@/components/share-buttons";
import { NewsCarousel } from "@/components/news-carousel";
import { formatDate } from "@/lib/date";

type PageProps = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function SingleNewsPage({ params }: PageProps) {
  const { locale: raw, id } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  const [cmsNews, allNews] = await Promise.all([
    getSingleNews(id, locale),
    getNews(locale),
  ]);

  if (!cmsNews) {
    notFound();
  }

  const rawDate =
    cmsNews.fields["published-date"] ||
    cmsNews.published_at ||
    "";
  const cleanDate = formatDate(rawDate);
  const imageUrl = getMediaUrl(cmsNews.fields.image) || "/news-banner.jpg";

  const news = {
    title: cmsNews.fields.title,
    excerpt: cmsNews.fields.excerpt,
    content: cmsNews.fields.content || "",
    date: cleanDate,
    category: dict.newsPage.categoryDefault,
  };

  // Other latest news (exclude current item)
  const carouselNews = (allNews || []).filter((item) => item.uuid !== id);
  const otherNews = carouselNews.slice(0, 4);

  const isHtml = news.content.includes("<p>") || news.content.includes("<br");

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        locale={locale}
        items={[
          { label: dict.nav.news, href: localePath(locale, "/news") },
          { label: news.title },
        ]}
      />

      {/* Back button */}
      <div className="mb-8">
        <Link
          href={localePath(locale, "/news")}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#D19C30] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{dict.newsPage.backToList}</span>
        </Link>
      </div>

      {/* Main 12-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Article Body (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          <article className="bg-white dark:bg-[#041438] p-6 sm:p-10 border border-slate-200 dark:border-slate-800 rounded-md">
            {/* Meta Header */}
            <div className="flex flex-wrap items-center gap-3 text-xs mb-5">
              <span className="px-2.5 py-1 bg-[#D19C30]/15 text-[#D19C30] font-bold rounded-md uppercase tracking-wider">
                {news.category}
              </span>
              {news.date && (
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-mono font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#D19C30]" />
                  <span>{news.date}</span>
                </div>
              )}
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                {dict.newsPage.pressService}
              </span>
            </div>

            {/* Article Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#010c22] dark:text-white leading-tight mb-6">
              {news.title}
            </h1>

            {/* Article Cover Banner Image */}
            <div className="relative aspect-video sm:aspect-21/9 w-full bg-slate-900 rounded-md overflow-hidden mb-8 border border-slate-200 dark:border-slate-800">
              <Image
                src={imageUrl}
                alt={news.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-xs text-white/90 font-medium truncate pointer-events-none">
                {news.title}
              </div>
            </div>

            {/* Lead Excerpt Highlight */}
            {news.excerpt && (
              <div className="p-4 sm:p-5 mb-6 border-l-4 border-[#D19C30] bg-slate-50 dark:bg-[#010c22]/60 text-slate-800 dark:text-slate-200 text-base sm:text-lg font-medium leading-relaxed rounded-r-md">
                {news.excerpt}
              </div>
            )}

            {/* Main Text Content */}
            {news.content && (
              <div className="prose dark:prose-invert max-w-none text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
                {isHtml ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: news.content }}
                    className="space-y-4 leading-relaxed"
                  />
                ) : (
                  news.content.split("\n\n").map((para, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {para}
                    </p>
                  ))
                )}
              </div>
            )}

            {/* Interactive Social Share Buttons */}
            <ShareButtons title={news.title} locale={locale} />
          </article>
        </div>

        {/* Right Column: Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Latest Other News */}
          {otherNews.length > 0 && (
            <div className="bg-white dark:bg-[#041438] p-6 border border-slate-200 dark:border-slate-800 rounded-md">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-base font-bold text-[#010c22] dark:text-white">
                  {dict.newsPage.latestNews}
                </h3>
                <Link
                  href={localePath(locale, "/news")}
                  className="text-xs font-semibold text-[#D19C30] hover:underline"
                >
                  {dict.newsPage.allNewsBtn}
                </Link>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {otherNews.map((item) => {
                  const itemDate = formatDate(
                    item.fields["published-date"] || item.published_at || ""
                  );
                  return (
                    <div
                      key={item.uuid}
                      className="py-3.5 first:pt-0 last:pb-0 group"
                    >
                      {itemDate && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mb-1">
                          <Calendar className="w-3.5 h-3.5 text-[#D19C30]" />
                          <span>{itemDate}</span>
                        </div>
                      )}
                      <Link
                        href={localePath(locale, `/news/${item.uuid}`)}
                        className="text-sm font-semibold text-slate-800 dark:text-slate-200 group-hover:text-[#D19C30] transition-colors line-clamp-2 leading-snug"
                      >
                        {item.fields.title}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Card 2: Press & Official Contact */}
          <div className="bg-[#010c22] text-white p-6 border border-slate-800 rounded-md">
            <span className="text-xs font-semibold text-[#D19C30] uppercase tracking-wider block mb-1">
              {dict.newsPage.pressService}
            </span>
            <h4 className="text-lg font-bold text-white mb-2">
              {dict.newsPage.contactTitle}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              {dict.newsPage.contactSubtitle}
            </p>

            <div className="space-y-3 mb-6 text-xs">
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-[#D19C30] shrink-0" />
                <span>+998 79 223-28-77</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-[#D19C30] shrink-0" />
                <span>ksznavoiy@umail.uz</span>
              </div>
            </div>

            <Link
              href={localePath(locale, "/contact")}
              className="w-full py-2.5 px-4 text-xs font-bold text-center block text-white bg-[#D19C30] hover:bg-[#b88523] rounded-md transition-colors"
            >
              {dict.newsPage.contactBtn}
            </Link>
          </div>

          {/* Card 3: Opportunity Call to Action */}
          <div className="bg-white dark:bg-[#041438] p-6 border border-slate-200 dark:border-slate-800 rounded-md">
            <div className="flex items-center gap-2 text-xs font-bold text-[#D19C30] uppercase tracking-wider mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>{dict.newsPage.ctaBadge}</span>
            </div>
            <h4 className="text-base font-bold text-[#010c22] dark:text-white mb-2 leading-snug">
              {dict.newsPage.ctaTitle}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
              {dict.newsPage.ctaDesc}
            </p>

            <Link
              href={localePath(locale, "/zones")}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D19C30] hover:text-[#b88523] group"
            >
              <span>{dict.newsPage.ctaBtn}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Latest News Carousel */}
      <NewsCarousel locale={locale} news={carouselNews} />
    </div>
  );
}
