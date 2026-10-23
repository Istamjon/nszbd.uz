import { isLocale, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/hero-section";
import { KpiBar } from "@/components/kpi-bar";
import { ZonesCarousel } from "@/components/zones-carousel";
import { AboutPreview } from "@/components/about-preview";
import { NewsPreview } from "@/components/news-preview";
import { ContactSection } from "@/components/contact-section";
import { PartnersMarquee } from "@/components/partners-marquee";
import { GoogleMaps } from "@/components/google-maps";
import { getIndustrialZones, getNews, getProjects } from "@/lib/content";
import { getMediaUrl } from "@/lib/media";
import { getDictionary } from "@/i18n/dictionaries";
import { formatDate } from "@/lib/date";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  // Fetch real data from ElmapiCMS
  const [zonesEntries, newsEntries, projectEntries] = await Promise.all([
    getIndustrialZones(locale),
    getNews(locale),
    getProjects(locale),
  ]);

  // Map zones to carousel format
  const mappedZones = zonesEntries.map((entry) => ({
    id: entry.uuid,
    name: entry.fields.name,
    region:
      (Array.isArray(entry.fields.region) ? entry.fields.region[0] : entry.fields.region) ||
      dict.zones.defaultRegion,
    zoneType:
      (Array.isArray(entry.fields["zone-type"]) ? entry.fields["zone-type"][0] : entry.fields["zone-type"]) ||
      dict.zones.defaultZoneType,
    totalArea: entry.fields["total-area"],
    freeArea: entry.fields["free-area"],
    enterprisesCount: entry.fields["enterprises-count"],
    jobsCreated: entry.fields["jobs-created"],
    description:
      entry.fields.description?.replace(/<[^>]+>/g, "") ||
      dict.zones.subtitle,
    image: getMediaUrl(entry.fields.image) || "/zone-banner.jpg",
  }));

  // Sanoat zonalarining umumiy yer maydonini hisoblab qo'shib jamini chiqarish
  const calculatedTotalArea = Number(
    zonesEntries
      .reduce((sum, zone) => {
        const val = zone.fields["total-area"];
        if (typeof val === "number") return sum + (isNaN(val) ? 0 : val);
        const parsed = parseFloat(String(val || 0).replace(/\s+/g, "").replace(",", "."));
        return sum + (isNaN(parsed) ? 0 : parsed);
      }, 0)
      .toFixed(2)
  );

  // Sanoat zonalarining yaratilgan ish o'rinlarini hisoblab qo'shib jamini chiqarish
  const calculatedJobs = zonesEntries.reduce((sum, zone) => {
    const val = zone.fields["jobs-created"];
    if (typeof val === "number") return sum + (isNaN(val) ? 0 : val);
    const parsed = parseInt(String(val || 0).replace(/\D/g, ""), 10);
    return sum + (isNaN(parsed) ? 0 : parsed);
  }, 0);

  const kpiData = {
    zonesCount: zonesEntries.length,
    totalArea: calculatedTotalArea,
    enterprisesCount: projectEntries.length,
    jobsCreated: calculatedJobs,
  };

  // Map news items
  const mappedNews = newsEntries.map((entry) => ({
    id: entry.uuid,
    title: entry.fields.title,
    excerpt: entry.fields.excerpt,
    date: formatDate(entry.fields["published-date"] || entry.published_at || ""),
    image: getMediaUrl(entry.fields.image) || "/news-banner.jpg",
  }));

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <HeroSection locale={locale} />

      {/* 2. Dynamic Animated KPI Bar */}
      <KpiBar locale={locale} initialData={kpiData} />

      {/* 3. Sanoat Zonalari Carousel */}
      <ZonesCarousel locale={locale} zones={mappedZones} />

      {/* 4. Korxona qisqacha ma'lumot (About preview) */}
      <AboutPreview locale={locale} />

      {/* 5. News Carousel / Section */}
      <NewsPreview locale={locale} news={mappedNews} />

      {/* 6. Bog'lanish (Contact & Inquiry Section) */}
      <ContactSection locale={locale} />

      {/* 7. Maps Section (Interactive full-width map) */}
      <GoogleMaps locale={locale} />

      {/* 8. Foydali Havolalar Karuseli (Partners Marquee) */}
      <PartnersMarquee locale={locale} />
    </div>
  );
}
