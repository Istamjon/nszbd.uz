import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import { FileText, Download } from "lucide-react";
import { getLegalDocuments } from "@/lib/content";
import { getMediaUrl } from "@/lib/media";
import { Breadcrumb } from "@/components/breadcrumb";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function DocumentsPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  const cmsDocs = await getLegalDocuments(locale);

  const documents = (cmsDocs || []).map((doc, idx) => {
    const pdfUrl = getMediaUrl(doc.fields["pdf-file"]);

    return {
      id: doc.uuid || `doc-${idx}`,
      title: doc.fields.title || "",
      description:
        (typeof doc.fields.description === "string"
          ? doc.fields.description.replace(/<[^>]+>/g, "").trim()
          : "") || "",
      pdfUrl: pdfUrl || "",
    };
  });

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb locale={locale} items={[{ label: dict.nav.documents }]} />

      {/* Header */}
      <div className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#010c22] dark:text-white mb-4">
          {dict.documentsPage.title}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          {dict.documentsPage.subtitle}
        </p>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 sm:p-8 bg-white dark:bg-[#041438] border border-slate-200 dark:border-slate-800 hover:border-[#D19C30]/70 dark:hover:border-[#D19C30]/60 transition-all duration-300 ease-out group"
          >
            <div className="flex items-start gap-4 sm:gap-6 max-w-3xl">
              {/* Document Icon without background */}
              <div className="pt-0.5 text-[#D19C30] shrink-0 transition-transform duration-200 group-hover:scale-105">
                <FileText className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-bold text-[#010c22] dark:text-white group-hover:text-[#D19C30] transition-colors duration-200">
                  {doc.title}
                </h2>

                {doc.description && (
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {doc.description}
                  </p>
                )}
              </div>
            </div>

            {/* Download Button */}
            {doc.pdfUrl && (
              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <a
                  href={doc.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 text-xs font-semibold text-white bg-[#010c22] dark:bg-[#D19C30] hover:bg-[#D19C30] dark:hover:bg-[#b88523] active:scale-95 transition-all duration-200 ease-out shadow-sm rounded-md"
                >
                  <Download className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
                  <span>{dict.documentsPage.downloadDoc}</span>
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
