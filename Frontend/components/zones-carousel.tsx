"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, MapPin, Layers } from "lucide-react";
import { Locale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export interface ZoneItem {
  id: string | number;
  name: string;
  region: string;
  zoneType?: string;
  totalArea?: number;
  freeArea?: number;
  enterprisesCount?: number;
  jobsCreated?: number;
  description?: string;
  image?: string;
}

function subscribeResize(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

export function ZonesCarousel({
  locale,
  zones = [],
}: {
  locale: Locale;
  zones?: ZoneItem[];
}) {
  const dict = getDictionary(locale);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);
  const [isPaused, setIsPaused] = React.useState(false);
  const isMobile = React.useSyncExternalStore(
    subscribeResize,
    () => window.innerWidth < 768,
    () => false
  );

  const displayZones = zones;
  const total = displayZones.length;

  if (total === 0) return null;

  // 2 cards on desktop/tablet, 1 on mobile
  const maxIndex = isMobile ? total - 1 : Math.max(0, total - 2);
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
    if (isPaused || total <= 1) return;
    const interval = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next, total]);

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

  return (
    <section
      className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Section Header with Navigation Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D19C30] uppercase tracking-wider mb-2">
            <Layers className="w-4 h-4" />
            <span>{dict.zones.title}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#010c22] dark:text-white">
            {dict.zones.subtitle}
          </h2>
        </div>

        {/* Carousel Prev / Next Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={prev}
            aria-label={dict.zonesPage.prev}
            className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#041438] flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-[#D19C30] hover:border-[#D19C30] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label={dict.zonesPage.next}
            className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#041438] flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-[#D19C30] hover:border-[#D19C30] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Carousel Track: Shows 2 cards on md+ and 1 card on mobile */}
      <div
        className="overflow-hidden -mx-3"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transform: isMobile
              ? `translateX(-${safeIndex * 100}%)`
              : `translateX(-${safeIndex * 50}%)`,
          }}
        >
          {displayZones.map((zone) => (
            <div
              key={zone.id}
              className="w-full md:w-1/2 shrink-0 px-3"
            >
              <div className="h-full flex flex-col bg-white dark:bg-[#041438] border border-slate-200 dark:border-slate-800 overflow-hidden hover:border-[#D19C30]/70 dark:hover:border-[#D19C30]/60 transition-all duration-300 ease-out group">
                {/* Top Image Banner */}
                <div className="relative h-52 sm:h-56 bg-slate-900 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url(${zone.image || "/zone-banner.jpg"})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Badges on Image */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    {zone.region && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-[#D19C30] text-white rounded-md">
                        <MapPin className="w-3 h-3" />
                        {zone.region}
                      </span>
                    )}
                    {zone.zoneType && (
                      <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-medium bg-black/60 backdrop-blur-xs text-white border border-white/20 rounded-md">
                        {zone.zoneType}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#010c22] dark:text-white group-hover:text-[#D19C30] transition-colors mb-2 line-clamp-1">
                      {zone.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-5">
                      {zone.description}
                    </p>

                    {/* Stats 3-Column Grid */}
                    <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 dark:bg-[#010c22]/60 border border-slate-100 dark:border-slate-800/80 mb-5 text-center">
                      {zone.totalArea !== undefined && (
                        <div>
                          <span className="block text-[10px] font-medium text-slate-500 dark:text-slate-400">
                            {dict.zones.totalArea}
                          </span>
                          <span className="text-sm font-bold text-[#010c22] dark:text-white">
                            {zone.totalArea} {dict.kpi.totalAreaUnit}
                          </span>
                        </div>
                      )}
                      {zone.freeArea !== undefined && (
                        <div>
                          <span className="block text-[10px] font-medium text-slate-500 dark:text-slate-400">
                            {dict.zones.freeArea}
                          </span>
                          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                            {zone.freeArea} {dict.kpi.totalAreaUnit}
                          </span>
                        </div>
                      )}
                      {zone.enterprisesCount !== undefined && (
                        <div>
                          <span className="block text-[10px] font-medium text-slate-500 dark:text-slate-400">
                            {dict.zones.enterprises}
                          </span>
                          <span className="text-sm font-bold text-[#D19C30]">
                            {zone.enterprisesCount} {dict.kpi.enterprisesUnit}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom: Button & Jobs Info */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <Link
                      href={localePath(locale, `/zones/${zone.id}`)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#010c22] dark:bg-[#D19C30] hover:bg-[#D19C30] dark:hover:bg-[#b88523] active:scale-95 transition-all duration-200 ease-out group cursor-pointer rounded-md"
                    >
                      <span>{dict.zones.details}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200 ease-out" />
                    </Link>

                    {zone.jobsCreated && (
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {zone.jobsCreated} {dict.kpi.jobsUnit}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row: Dots & Right-aligned CTA */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Slide Position Dots */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === safeIndex
                  ? "w-6 bg-[#D19C30]"
                  : "w-2 bg-slate-300 dark:bg-slate-700"
              }`}
            />
          ))}
        </div>

        {/* Right-aligned CTA: Barcha zonalarni ko'rish */}
        <div className="w-full sm:w-auto flex justify-end">
          <Link
            href={localePath(locale, "/zones")}
            className="inline-flex items-center gap-2 px-7 py-3 text-sm font-bold text-white bg-[#010c22] dark:bg-[#D19C30] hover:bg-[#D19C30] dark:hover:bg-[#b88523] transition-all duration-200 group cursor-pointer rounded-md"
          >
            <span>{dict.zones.viewAll}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
