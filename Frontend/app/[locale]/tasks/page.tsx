import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import { CheckCircle2, TrendingUp, Layers, Activity, Shield } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function TasksPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  const mainDuties = [
    dict.tasksPage.task1,
    dict.tasksPage.task2,
    dict.tasksPage.task3,
    dict.tasksPage.task4,
    dict.tasksPage.task5,
    dict.tasksPage.task6,
  ];

  const functionalAreas = [
    {
      title: dict.tasksPage.funcGroup1Title,
      icon: Layers,
      items: dict.tasksPage.funcGroup1Items,
    },
    {
      title: dict.tasksPage.funcGroup2Title,
      icon: TrendingUp,
      items: dict.tasksPage.funcGroup2Items,
    },
    {
      title: dict.tasksPage.funcGroup3Title,
      icon: Shield,
      items: dict.tasksPage.funcGroup3Items,
    },
    {
      title: dict.tasksPage.funcGroup4Title,
      icon: Activity,
      items: dict.tasksPage.funcGroup4Items,
    },
  ];

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb locale={locale} items={[{ label: dict.nav.tasks }]} />
      {/* White Container wrapper */}
      <div className="bg-white dark:bg-[#041438] border border-slate-200 dark:border-slate-800 rounded-md p-6 sm:p-10 lg:p-12 shadow-none">
        {/* Header */}
        <div className="mb-10 pb-8 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#010c22] dark:text-white mb-4">
            {dict.tasksPage.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {dict.tasksPage.subtitle}
          </p>
        </div>

        {/* 1. Main Duties (Clean 2-column checklist directly on white container) */}
        <div className="mb-14">
          <h2 className="text-xl sm:text-2xl font-bold text-[#010c22] dark:text-white mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
            {dict.tasksPage.tasksTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
            {mainDuties.map((duty, index) => (
              <div key={index} className="flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-[#D19C30] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {duty}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Functional Areas in 2 columns */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-xl sm:text-2xl font-bold text-[#010c22] dark:text-white mb-8">
            {dict.tasksPage.functionsTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {functionalAreas.map((area, idx) => {
              const Icon = area.icon;
              return (
                <div key={idx} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-[#D19C30] shrink-0" />
                    <h3 className="text-base sm:text-lg font-bold text-[#010c22] dark:text-white">
                      {area.title}
                    </h3>
                  </div>
                  <ul className="space-y-2.5 pl-9">
                    {area.items.map((item, i) => (
                      <li
                        key={i}
                        className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D19C30] shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
