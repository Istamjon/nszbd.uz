import * as React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function GoogleMaps({ locale = "uz" }: { locale?: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section className="relative w-full h-[460px] sm:h-[520px] border-y border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#010c22] overflow-hidden">
      {/* Google Maps Iframe with subtle opacity */}
      <iframe
        title={dict.maps.title}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3056.8856649176374!2d65.36149337651036!3d40.100381074465495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f51c727bbbbbbbb%3A0x123456789abcdef!2zNDDCsDA2JzAxLjQiTiA2NcKwMjEnNDkuMyJF!5e0!3m2!1suz!2s!4v1700000000000!5m2!1suz!2s"
        className="w-full h-full border-0 opacity-80 hover:opacity-95 transition-opacity duration-300 grayscale-[15%] contrast-[1.05] dark:invert-[90%] dark:hue-rotate-180"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Floating Card Overlay - Centered on left side, sharp rounded-none corners, no open-in-maps button */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-8 lg:left-12 z-10 w-[calc(100%-2rem)] sm:w-auto sm:min-w-[340px] sm:max-w-md p-6 bg-white dark:bg-[#041438] border-l-4 border-l-[#D19C30] border-y border-r border-slate-200 dark:border-slate-800 rounded-none shadow-none">
        <div className="space-y-4">
          {/* Header */}
          <div className="border-b border-slate-100 dark:border-slate-800/80 pb-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D19C30] block">
              {dict.maps.buildingTitle}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[#010c22] dark:text-white mt-0.5">
              Navoiy KSZ Direksiyasi
            </h3>
          </div>

          {/* Details list */}
          <div className="space-y-3 text-xs sm:text-sm">
            {/* Manzil */}
            <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
              <MapPin className="w-4 h-4 text-[#D19C30] shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-slate-900 dark:text-white block">
                  {dict.topbar.address}
                </span>
                <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 block mt-0.5">
                  {dict.maps.coordinates}: 40°06&apos;01.4&quot;N 65°21&apos;49.3&quot;E
                </span>
              </div>
            </div>

            {/* Telefon */}
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300 pt-1">
              <Phone className="w-4 h-4 text-[#D19C30] shrink-0" />
              <a
                href={`tel:${dict.topbar.phone.replace(/[\s-]/g, "")}`}
                className="font-semibold text-slate-900 dark:text-white hover:text-[#D19C30] transition-colors"
              >
                {dict.topbar.phone}
              </a>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <Mail className="w-4 h-4 text-[#D19C30] shrink-0" />
              <a
                href={`mailto:${dict.topbar.email}`}
                className="font-medium text-slate-600 dark:text-slate-300 hover:text-[#D19C30] transition-colors text-xs"
              >
                {dict.topbar.email}
              </a>
            </div>

            {/* Ish vaqti */}
            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-xs pt-1 border-t border-slate-100 dark:border-slate-800/80">
              <Clock className="w-4 h-4 text-[#D19C30] shrink-0" />
              <span>{dict.topbar.workingHours}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
