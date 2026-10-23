import { isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Target, Award, CheckCircle2 } from "lucide-react";
import { getDictionary } from "@/i18n/dictionaries";
import { Breadcrumb } from "@/components/breadcrumb";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  const goals = dict.aboutPage.goals;
  const tasks = dict.aboutPage.tasks;

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb locale={locale} items={[{ label: dict.nav.about }]} />
      {/* White Container wrapper */}
      <div className="bg-white dark:bg-[#041438] border border-slate-200 dark:border-slate-800 rounded-md p-6 sm:p-10 lg:p-12 shadow-none">
        {/* Header Banner */}
        <div className="mb-10 pb-8 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#010c22] dark:text-white mb-4">
            {dict.aboutPage.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {dict.aboutPage.subtitle}
          </p>
        </div>

        {/* Main Narrative & Realistic Photo Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-14">
          {/* Narrative text directly on white container */}
          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            <p className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-relaxed">
              {dict.aboutPage.lead}
            </p>

            <p>{dict.aboutPage.lawNotice}</p>

            <p>{dict.aboutPage.zoneDef}</p>

            <p>{dict.aboutPage.leaseRole}</p>
          </div>

          {/* Realistic Generated Photo */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-md border border-slate-200 dark:border-slate-800 aspect-4/3 shadow-none">
              <Image
                src="/about-zone.jpg"
                alt={dict.aboutPage.title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Goals & Main Activities directly on white container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 pt-8 border-t border-slate-200 dark:border-slate-800">
          {/* Goals */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-5 h-5 text-[#D19C30] shrink-0" />
              <h2 className="text-xl font-bold text-[#010c22] dark:text-white">
                {dict.aboutPage.goalsTitle}
              </h2>
            </div>
            <div className="space-y-3.5">
              {goals.map((goal, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#D19C30] shrink-0 mt-1" />
                  <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {goal}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-5 h-5 text-[#D19C30] shrink-0" />
              <h2 className="text-xl font-bold text-[#010c22] dark:text-white">
                {dict.aboutPage.activityDirectionsTitle}
              </h2>
            </div>
            <div className="space-y-3.5">
              {tasks.map((task, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#D19C30] shrink-0 mt-1" />
                  <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {task}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
