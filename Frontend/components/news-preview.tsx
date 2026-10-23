"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Newspaper,
  Calendar,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Locale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatDate } from "@/lib/date";

export interface NewsItem {
  id: string | number;
  title: string;
  excerpt?: string;
  date?: string;
  image?: string;
}

function subscribeResize(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getCardsPerView() {
  const width = window.innerWidth;
  if (width < 768) return 1;
  if (width < 1024) return 2;
  return 3;
}

export function NewsPreview({
  locale,
  news = [],
}: {
  locale: Locale;
  news?: NewsItem[];
}) {
  const dict = getDictionary(locale);
  const displayNews = news;
  const total = displayNews.length;

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const cardsPerView = React.useSyncExternalStore(
    subscribeResize,
    getCardsPerView,
    () => 3
  );
  const [isPaused, setIsPaused] = React.useState(false);
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);

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

  // Autoplay (every 5 seconds)
  React.useEffect(() => {
    if (isPaused || total <= cardsPerView) return;
    const interval = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next, total, cardsPerView]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) next();
    if (isRightSwipe) prev();
  };

  if (total === 0) {
    return null;
  }

  return (
    <section
      aria-label="So'nggi yangiliklar karuseli"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-800"
    >
      {/* Top Header: Badge, Title & Navigation Arrows */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#D19C30] uppercase tracking-wider mb-2">
            <Newspaper className="w-4 h-4" />
            <span>{dict.nav.news}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#010c22] dark:text-white tracking-tight">
            {dict.news.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 max-w-2xl">
            {dict.news.subtitle}
          </p>
        </div>

        {/* Carousel Navigation Arrows */}
        {total > cardsPerView && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label={dict.newsPage.prev}
              className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#041438] text-slate-700 dark:text-slate-200 hover:bg-[#D19C30] hover:text-white hover:border-[#D19C30] dark:hover:bg-[#D19C30] dark:hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label={dict.newsPage.next}
              className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#041438] text-slate-700 dark:text-slate-200 hover:bg-[#D19C30] hover:text-white hover:border-[#D19C30] dark:hover:bg-[#D19C30] dark:hover:text-white transition-all flex items-center justify-center cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Carousel Viewport (3 cards on desktop, 2 on tablet, 1 on mobile) */}
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] -mx-3"
          style={{
            transform: `translateX(-${safeIndex * (100 / cardsPerView)}%)`,
          }}
        >
          {displayNews.map((item) => (
            <div
              key={item.id}
              className="w-full md:w-1/2 lg:w-1/3 shrink-0 px-3 flex"
            >
              <article className="flex flex-col w-full bg-white dark:bg-[#041438] border border-slate-200 dark:border-slate-800 shadow-none overflow-hidden hover:border-[#D19C30]/70 dark:hover:border-[#D19C30]/60 transition-all duration-300 ease-out group rounded-md">
                {/* Image Cover */}
                <div className="relative h-48 sm:h-52 bg-slate-900 overflow-hidden">
                  <Image
                    src={item.image || "/news-banner.jpg"}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent pointer-events-none" />
                  {item.date && (
                    <div className="absolute bottom-3 left-3 bg-[#010c22]/85 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-white/10">
                      <Calendar className="w-3.5 h-3.5 text-[#D19C30]" />
                      <span>{formatDate(item.date)}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#010c22] dark:text-white group-hover:text-[#D19C30] transition-colors duration-200 line-clamp-2 mb-3 leading-snug">
                      {item.title}
                    </h3>
                    {item.excerpt && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-6">
                        {item.excerpt}
                      </p>
                    )}
                  </div>

                  {/* Read more button link */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                    <Link
                      href={localePath(locale, `/news/${item.id}`)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D19C30] hover:text-[#b88523] group-hover:translate-x-1.5 transition-transform duration-200 ease-out"
                    >
                      <span>{dict.news.readMore}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row: Slide Indicators on Left & [Barcha yangiliklar] Button on Right */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-10 pt-6 border-t border-slate-200/80 dark:border-slate-800">
        {/* Left: Position Dots */}
        {total > cardsPerView ? (
          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Slayd ${idx + 1}`}
                className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                  safeIndex === idx
                    ? "w-8 bg-[#D19C30]"
                    : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        ) : (
          <div />
        )}

        {/* Right: [Barcha yangiliklar] Button */}
        <Link
          href={localePath(locale, "/news")}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-md bg-[#010c22] dark:bg-[#D19C30] hover:bg-[#D19C30] dark:hover:bg-[#b88523] text-white text-xs sm:text-sm font-bold transition-all duration-200 group active:scale-95 shadow-none ml-auto"
        >
          <span>{dict.news.viewAll}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
