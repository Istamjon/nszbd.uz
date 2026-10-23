"use client";

import * as React from "react";
import Link from "next/link";
import { Send, Phone } from "lucide-react";
import { Locale, localePath } from "@/i18n/config";
import { ApplyModal } from "./apply-modal";

interface ZoneCtaBannerProps {
  locale: Locale;
  title: string;
  desc: string;
  ctaApply: string;
  ctaContact: string;
}

export function ZoneCtaBanner({
  locale,
  title,
  desc,
  ctaApply,
  ctaContact,
}: ZoneCtaBannerProps) {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <>
      <div className="p-6 sm:p-8 bg-slate-50 dark:bg-[#010c22] border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-md">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base sm:text-lg font-bold text-[#010c22] dark:text-white">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
            {desc}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-md text-white bg-[#D19C30] hover:bg-[#b88523] active:scale-95 transition-all shadow-sm cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{ctaApply}</span>
          </button>
          <Link
            href={localePath(locale, "/contact")}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#041438] text-slate-700 dark:text-slate-200 hover:border-[#D19C30] hover:text-[#D19C30] transition-colors shadow-sm"
          >
            <Phone className="w-4 h-4 text-[#D19C30]" />
            <span>{ctaContact}</span>
          </Link>
        </div>
      </div>

      <ApplyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        locale={locale}
      />
    </>
  );
}
