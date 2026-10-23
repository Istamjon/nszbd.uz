import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/contact-section";
import { GoogleMaps } from "@/components/google-maps";
import { Breadcrumb } from "@/components/breadcrumb";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 -mb-10 sm:-mb-12">
        <Breadcrumb locale={locale} items={[{ label: dict.nav.contact }]} />
      </div>

      {/* Contact Section Form & Info */}
      <ContactSection locale={locale} />

      {/* Google Maps Embed */}
      <GoogleMaps locale={locale} />
    </div>
  );
}
