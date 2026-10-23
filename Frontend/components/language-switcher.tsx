"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Locale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function FlagUZ({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg className={`${className} inline-block`} viewBox="0 0 500 250" fill="none">
      <rect width="500" height="250" fill="#1EB53A" />
      <rect width="500" height="166.6" fill="#FFFFFF" />
      <rect width="500" height="83.3" fill="#0099B5" />
      <rect y="80.8" width="500" height="5" fill="#CE1126" />
      <rect y="164.1" width="500" height="5" fill="#CE1126" />
      <circle cx="70" cy="42" r="30" fill="#FFFFFF" />
      <circle cx="78" cy="42" r="25" fill="#0099B5" />
      {/* Stars */}
      <circle cx="120" cy="22" r="3.5" fill="#FFFFFF" />
      <circle cx="140" cy="22" r="3.5" fill="#FFFFFF" />
      <circle cx="160" cy="22" r="3.5" fill="#FFFFFF" />
      <circle cx="120" cy="42" r="3.5" fill="#FFFFFF" />
      <circle cx="140" cy="42" r="3.5" fill="#FFFFFF" />
      <circle cx="160" cy="42" r="3.5" fill="#FFFFFF" />
      <circle cx="120" cy="62" r="3.5" fill="#FFFFFF" />
      <circle cx="140" cy="62" r="3.5" fill="#FFFFFF" />
      <circle cx="160" cy="62" r="3.5" fill="#FFFFFF" />
      <circle cx="100" cy="42" r="3.5" fill="#FFFFFF" />
      <circle cx="100" cy="62" r="3.5" fill="#FFFFFF" />
      <circle cx="80" cy="62" r="3.5" fill="#FFFFFF" />
    </svg>
  );
}

export function FlagRU({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg className={`${className} inline-block`} viewBox="0 0 600 300" fill="none">
      <rect width="600" height="100" fill="#FFFFFF" />
      <rect y="100" width="600" height="100" fill="#0039A6" />
      <rect y="200" width="600" height="100" fill="#D52B1E" />
    </svg>
  );
}

export function FlagEN({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg className={`${className} inline-block`} viewBox="0 0 600 300" fill="none">
      <clipPath id="s">
        <path d="M0,0 v300 h600 v-300 z" />
      </clipPath>
      <clipPath id="t">
        <path d="M0,0 L600,300 M600,0 L0,300" />
      </clipPath>
      <g clipPath="url(#s)">
        <path d="M0,0 v300 h600 v-300 z" fill="#012169" />
        <path d="M0,0 L600,300 M600,0 L0,300" stroke="#fff" strokeWidth="60" />
        <path d="M0,0 L600,300 M600,0 L0,300" clipPath="url(#t)" stroke="#C8102E" strokeWidth="40" />
        <path d="M300,0 v300 M0,150 h600" stroke="#fff" strokeWidth="100" />
        <path d="M300,0 v300 M0,150 h600" stroke="#C8102E" strokeWidth="60" />
      </g>
    </svg>
  );
}

const flagComponents: Record<Locale, React.ComponentType<{ className?: string }>> = {
  uz: FlagUZ,
  ru: FlagRU,
  en: FlagEN,
};

const languageNames: Record<Locale, string> = {
  uz: "O'zbekcha",
  ru: "Русский",
  en: "English",
};

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const dict = getDictionary(currentLocale);
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === currentLocale) {
      setOpen(false);
      return;
    }

    // Strip any existing locale prefix from pathname
    const segments = (pathname || "").split("/").filter(Boolean);
    if (segments.length > 0 && (locales as readonly string[]).includes(segments[0])) {
      segments.shift();
    }
    const purePath = `/${segments.join("/")}`;

    // Target path: uz has no prefix (as-needed), ru and en have prefixes
    const targetPath =
      newLocale === "uz"
        ? purePath === "/" ? "/" : purePath
        : `/${newLocale}${purePath === "/" ? "" : purePath}`;

    setOpen(false);

    // Set cookie for next-intl so server-side middleware matches user selection
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

    window.location.href = targetPath;
  };

  const CurrentFlag = flagComponents[currentLocale] || FlagUZ;

  return (
    <div className="relative inline-block" ref={ref}>
      {/* Toggle button: Displays ONLY flag and chevron arrow */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1.5 hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all duration-200 border border-slate-200 dark:border-slate-800 rounded-md cursor-pointer"
        aria-label={dict.locale.switcher}
      >
        <CurrentFlag className="w-5 h-3.5 shrink-0" />
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ease-out ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown with flags and full language names (No scroll!) */}
      {open && (
        <div className="absolute right-0 top-full mt-1.5 py-1 w-36 bg-white dark:bg-[#041438] border border-slate-200 dark:border-slate-800 z-50 animate-in fade-in zoom-in-95 duration-200 ease-out rounded-md">
          {locales.map((locale) => {
            const Flag = flagComponents[locale];
            const isSelected = locale === currentLocale;
            return (
              <button
                key={locale}
                type="button"
                onClick={() => switchLocale(locale)}
                className={`flex items-center gap-2.5 w-full px-3 py-2 text-xs hover:bg-[#D19C30]/15 transition-colors duration-150 cursor-pointer ${
                  isSelected
                    ? "bg-[#D19C30]/10 text-[#D19C30] font-bold"
                    : "text-slate-700 dark:text-slate-200"
                }`}
              >
                <Flag className="w-5 h-3.5 shrink-0" />
                <span className="text-xs font-medium">
                  {languageNames[locale]}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
