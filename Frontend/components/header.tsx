"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, FileText, ArrowRight, MapPin } from "lucide-react";
import { Locale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { LanguageSwitcher } from "./language-switcher";
import { ApplyModal } from "./apply-modal";

export function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [aboutSubmenuOpen, setAboutSubmenuOpen] = React.useState(false);
  const [zonesSubmenuOpen, setZonesSubmenuOpen] = React.useState(false);
  const [applyModalOpen, setApplyModalOpen] = React.useState(false);

  // Close mobile drawer on route change
  const [prevPathname, setPrevPathname] = React.useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  const districts = [
    { name: dict.districts.karmana, slug: "karmana" },
    { name: dict.districts.konimex, slug: "konimex" },
    { name: dict.districts.qiziltepa, slug: "qiziltepa" },
    { name: dict.districts.navbahor, slug: "navbahor" },
    { name: dict.districts.nurota, slug: "nurota" },
    { name: dict.districts.tomdi, slug: "tomdi" },
    { name: dict.districts.uchquduq, slug: "uchquduq" },
    { name: dict.districts.xatirchi, slug: "xatirchi" },
    { name: dict.districts.navoiy, slug: "navoiy" },
    { name: dict.districts.zarafshon, slug: "zarafshon" },
    { name: dict.districts.gozgon, slug: "gozgon" },
  ];

  const isHomeActive =
    pathname === "/" ||
    pathname === `/${locale}` ||
    pathname === `/${locale}/`;

  const isAboutActive =
    pathname.includes("/about") ||
    pathname.includes("/management") ||
    pathname.includes("/tasks") ||
    pathname.includes("/structure") ||
    pathname.includes("/documents");

  const isZonesActive = pathname.includes("/zones");
  const isNewsActive = pathname.includes("/news");
  const isProjectsActive = pathname.includes("/projects");
  const isContactActive = pathname.includes("/contact");

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#010c22]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Left: Official NSZBD Logo */}
          <Link
            href={localePath(locale, "")}
            className="flex items-center shrink-0 group transition-transform duration-200 hover:opacity-90"
            aria-label="NSZBD.UZ"
          >
            <Image
              src="/logo.svg"
              alt="NSZBD Logo"
              width={206}
              height={48}
              priority
              style={{ width: "auto" }}
              className="h-10 sm:h-12 w-auto object-contain dark:hidden"
            />
            <Image
              src="/logo-dark.svg"
              alt="NSZBD Logo"
              width={206}
              height={48}
              priority
              style={{ width: "auto" }}
              className="h-10 sm:h-12 w-auto object-contain hidden dark:block"
            />
          </Link>

          {/* Center: Desktop Nav Menu (activates at lg: 1024px) */}
          <nav className="hidden lg:flex items-center h-full gap-1 xl:gap-2 text-sm font-medium">
            {/* 1. Bosh sahifa */}
            <Link
              href={localePath(locale, "")}
              className={`px-3 py-2 rounded-md transition-colors duration-200 ${
                isHomeActive
                  ? "text-[#D19C30] font-semibold"
                  : "text-slate-700 dark:text-slate-200 hover:text-[#D19C30]"
              }`}
            >
              {dict.nav.home}
            </Link>

            {/* 2. Direksiya haqida (Submenu connects seamlessly with header) */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setAboutSubmenuOpen(true)}
              onMouseLeave={() => setAboutSubmenuOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors duration-200 cursor-pointer ${
                  isAboutActive
                    ? "text-[#D19C30] font-semibold"
                    : "text-slate-700 dark:text-slate-200 hover:text-[#D19C30]"
                }`}
              >
                <span>{dict.nav.aboutDropdown}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    aboutSubmenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`absolute left-0 top-full w-64 p-2 bg-white dark:bg-[#041438] border border-slate-200 dark:border-slate-800 shadow-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-50 rounded-b-md ${
                  aboutSubmenuOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none"
                }`}
              >
                <Link
                  href={localePath(locale, "/about")}
                  className={`block px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                    pathname.includes("/about")
                      ? "text-[#D19C30] bg-[#D19C30]/10 font-semibold"
                      : "text-slate-700 dark:text-slate-300 hover:text-[#D19C30] hover:bg-[#D19C30]/10"
                  }`}
                >
                  {dict.nav.about}
                </Link>
                <Link
                  href={localePath(locale, "/management")}
                  className={`block px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                    pathname.includes("/management")
                      ? "text-[#D19C30] bg-[#D19C30]/10 font-semibold"
                      : "text-slate-700 dark:text-slate-300 hover:text-[#D19C30] hover:bg-[#D19C30]/10"
                  }`}
                >
                  {dict.nav.management}
                </Link>
                <Link
                  href={localePath(locale, "/tasks")}
                  className={`block px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                    pathname.includes("/tasks")
                      ? "text-[#D19C30] bg-[#D19C30]/10 font-semibold"
                      : "text-slate-700 dark:text-slate-300 hover:text-[#D19C30] hover:bg-[#D19C30]/10"
                  }`}
                >
                  {dict.nav.tasks}
                </Link>
                <Link
                  href={localePath(locale, "/structure")}
                  className={`block px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                    pathname.includes("/structure")
                      ? "text-[#D19C30] bg-[#D19C30]/10 font-semibold"
                      : "text-slate-700 dark:text-slate-300 hover:text-[#D19C30] hover:bg-[#D19C30]/10"
                  }`}
                >
                  {dict.nav.structure}
                </Link>
                <Link
                  href={localePath(locale, "/documents")}
                  className={`block px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                    pathname.includes("/documents")
                      ? "text-[#D19C30] bg-[#D19C30]/10 font-semibold"
                      : "text-slate-700 dark:text-slate-300 hover:text-[#D19C30] hover:bg-[#D19C30]/10"
                  }`}
                >
                  {dict.nav.documents}
                </Link>
              </div>
            </div>

            {/* 3. Sanoat zonalari (Submenu connects seamlessly with header, MapPin icons, vertical center line) */}
            <div
              className="relative h-full flex items-center"
              onMouseEnter={() => setZonesSubmenuOpen(true)}
              onMouseLeave={() => setZonesSubmenuOpen(false)}
            >
              <Link
                href={localePath(locale, "/zones")}
                className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors duration-200 cursor-pointer ${
                  isZonesActive
                    ? "text-[#D19C30] font-semibold"
                    : "text-slate-700 dark:text-slate-200 hover:text-[#D19C30]"
                }`}
              >
                <span>{dict.nav.zones}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    zonesSubmenuOpen ? "rotate-180" : ""
                  }`}
                />
              </Link>

              <div
                className={`absolute left-0 top-full w-[460px] p-3.5 bg-white dark:bg-[#041438] border border-slate-200 dark:border-slate-800 shadow-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-50 rounded-b-md ${
                  zonesSubmenuOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none"
                }`}
              >
                <Link
                  href={localePath(locale, "/zones")}
                  className="flex items-center justify-between px-3 py-2 text-xs font-bold text-[#D19C30] bg-[#D19C30]/10 hover:bg-[#D19C30]/20 mb-2.5 rounded-md transition-colors"
                >
                  <span>{dict.zones.viewAll}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {/* 2-column grid with MapPin icons & vertical center line */}
                <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-2">
                  {/* Left Column (6 districts) */}
                  <div className="space-y-0.5">
                    {districts.slice(0, 6).map((d) => (
                      <Link
                        key={d.slug}
                        href={localePath(locale, `/zones?region=${encodeURIComponent(d.name)}`)}
                        className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:text-[#D19C30] hover:bg-[#D19C30]/10 transition-colors rounded-md truncate font-medium group"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#D19C30]/70 group-hover:text-[#D19C30] shrink-0 transition-colors" />
                        <span className="truncate">{d.name}</span>
                      </Link>
                    ))}
                  </div>

                  {/* Vertical Center Line */}
                  <div className="w-[1px] bg-slate-200 dark:bg-slate-800 self-stretch my-0.5" />

                  {/* Right Column (5 districts) */}
                  <div className="space-y-0.5">
                    {districts.slice(6).map((d) => (
                      <Link
                        key={d.slug}
                        href={localePath(locale, `/zones?region=${encodeURIComponent(d.name)}`)}
                        className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:text-[#D19C30] hover:bg-[#D19C30]/10 transition-colors rounded-md truncate font-medium group"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#D19C30]/70 group-hover:text-[#D19C30] shrink-0 transition-colors" />
                        <span className="truncate">{d.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Yangiliklar */}
            <Link
              href={localePath(locale, "/news")}
              className={`px-3 py-2 rounded-md transition-colors duration-200 ${
                isNewsActive
                  ? "text-[#D19C30] font-semibold"
                  : "text-slate-700 dark:text-slate-200 hover:text-[#D19C30]"
              }`}
            >
              {dict.nav.news}
            </Link>

            {/* 5. Loyihalar */}
            <Link
              href={localePath(locale, "/projects")}
              className={`px-3 py-2 rounded-md transition-colors duration-200 ${
                isProjectsActive
                  ? "text-[#D19C30] font-semibold"
                  : "text-slate-700 dark:text-slate-200 hover:text-[#D19C30]"
              }`}
            >
              {dict.nav.projects}
            </Link>

            {/* 6. Aloqa */}
            <Link
              href={localePath(locale, "/contact")}
              className={`px-3 py-2 rounded-md transition-colors duration-200 ${
                isContactActive
                  ? "text-[#D19C30] font-semibold"
                  : "text-slate-700 dark:text-slate-200 hover:text-[#D19C30]"
              }`}
            >
              {dict.nav.contact}
            </Link>
          </nav>

          {/* Right: Ariza button + Language switcher + Mobile menu trigger */}
          <div className="flex items-center gap-3">
            {/* Ariza button (Modal) */}
            <button
              type="button"
              onClick={() => setApplyModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#D19C30] hover:bg-[#b88523] active:scale-[0.98] transition-all duration-200 cursor-pointer rounded-md"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{dict.nav.applyBtn}</span>
            </button>

            {/* Language Switcher: Flag + Full Name */}
            <LanguageSwitcher currentLocale={locale} />

            {/* Mobile menu button (visible below lg) */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors rounded-md"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Sliding Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setMobileOpen(false)}
          />

          <div className="relative ml-auto w-full max-w-xs sm:max-w-sm h-full bg-white dark:bg-[#010c22] border-l border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 z-50">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
                <Link
                  href={localePath(locale, "")}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center shrink-0"
                  aria-label="NSZBD.UZ"
                >
                  <Image
                    src="/logo.svg"
                    alt="NSZBD Logo"
                    width={150}
                    height={36}
                    style={{ width: "auto" }}
                    className="h-8 w-auto object-contain dark:hidden"
                  />
                  <Image
                    src="/logo-dark.svg"
                    alt="NSZBD Logo"
                    width={150}
                    height={36}
                    style={{ width: "auto" }}
                    className="h-8 w-auto object-contain hidden dark:block"
                  />
                </Link>
                <div className="flex items-center gap-2">
                  <LanguageSwitcher currentLocale={locale} />
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-1 text-sm font-medium">
                <Link
                  href={localePath(locale, "")}
                  className={`block px-3 py-2 rounded-md transition-colors ${
                    isHomeActive
                      ? "text-[#D19C30] font-semibold bg-[#D19C30]/10"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#D19C30]"
                  }`}
                >
                  {dict.nav.home}
                </Link>

                {/* Mobile About Accordion */}
                <div className="py-1">
                  <span className="block px-3 py-1.5 text-xs font-bold text-[#D19C30] uppercase tracking-wider">
                    {dict.nav.aboutDropdown}
                  </span>
                  <div className="pl-3 space-y-1 mt-1 border-l-2 border-[#D19C30]/30 ml-3">
                    <Link
                      href={localePath(locale, "/about")}
                      className="block px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-[#D19C30]"
                    >
                      {dict.nav.about}
                    </Link>
                    <Link
                      href={localePath(locale, "/management")}
                      className="block px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-[#D19C30]"
                    >
                      {dict.nav.management}
                    </Link>
                    <Link
                      href={localePath(locale, "/tasks")}
                      className="block px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-[#D19C30]"
                    >
                      {dict.nav.tasks}
                    </Link>
                    <Link
                      href={localePath(locale, "/structure")}
                      className="block px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-[#D19C30]"
                    >
                      {dict.nav.structure}
                    </Link>
                    <Link
                      href={localePath(locale, "/documents")}
                      className="block px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-[#D19C30]"
                    >
                      {dict.nav.documents}
                    </Link>
                  </div>
                </div>

                {/* Mobile Zones */}
                <div className="py-1">
                  <Link
                    href={localePath(locale, "/zones")}
                    className="block px-3 py-1.5 text-xs font-bold text-[#D19C30] uppercase tracking-wider"
                  >
                    {dict.nav.zones}
                  </Link>
                </div>

                <Link
                  href={localePath(locale, "/news")}
                  className={`block px-3 py-2 rounded-md transition-colors ${
                    isNewsActive
                      ? "text-[#D19C30] font-semibold bg-[#D19C30]/10"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#D19C30]"
                  }`}
                >
                  {dict.nav.news}
                </Link>
                <Link
                  href={localePath(locale, "/projects")}
                  className={`block px-3 py-2 rounded-md transition-colors ${
                    isProjectsActive
                      ? "text-[#D19C30] font-semibold bg-[#D19C30]/10"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#D19C30]"
                  }`}
                >
                  {dict.nav.projects}
                </Link>
                <Link
                  href={localePath(locale, "/contact")}
                  className={`block px-3 py-2 rounded-md transition-colors ${
                    isContactActive
                      ? "text-[#D19C30] font-semibold bg-[#D19C30]/10"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-[#D19C30]"
                  }`}
                >
                  {dict.nav.contact}
                </Link>
              </div>
            </div>

            {/* Mobile drawer bottom Ariza CTA */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setApplyModalOpen(true);
                }}
                className="w-full py-3 px-4 font-semibold text-white bg-[#D19C30] hover:bg-[#b88523] flex items-center justify-center gap-2 rounded-md"
              >
                <FileText className="w-4 h-4" />
                <span>{dict.nav.applyBtn}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ariza Modal */}
      <ApplyModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        locale={locale}
      />
    </>
  );
}
