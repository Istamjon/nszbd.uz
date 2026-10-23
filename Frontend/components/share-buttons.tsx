"use client";

import * as React from "react";
import { Copy, Check, Send, Share2 } from "lucide-react";
import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

interface ShareButtonsProps {
  title: string;
  locale: Locale;
}

export function ShareButtons({ title, locale }: ShareButtonsProps) {
  const dict = getDictionary(locale);
  const [copied, setCopied] = React.useState(false);
  const emptySubscribe = React.useCallback(() => () => {}, []);
  const currentUrl = React.useSyncExternalStore(
    emptySubscribe,
    () => window.location.href,
    () => ""
  );

  const handleCopy = async () => {
    try {
      if (currentUrl) {
        await navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback if clipboard API is restricted
    }
  };

  const telegramShareUrl = currentUrl
    ? `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`
    : "#";

  const facebookShareUrl = currentUrl
    ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
    : "#";

  return (
    <div className="flex flex-wrap items-center gap-2.5 pt-6 mt-8 border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-2">
        <Share2 className="w-3.5 h-3.5 text-[#D19C30]" />
        <span>{dict.share.title}</span>
      </div>

      {/* Telegram Share Button */}
      <a
        href={telegramShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#229ED9]/10 hover:bg-[#229ED9]/20 text-[#229ED9] text-xs font-semibold rounded-md transition-colors"
      >
        <Send className="w-3.5 h-3.5" />
        <span>{dict.share.telegram}</span>
      </a>

      {/* Facebook Share Button */}
      <a
        href={facebookShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] text-xs font-semibold rounded-md transition-colors"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
        <span>{dict.share.facebook}</span>
      </a>

      {/* Copy Link Button */}
      <button
        type="button"
        onClick={handleCopy}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
          copied
            ? "bg-emerald-500 text-white"
            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
        }`}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5" />
            <span>{dict.share.copied}</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>{dict.share.copy}</span>
          </>
        )}
      </button>
    </div>
  );
}
