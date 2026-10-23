"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Calendar, ArrowRight, Newspaper } from "lucide-react";
import { Locale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getMediaUrl } from "@/lib/media";
import type { ContentEntry, NewsFields } from "@/lib/types";
import { formatDate } from "@/lib/date";

function subscribeResize(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

export function NewsCarousel({
  locale,
  news = [],
}: {
  locale: Locale;
  news?: ContentEntry<NewsFields>[];
}) {
  const dict = getDictionary(locale);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);
  const [isPaused, setIsPaused] = React.useState(false);

  const windowWidth = React.useSyncExternalStore(
    subscribeResize,
    () => window.innerWidth,
    () => 1200
  );

  const cardsPerView = windowWidth < 640 ? 1 : windowWidth < 1024 ? 2 : 3;
  const total = news.length;

  const maxIndex = Math.max(0, total - cardsPerView);
  const safeIndex = Math.min(currentIndex, maxIndex);

  const prev = React.useCallback(() => {
    setCurrentIndex((curr) => {
      const active = Math.min(curr, maxIndex);
      return active <= 0 ? maxIndex : active - 1;
    });
  }, [maxIndex]);

  const next = React.useCallback(() => {
    setCurrentIndex((curr) => {
      const active = Math.min(curr, maxIndex);
      return active >= maxIndex ? 0 : active + 1;
    });
  }, [maxIndex]);

  // Autoplay (5 seconds)
  React.useEffect(() => {
    if (isPaused || total <= cardsPerView) return;
    const interval = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next, total, cardsPerView]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) next();
    if (distance < -50) prev();
    setTouchStart(null);
    setTouchEnd(null);
  };

  if (total === 0) return null;

  return (
    <section
      className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Section Header with Navigation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D19C30] uppercase tracking-wider mb-2">
            <Newspaper className="w-4 h-4" />
            <span>{dict.newsPage.title}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#010c22] dark:text-white">
            {dict.newsPage.latestNews}
          </h2>
        </div>

        {/* Carousel Prev / Next Controls */}
        {total > cardsPerView && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={prev}
              aria-label="Oldingi yangilik"
              className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#041438] flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-[#D19C30] hover:border-[#D19C30] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Keyingi yangilik"
              className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#041438] flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-[#D19C30] hover:border-[#D19C30] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Carousel Track */}
      <div
        className="overflow-hidden -mx-3"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transform: `translateX(-${safeIndex * (100 / cardsPerView)}%)`,
          }}
        >
          {news.map((item) => {
            const dateStr = formatDate(
              item.fields["published-date"] || item.published_at || ""
            );
            const imgUrl = getMediaUrl(item.fields.image) || "/news-banner.jpg";

            return (
              <div
                key={item.uuid}
                className="px-3 shrink-0"
                style={{ width: `${100 / cardsPerView}%` }}
              >
                <article className="group h-full flex flex-col bg-white dark:bg-[#041438] border border-slate-200 dark:border-slate-800 rounded-md overflow-hidden hover:border-[#D19C30]/50 hover:shadow-md transition-all duration-300">
                  {/* Thumbnail */}
                  <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                    <Image
                      src={imgUrl}
                      alt={item.fields.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      {dateStr && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-[#D19C30]" />
                          <span>{dateStr}</span>
                        </div>
                      )}
                      <h3 className="text-base font-bold text-[#010c22] dark:text-white line-clamp-2 group-hover:text-[#D19C30] transition-colors leading-snug">
                        <Link href={localePath(locale, `/news/${item.uuid}`)}>
                          {item.fields.title}
                        </Link>
                      </h3>
                      {item.fields.excerpt && (
                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                          {item.fields.excerpt}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                      <Link
                        href={localePath(locale, `/news/${item.uuid}`)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D19C30] group-hover:text-[#b88523] transition-colors"
                      >
                        <span>{dict.newsPage.readMore}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
