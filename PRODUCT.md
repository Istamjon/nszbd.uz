# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary Users**: Local and international industrial investors, manufacturers, and entrepreneurs seeking production land, utilities, infrastructure, and state incentives in Navoi region industrial zones.
- **Secondary Users**: Citizens, media representatives, and regional stakeholders researching industrial statistics, management structure, open tenders, legal decrees, and news.
- **Administrative Users**: Directorate staff managing investor applications, zone occupancy data, and news via ElmapiCMS.

## Product Purpose

The official digital portal and investment gateway for the Directorate of Small and Youth Industrial Zones of Navoi Region (*Navoiy viloyati kichik va yoshlar sanoat zonalarini boshqarish direksiyasi*). Its purpose is to showcase regional industrial potential, provide transparent data on available plots and infrastructure, facilitate investor applications, and publish authoritative regulatory and organizational updates.

## Positioning

The sole authoritative state institution managing small and youth industrial zones across Navoi region's districts and cities (Karmana, Zarafshon, Navoiy, Konimex, Qiziltepa, Navbahor, Nurota, Tomdi, Uchquduq, Xatirchi, G'ozg'on), offering direct access to allocated state land parcels, guaranteed utility connections, and official investment support.

## Operating Context

- High-stakes investment decision-making by domestic and foreign business leaders on both desktop and mobile devices.
- Trilingual operation: Uzbek (primary), Russian, and English with seamless language switching and parity of content.
- Corporate and governmental viewing environments demanding fast loading, strict visual dignity, high readability, and WCAG accessibility.

## Capabilities and Constraints

- **Architecture**: Headless architecture using ElmapiCMS for content collections (`sanoat-zonalari`, `loyihalar`, `rahbariyat`, `yangiliklar`, `huquqiy-hujjatlar`, `site-settings`) and Next.js 16 App Router for presentation.
- **Internationalization**: Complete trilingual support via `next-intl` (uz, ru, en) with `localePrefix: as-needed` (clean URLs for default Uzbek).
- **Interactive Features**: District-based zone filtering, interactive investor application modal, dynamic project and news pages, responsive navigation with mobile drawer, and seamless Light/Dark mode.
- **Constraints**: Institutional tone must remain restrained, professional, and free of marketing fluff or AI design clichés (no decorative badge pill counters, no side-tab borders, no generic gradients).

## Brand Commitments

- **Entity Name**: Navoiy viloyati sanoat zonalarini boshqarish direksiyasi (NSZBD).
- **Core Color Palette**: Primary Gold (`#D19C30`), Deep Corporate Navy (`#010c22`, `#041438`), Canvas Neutral (`#EEEEEE`, `#FFFFFF`).
- **Typography**: Inter font family across all weights and headings.
- **Identity Assets**: Official institutional emblem/crest mark in SVG format without redundant text clutter.

## Evidence on Hand

- Verified physical address: Navoiy shahri, A.Temur ko'chasi, 4-uy.
- Contact channels: `+998 79 223-28-77`, `ksznavoiy@umail.uz`.
- ElmapiCMS collections populated with authentic industrial zone data, projects, news, management profiles, and regulatory decrees in three languages.
- Complete Next.js App Router codebase generating 37 production routes cleanly.

## Product Principles

1. **Institutional Authority**: Every page conveys credibility, clarity, and governmental trust without superfluous ornament.
2. **Investor Utility First**: Crucial data—land area, utility connections, active projects, application forms—is accessible within two clicks.
3. **Trilingual Equality**: Information parity across Uzbek, Russian, and English; no secondary languages treated as afterthoughts.
4. **Performance & Access**: Instantaneous page loads, fluid transitions, and WCAG AA contrast compliance across both light and dark themes.

## Accessibility & Inclusion

- WCAG 2.1 AA compliant contrast ratios across dark and light palettes.
- Fully keyboard-accessible navigation and modal dialogs with focus trapping.
- Semantic HTML5 structure with distinct ARIA landmark regions and localized meta titles.
