"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function ThemeToggle({ locale = "uz" }: { locale?: Locale }) {
  const dict = getDictionary(locale);
  const { theme, setTheme } = useTheme();
  const emptySubscribe = React.useCallback(() => () => {}, []);
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-md" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={dict.common.themeToggle}
      className="p-1.5 text-slate-700 dark:text-slate-200 hover:text-[#D19C30] dark:hover:text-[#D19C30] hover:bg-black/5 dark:hover:bg-white/10 active:scale-90 transition-all duration-200 cursor-pointer rounded-md"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#D19C30] transition-transform duration-300 ease-out rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-300 ease-out rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
}
