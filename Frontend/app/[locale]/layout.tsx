import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/i18n/config";
import { LocaleHtmlLang } from "@/components/locale-html-lang";
import { Topbar } from "@/components/topbar";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <div
        suppressHydrationWarning
        className="flex min-h-screen flex-col bg-[#EEEEEE] dark:bg-[#010c22] text-[#010c22] dark:text-[#F3F4F6] transition-colors duration-200"
      >
        <LocaleHtmlLang locale={locale} />
        <Topbar locale={locale} />
        <Header locale={locale} />
        <main className="flex-1 w-full">{children}</main>
        <Footer locale={locale} />
        <BackToTop locale={locale} />
      </div>
    </NextIntlClientProvider>
  );
}
