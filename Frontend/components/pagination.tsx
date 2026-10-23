import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  queryParams?: Record<string, string | number | undefined | null>;
  dict: {
    prev: string;
    next: string;
    page: string;
    showing: string;
    of: string;
    total: string;
  };
  totalItems?: number;
  pageSize?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  queryParams,
  dict,
  totalItems,
  pageSize,
}: PaginationProps) {
  if (totalPages < 1 || (totalItems !== undefined && totalItems === 0)) return null;

  const buildUrl = (pageNumber: number) => {
    const params = new URLSearchParams();

    if (queryParams) {
      for (const [key, value] of Object.entries(queryParams)) {
        if (
          value !== undefined &&
          value !== null &&
          value !== "" &&
          key !== "page"
        ) {
          params.set(key, String(value));
        }
      }
    }

    if (pageNumber > 1) {
      params.set("page", String(pageNumber));
    }

    const query = params.toString();
    return query ? `${baseUrl}?${query}` : baseUrl;
  };

  // Generate page numbers to display with smart ellipsis
  const getPageNumbers = () => {
    const delta = 1;
    const range: number[] = [];
    const rangeWithDots: (number | "...")[] = [];
    let l: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    for (const i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const pages = getPageNumbers();
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const startItem = pageSize ? (currentPage - 1) * pageSize + 1 : undefined;
  const endItem =
    pageSize && totalItems
      ? Math.min(currentPage * pageSize, totalItems)
      : undefined;

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      {/* Information text */}
      <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        {totalItems !== undefined && startItem !== undefined && endItem !== undefined ? (
          <span>
            {dict.showing}{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {startItem}-{endItem}
            </span>{" "}
            {dict.of}{" "}
            <span className="font-semibold text-[#D19C30]">{totalItems}</span>{" "}
            {dict.total}
          </span>
        ) : (
          <span>
            {dict.page}{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {currentPage}
            </span>{" "}
            {dict.of}{" "}
            <span className="font-semibold text-[#D19C30]">{totalPages}</span>
          </span>
        )}
      </div>

      {/* Page navigation controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Previous page button */}
        {hasPrev ? (
          <Link
            href={buildUrl(currentPage - 1)}
            className="inline-flex items-center gap-1 px-3 py-2 text-xs sm:text-sm font-semibold rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#041438] text-slate-700 dark:text-slate-300 hover:border-[#D19C30] hover:text-[#D19C30] active:scale-95 transition-all duration-200 ease-out"
            aria-label={dict.prev}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden xs:inline">{dict.prev}</span>
          </Link>
        ) : (
          <span
            className="inline-flex items-center gap-1 px-3 py-2 text-xs sm:text-sm font-semibold rounded-md border border-slate-200/50 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-900/40 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50"
            aria-disabled="true"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden xs:inline">{dict.prev}</span>
          </span>
        )}

        {/* Numbered page items */}
        <div className="flex items-center gap-1">
          {pages.map((p, idx) => {
            if (p === "...") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-2.5 py-1.5 text-xs text-slate-400"
                >
                  ...
                </span>
              );
            }

            const isCurrent = p === currentPage;
            return isCurrent ? (
              <span
                key={p}
                aria-current="page"
                className="inline-flex items-center justify-center min-w-[36px] h-9 px-3 text-xs sm:text-sm font-bold rounded-md bg-[#D19C30] text-white border border-[#D19C30]"
              >
                {p}
              </span>
            ) : (
              <Link
                key={p}
                href={buildUrl(p)}
                className="inline-flex items-center justify-center min-w-[36px] h-9 px-3 text-xs sm:text-sm font-semibold rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#041438] text-slate-700 dark:text-slate-300 hover:border-[#D19C30] hover:text-[#D19C30] active:scale-95 transition-all duration-200 ease-out"
              >
                {p}
              </Link>
            );
          })}
        </div>

        {/* Next page button */}
        {hasNext ? (
          <Link
            href={buildUrl(currentPage + 1)}
            className="inline-flex items-center gap-1 px-3 py-2 text-xs sm:text-sm font-semibold rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#041438] text-slate-700 dark:text-slate-300 hover:border-[#D19C30] hover:text-[#D19C30] active:scale-95 transition-all duration-200 ease-out"
            aria-label={dict.next}
          >
            <span className="hidden xs:inline">{dict.next}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <span
            className="inline-flex items-center gap-1 px-3 py-2 text-xs sm:text-sm font-semibold rounded-md border border-slate-200/50 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-900/40 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50"
            aria-disabled="true"
          >
            <span className="hidden xs:inline">{dict.next}</span>
            <ChevronRight className="w-4 h-4" />
          </span>
        )}
      </div>
    </nav>
  );
}
