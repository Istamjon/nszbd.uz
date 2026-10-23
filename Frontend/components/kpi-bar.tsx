"use client";

import * as React from"react";
import { Factory, Map, Building2, Users } from"lucide-react";
import { Locale } from"@/i18n/config";
import { getDictionary } from"@/i18n/dictionaries";

interface KpiData {
 zonesCount: number;
 totalArea: number;
 enterprisesCount: number;
 jobsCreated: number;
}

export function KpiBar({
 locale,
  initialData = {
    zonesCount: 0,
    totalArea: 0,
    enterprisesCount: 0,
    jobsCreated: 0,
  },
}: {
 locale: Locale;
 initialData?: KpiData;
}) {
 const dict = getDictionary(locale);
 const containerRef = React.useRef<HTMLDivElement>(null);
 const [animated, setAnimated] = React.useState(false);
 const [counters, setCounters] = React.useState({
 zones: 0,
 area: 0,
 enterprises: 0,
 jobs: 0,
 });

 React.useEffect(() => {
 const observer = new IntersectionObserver(
 (entries) => {
 if (entries[0]?.isIntersecting && !animated) {
 setAnimated(true);

 const duration = 2000; // 2 seconds
 const startTime = performance.now();

 const animate = (currentTime: number) => {
 const elapsed = currentTime - startTime;
 const progress = Math.min(elapsed / duration, 1);
 // Ease-out cubic
 const ease = 1 - Math.pow(1 - progress, 3);

 setCounters({
 zones: Math.floor(ease * initialData.zonesCount),
 area: Number((ease * initialData.totalArea).toFixed(2)),
 enterprises: Math.floor(ease * initialData.enterprisesCount),
 jobs: Math.floor(ease * initialData.jobsCreated),
 });

 if (progress < 1) {
 requestAnimationFrame(animate);
 } else {
 setCounters({
 zones: initialData.zonesCount,
 area: initialData.totalArea,
 enterprises: initialData.enterprisesCount,
 jobs: initialData.jobsCreated,
 });
 }
 };

 requestAnimationFrame(animate);
 }
 },
 { threshold: 0.25 },
 );

 if (containerRef.current) {
 observer.observe(containerRef.current);
 }

 return () => observer.disconnect();
 }, [animated, initialData]);

 const stats = [
 {
 id:"zones",
 icon: Factory,
 value: counters.zones,
 unit: dict.kpi.zonesUnit,
 label: dict.kpi.zonesCount,
 },
 {
 id:"area",
 icon: Map,
 value: counters.area,
 unit: dict.kpi.totalAreaUnit,
 label: dict.kpi.totalArea,
 },
 {
 id:"enterprises",
 icon: Building2,
 value: counters.enterprises,
 unit: dict.kpi.enterprisesUnit,
 label: dict.kpi.enterprises,
 },
 {
 id:"jobs",
 icon: Users,
 value: counters.jobs.toLocaleString(),
 unit: dict.kpi.jobsUnit,
 label: dict.kpi.jobs,
 },
 ];

 return (
 <div
 ref={containerRef}
 className="relative z-20 -mt-10 sm:-mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
 >
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-6 bg-white dark:bg-[#041438] border border-slate-200/80 dark:border-slate-800 backdrop-blur-md">
 {stats.map((item) => {
 const Icon = item.icon;
 return (
 <div
 key={item.id}
 className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-[#061c4d] transition-colors duration-200"
 >
 <div className="text-[#D19C30] shrink-0 flex items-center justify-center">
                  <Icon className="w-8 h-8" />
                </div>
 <div className="flex flex-col">
 <div className="flex items-baseline gap-1.5">
 <span className="text-2xl sm:text-3xl font-extrabold text-[#010c22] dark:text-white tracking-tight">
 {item.value}
 </span>
 <span className="text-xs font-semibold text-[#D19C30]">
 {item.unit}
 </span>
 </div>
 <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
 {item.label}
 </span>
 </div>
 </div>
 );
 })}
 </div>
 </div>
 );
}
