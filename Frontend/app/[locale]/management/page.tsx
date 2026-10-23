import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Phone, Mail, Calendar } from "lucide-react";
import { getLeadership } from "@/lib/content";
import { getMediaUrl } from "@/lib/media";
import { Breadcrumb } from "@/components/breadcrumb";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ManagementPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  const cmsLeaders = await getLeadership(locale);

  const leaders = (cmsLeaders || [])
    .map((leader) => {
      const fullname = leader.fields.fullname || "";
      const position = leader.fields.position || "";
      const isDeputy =
        position.toLowerCase().includes("o'rinbosar") ||
        position.toLowerCase().includes("заместитель") ||
        position.toLowerCase().includes("deputy") ||
        fullname.toLowerCase().includes("ibragimov");

      const backendImage = getMediaUrl(leader.fields.image);

      return {
        id: leader.uuid,
        fullname,
        position,
        receptionDays: leader.fields["reception-days"] || "",
        phone: leader.fields.phone || "",
        email: leader.fields.email || "",
        image: backendImage || (isDeputy ? "/orinbosar.jpg" : "/direktor.jpg"),
        isDeputy,
      };
    })
    .sort((a) => (a.isDeputy ? 1 : -1));

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb locale={locale} items={[{ label: dict.nav.management }]} />
      {/* White Container wrapper */}
      <div className="bg-white dark:bg-[#041438] border border-slate-200 dark:border-slate-800 rounded-md p-6 sm:p-10 lg:p-12 shadow-none">
        {/* Header */}
        <div className="mb-10 pb-8 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#010c22] dark:text-white mb-4">
            {dict.managementPage.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {dict.managementPage.subtitle}
          </p>
        </div>

        {/* Leadership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row bg-slate-50 dark:bg-[#02102e] border border-slate-200 dark:border-slate-800 rounded-md overflow-hidden transition-colors"
            >
              {/* Photo */}
              <div className="sm:w-5/12 relative min-h-[300px] bg-slate-900 overflow-hidden">
                <Image
                  src={leader.image}
                  alt={leader.fullname}
                  fill
                  sizes="(max-width: 640px) 100vw, 350px"
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Info */}
              <div className="sm:w-7/12 p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#D19C30] mb-2">
                    {leader.position}
                  </p>

                  <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-[#010c22] dark:text-white mb-6 leading-snug">
                    {leader.fullname}
                  </h2>

                  {/* Contact items: Icons only, no redundant text labels */}
                  <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-[#D19C30] shrink-0" />
                      <span className="font-medium text-slate-700 dark:text-slate-200">
                        {leader.receptionDays}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-[#D19C30] shrink-0" />
                      <a
                        href={`tel:${leader.phone.replace(/[^0-9+]/g, "")}`}
                        className="hover:text-[#D19C30] font-medium text-slate-700 dark:text-slate-200 transition-colors"
                      >
                        {leader.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-[#D19C30] shrink-0" />
                      <a
                        href={`mailto:${leader.email}`}
                        className="hover:text-[#D19C30] font-medium text-slate-700 dark:text-slate-200 transition-colors"
                      >
                        {leader.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
