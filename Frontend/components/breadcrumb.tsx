import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import { Locale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  locale: Locale;
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ locale, items, className = "" }: BreadcrumbProps) {
  const dict = getDictionary(locale);

  return (
    <nav
      aria-label="Breadcrumb"
      className={`mb-6 sm:mb-8 text-xs sm:text-sm ${className}`}
    >
      <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-slate-500 dark:text-slate-400">
        <li className="inline-flex items-center">
          <Link
            href={localePath(locale, "/")}
            className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-[#D19C30] transition-colors duration-200 font-medium group"
          >
            <Home className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-[#D19C30] transition-colors duration-200" />
            <span>{dict.nav.home}</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="inline-flex items-center gap-1.5 sm:gap-2">
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 flex-shrink-0" />
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className="font-medium text-slate-900 dark:text-white line-clamp-1 max-w-[200px] sm:max-w-md truncate"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-slate-700 dark:text-slate-300 hover:text-[#D19C30] transition-colors duration-200 font-medium whitespace-nowrap"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
