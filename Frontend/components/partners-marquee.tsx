"use client";

import * as React from "react";
import Image from "next/image";
import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function PartnersMarquee({ locale = "uz" }: { locale?: Locale }) {
  const dict = getDictionary(locale);

  const partners = [
    {
      title: dict.footer.presidentSite,
      url: "https://president.uz",
      logo: "/gerb.svg",
      isBanner: false,
    },
    {
      title: dict.footer.govPortal,
      url: "https://gov.uz",
      logo: "/gerb.svg",
      isBanner: false,
    },
    {
      title: dict.footer.eAuction,
      url: "https://e-auksion.uz",
      logo: "/partners/e-auksion.png",
      isBanner: true,
      showTitle: false,
    },
    {
      title: dict.footer.hokimiyatUnder,
      url: "https://navoi.uz",
      logo: "/gerb.svg",
      isBanner: false,
    },
    {
      title: dict.footer.lexUz,
      url: "https://lex.uz",
      logo: "/partners/lexuz.png",
      isBanner: true,
      showTitle: false,
    },
    {
      title: dict.footer.myGov,
      url: "https://my.gov.uz",
      logo: "/partners/mygov.svg",
      isBanner: true,
      showTitle: false,
    },
  ];

  // Repeat for continuous infinite scrolling
  const marqueeItems = [...partners, ...partners, ...partners];

  return (
    <section className="py-8 bg-[#010c22] border-y border-slate-800 overflow-hidden">
      <div className="flex animate-marquee">
        {marqueeItems.map((item, index) => (
          <a
            key={`${item.url}-${index}`}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={item.title}
            className="flex items-center gap-3.5 px-5 h-[58px] mx-2.5 bg-white dark:bg-[#041438] border border-slate-700/60 dark:border-slate-800 rounded-none shrink-0 cursor-pointer shadow-none hover:border-[#D19C30] transition-colors"
          >
            {/* Original Logo or Uzbekistan Gerbi */}
            <div className="relative shrink-0 flex items-center justify-center">
              {item.isBanner ? (
                <Image
                  src={item.logo}
                  alt={item.title}
                  width={item.showTitle === false ? 160 : 130}
                  height={item.showTitle === false ? 36 : 32}
                  style={{ width: "auto" }}
                  className={`${
                    item.showTitle === false ? "h-9 max-w-[160px]" : "h-8 max-w-[130px]"
                  } w-auto object-contain`}
                />
              ) : (
                <Image
                  src={item.logo}
                  alt={item.title}
                  width={36}
                  height={36}
                  style={{ width: "36px", height: "36px" }}
                  className="object-contain"
                />
              )}
            </div>

            {/* Official Title Only (hidden for E-Auksion, Lex.uz, and MyGov) */}
            {item.showTitle !== false && (
              <span className="text-xs sm:text-sm font-bold text-[#010c22] dark:text-white whitespace-nowrap">
                {item.title}
              </span>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
