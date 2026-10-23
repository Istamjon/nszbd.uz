"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { Locale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <footer className="bg-[#010c22] text-slate-300 border-t border-slate-800">
      {/* 4-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Organization About & Logo */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src="/logo-dark.svg"
                alt="NSZBD"
                width={200}
                height={46}
                style={{ width: "auto" }}
                className="h-11 w-auto object-contain"
              />
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              {dict.footer.description}
            </p>
            <div className="pt-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-300 block mb-1">
                {dict.footer.stateOrg}
              </span>
              <span>{dict.footer.hokimiyatUnder}</span>
            </div>
          </div>

          {/* Column 2: Quick Links (No icons) */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {dict.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href={localePath(locale, "")}
                  className="hover:text-[#D19C30] transition-colors block"
                >
                  {dict.nav.home}
                </Link>
              </li>
              <li>
                <Link
                  href={localePath(locale, "/about")}
                  className="hover:text-[#D19C30] transition-colors block"
                >
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href={localePath(locale, "/zones")}
                  className="hover:text-[#D19C30] transition-colors block"
                >
                  {dict.nav.zones}
                </Link>
              </li>
              <li>
                <Link
                  href={localePath(locale, "/projects")}
                  className="hover:text-[#D19C30] transition-colors block"
                >
                  {dict.nav.projects}
                </Link>
              </li>
              <li>
                <Link
                  href={localePath(locale, "/news")}
                  className="hover:text-[#D19C30] transition-colors block"
                >
                  {dict.nav.news}
                </Link>
              </li>
              <li>
                <Link
                  href={localePath(locale, "/contact")}
                  className="hover:text-[#D19C30] transition-colors block"
                >
                  {dict.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: State Portals (No icons) */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {dict.footer.portals}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://president.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D19C30] transition-colors block"
                >
                  {dict.footer.presidentSite}
                </a>
              </li>
              <li>
                <a
                  href="https://gov.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D19C30] transition-colors block"
                >
                  {dict.footer.govPortal}
                </a>
              </li>
              <li>
                <a
                  href="https://e-auksion.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D19C30] transition-colors block"
                >
                  {dict.footer.eAuction}
                </a>
              </li>
              <li>
                <a
                  href="https://navoi.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D19C30] transition-colors block"
                >
                  {dict.footer.hokimiyatUnder}
                </a>
              </li>
              <li>
                <a
                  href="https://lex.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D19C30] transition-colors block"
                >
                  {dict.footer.lexUz}
                </a>
              </li>
              <li>
                <a
                  href="https://my.gov.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D19C30] transition-colors block"
                >
                  {dict.footer.myGov}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact details */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              {dict.footer.contactUs}
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D19C30] shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  {dict.topbar.address}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#D19C30] shrink-0 mt-0.5" />
                <a
                  href="tel:+998792232877"
                  className="text-slate-300 hover:text-[#D19C30] transition-colors"
                >
                  +998 79 223-28-77
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#D19C30] shrink-0 mt-0.5" />
                <a
                  href="mailto:ksznavoiy@umail.uz"
                  className="text-slate-300 hover:text-[#D19C30] transition-colors"
                >
                  ksznavoiy@umail.uz
                </a>
              </div>
              <div className="pt-2">
                <span className="text-[11px] text-slate-400 block font-medium">
                  {dict.contact.workingHours}:
                </span>
                <span className="text-slate-300">
                  {dict.contact.workingHoursVal}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>{dict.footer.copyright}</p>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>{dict.footer.developer}</span>
            <a
              href="https://istamjon.uz/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-200 hover:text-[#D19C30] transition-colors underline decoration-slate-600 hover:decoration-[#D19C30] underline-offset-4"
            >
              Istam Obidov
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
