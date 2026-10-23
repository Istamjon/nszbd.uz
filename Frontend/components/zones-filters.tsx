"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { MapPin, Layers, RotateCcw } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface ZonesFiltersProps {
  selectedRegion?: string;
  selectedType?: string;
  districts: Option[];
  zoneTypes: Option[];
  labels: {
    region: string;
    type: string;
    reset: string;
  };
}

export function ZonesFilters({
  selectedRegion = "",
  selectedType = "",
  districts,
  zoneTypes,
  labels,
}: ZonesFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (key: "region" | "type", value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Reset pagination to page 1 on filter change
    params.delete("page");

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const handleReset = () => {
    router.push(pathname, { scroll: false });
  };

  const hasActiveFilters = Boolean(selectedRegion || selectedType);

  return (
    <div className="flex flex-wrap items-center justify-end gap-2.5 sm:gap-3">
      {/* 1. Hudud Dropdown */}
      <div className="relative inline-flex items-center">
        <MapPin className="w-3.5 h-3.5 text-[#D19C30] absolute left-3 pointer-events-none" />
        <select
          value={selectedRegion}
          onChange={(e) => handleFilterChange("region", e.target.value)}
          aria-label={labels.region}
          className="appearance-none pl-8 pr-8 py-2 text-xs font-semibold rounded-md bg-white dark:bg-[#041438] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:border-[#D19C30] dark:hover:border-[#D19C30] focus:border-[#D19C30] focus:outline-none focus:ring-1 focus:ring-[#D19C30] transition-colors cursor-pointer shadow-sm"
        >
          {districts.map((d) => (
            <option key={d.value || "all-regions"} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
            <path
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* 2. Turi Dropdown */}
      <div className="relative inline-flex items-center">
        <Layers className="w-3.5 h-3.5 text-[#D19C30] absolute left-3 pointer-events-none" />
        <select
          value={selectedType}
          onChange={(e) => handleFilterChange("type", e.target.value)}
          aria-label={labels.type}
          className="appearance-none pl-8 pr-8 py-2 text-xs font-semibold rounded-md bg-white dark:bg-[#041438] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:border-[#D19C30] dark:hover:border-[#D19C30] focus:border-[#D19C30] focus:outline-none focus:ring-1 focus:ring-[#D19C30] transition-colors cursor-pointer shadow-sm"
        >
          {zoneTypes.map((t) => (
            <option key={t.value || "all-types"} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
            <path
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* 3. Reset Button (shown only when any filter is active) */}
      {hasActiveFilters && (
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-md text-rose-500 hover:text-rose-600 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 hover:border-rose-300 transition-colors"
          title={labels.reset}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{labels.reset}</span>
        </button>
      )}
    </div>
  );
}
