"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Locale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function AboutPreview({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  const highlights = dict.aboutSection.points;

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#031538]/50 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline, Description, Points, Button */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#010c22] dark:text-white leading-tight mb-6">
              {dict.aboutSection.title}
            </h2>

            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {dict.aboutSection.description}
            </p>

            {/* Bullet points */}
            <div className="space-y-3 mb-8">
              {highlights.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#D19C30] shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 dark:text-slate-200 font-medium">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href={localePath(locale, "/about")}
              className="inline-flex items-center gap-2 py-3.5 px-6 font-bold text-white bg-[#010c22] dark:bg-[#D19C30] hover:bg-[#D19C30] dark:hover:bg-[#b88523] transition-all duration-200 text-sm group rounded-md"
            >
              <span>{dict.aboutSection.more}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Column: Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative overflow-hidden border border-slate-200 dark:border-slate-800 aspect-4/3 group rounded-md">
              <Image
                src="/about-company.jpg"
                alt="Navoiy sanoat zonalari zamonaviy ishlab chiqarish majmuasi"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/95 dark:bg-[#010c22]/95 backdrop-blur-md border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-[#D19C30] uppercase block">
                  {dict.aboutSection.badgeTitle}
                </span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  {dict.aboutSection.badgeSub}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
