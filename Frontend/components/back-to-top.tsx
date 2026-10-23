"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";
import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

function subscribeScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

export function BackToTop({ locale = "uz" }: { locale?: Locale }) {
  const dict = getDictionary(locale);
  const visible = React.useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 300,
    () => false
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={dict.common.backToTop}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#D19C30] hover:bg-[#b88523] text-white flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95 group ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  );
}
