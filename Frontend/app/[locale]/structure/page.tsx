import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import { StructureChart } from "@/components/structure-chart";
import { Breadcrumb } from "@/components/breadcrumb";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function StructurePage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb locale={locale} items={[{ label: dict.nav.structure }]} />
      {/* White Container wrapper */}
      <div className="bg-white dark:bg-[#041438] border border-slate-200 dark:border-slate-800 rounded-md p-6 sm:p-10 lg:p-12 shadow-none">
        {/* Page Header */}
        <div className="mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#010c22] dark:text-white mb-3">
            {dict.structurePage.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {dict.structurePage.subtitle}
          </p>
        </div>

        {/* Structure Chart */}
        <StructureChart dict={dict.structurePage} locale={locale} />
      </div>
    </div>
  );
}
