"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Locale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ApplyModal } from "./apply-modal";

export function HeroSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [applyModalOpen, setApplyModalOpen] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, []);

  return (
    <>
      <section className="relative w-full min-h-[580px] lg:min-h-[660px] flex items-center bg-[#010c22] text-white overflow-hidden">
        {/* Background Video: hero.mp4 positioned on the right side with audio muted */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-3/5 xl:w-[58%] overflow-hidden pointer-events-none">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center opacity-50 lg:opacity-75"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          {/* Subtle gradient directly on video for smooth feathering into dark background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#010c22] via-[#010c22]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#010c22] via-transparent to-[#010c22]/40" />
        </div>

        {/* Left protective gradient ensuring text contrast and clarity */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#010c22] via-[#010c22]/90 to-transparent pointer-events-none lg:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010c22] via-transparent to-transparent pointer-events-none" />

        {/* Content container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full">
          <div className="max-w-3xl lg:max-w-4xl">
            {/* Main Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-extrabold tracking-tight leading-snug lg:leading-[1.2] mb-6 text-white max-w-3xl lg:max-w-4xl">
              {locale === "uz" ? (
                <>
                  Navoiy viloyati sanoat zonalarini <br />
                  boshqarish direksiyasi
                </>
              ) : (
                dict.hero.title
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed mb-10 max-w-2xl">
              {dict.hero.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setApplyModalOpen(true)}
                className="py-3.5 px-7 font-bold text-white bg-[#D19C30] hover:bg-[#b88523] active:scale-[0.98] flex items-center gap-2.5 transition-all duration-200 cursor-pointer text-sm rounded-md"
              >
                <FileText className="w-4 h-4" />
                <span>{dict.hero.submitApplication}</span>
              </button>

              <Link
                href={localePath(locale, "/zones")}
                className="py-3.5 px-7 font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 active:scale-[0.98] backdrop-blur-md flex items-center gap-2 transition-all duration-200 text-sm group rounded-md"
              >
                <span>{dict.hero.exploreZones}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ApplyModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        locale={locale}
      />
    </>
  );
}
