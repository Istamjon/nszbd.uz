---
name: Navoiy KSZ Direksiyasi
description: Official investment portal for Small and Youth Industrial Zones of Navoi Region
colors:
  primary: "#D19C30"
  primary-hover: "#b88523"
  primary-light: "#fef7e9"
  primary-dark: "#8c6314"
  navy-main: "#010c22"
  navy-card: "#041438"
  navy-border: "#0a2558"
  navy-accent: "#1e3a8a"
  canvas-light: "#EEEEEE"
  canvas-card: "#FFFFFF"
  canvas-border: "#E2E8F0"
  slate-muted: "#cbd5e1"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.15
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.25
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
  caption:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
  micro:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.3
  nano:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "10px"
    fontWeight: 500
    lineHeight: 1.2
rounded:
  none: "0px" # Cards, containers, sections
  control: "0.375rem" # Buttons, inputs, textareas, selects (rounded-md)
  circle: "9999px" # Carousel navigation arrows, indicator dots (rounded-full)
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.none}"
    padding: "10px 24px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
---

# Design System: Navoiy KSZ Direksiyasi

## Overview

**Creative North Star: "Sovereign Industrial Gateway"**

The visual system embodies state authority, industrial precision, and welcoming investment clarity. Designed for institutional trust, it combines deep maritime navy surfaces with high-clarity canvas neutrals and warm, authoritative gold accents.

The aesthetic philosophy centers on restrained institutional dignity. The interface rejects consumer-grade decoration, rounded bubbles, and drop shadows in favor of crisp typography, sharp architectural card geometry, and immediate investor utility.

**Key Characteristics:**
- Restrained, purposeful application of primary gold accent.
- High-contrast, WCAG AA compliant light and dark mode implementations.
- Clean typography rhythm anchored strictly in the Inter font family.
- Sharp, flat architectural geometry without rounded corners or drop shadows.

## Colors

A tripartite corporate palette balancing state authority with warm economic opportunity.

### Primary
- **Industrial Gold** (#D19C30): Reserved for primary calls-to-action, key statistics highlights, active navigation accents, and the official crest geometry.

### Neutral
- **Deep Corporate Navy** (#010c22): Serves as the primary canvas in dark mode and high-contrast text color in light mode.
- **Navy Elevated Card** (#041438): Dark mode card surface background with subtle contrast.
- **Canvas Light** (#EEEEEE): Light mode background canvas providing a soft, non-glare foundation.
- **Pure White** (#FFFFFF): Light mode card surface and dark mode high-contrast text.
- **Border Slate** (#E2E8F0 / #0a2558): Subtle, crisp boundaries establishing card depth without heavy shadows.
- **Scrollbar Accents** (#cbd5e1 / #1e3a8a): Low-contrast system rails.

### Named Rules
**The Gold Restraint Rule.** Industrial Gold (#D19C30) occupies less than 10% of any given viewport surface. Its power is concentrated in calls to action and milestone figures.

## Typography

**Display Font:** Inter, system-ui, sans-serif
**Body Font:** Inter, system-ui, sans-serif
**Character:** Neutral, exceptionally legible, modern neo-grotesque with optimized numbers for industrial and economic data.

### Hierarchy
- **Display** (700, clamp(2rem, 5vw, 3.5rem), 1.15): Hero section headline.
- **Headline** (700, clamp(1.5rem, 3vw, 2.25rem), 1.25): Major section titles.
- **Title** (600, 1.25rem, 1.4): Card titles, district headings, document group titles.
- **Body** (400, 1rem, 1.6): Paragraph text, descriptions, max line length 70ch.
- **Label** (500, 0.875rem, 1.4): Navigation links, button text, table headers.
- **Caption** (500, 0.75rem / 12px, 1.4): Secondary metadata, timestamps.
- **Micro / Nano** (500, 11px / 10px, 1.3): Compact tags, map markers, indicator text.

## Layout

- **Container Model**: 1280px max-width centered container (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`).
- **Responsive Breakpoints**: Mobile (`< 640px`), Tablet (`640px - 1023px`), Desktop (`1024px+`).
- **Rhythm**: Spacing based on an 8px grid (8px, 16px, 24px, 32px, 48px, 64px).

## Elevation & Depth

Surfaces are strictly flat-by-default with zero box shadows (`box-shadow: none`). Depth is conveyed entirely through tonal contrast and crisp 1px borders.

### Named Rules
**The Flat Geometry Rule.** All surfaces have 0px box shadows and 0px blur. Elevation is communicated solely through background tones and 1px borders.

## Shapes

- **Radius Scale**: Flat sharp corners (`0px / rounded-none`) across all cards, buttons, inputs, modals, and badges.
- **Geometry**: Crisp, architectural, rectangular discipline.

## Components

### Buttons
- **Shape**: Sharp flat corners (0px radius).
- **Primary**: Background `#D19C30`, text `#FFFFFF`, font-weight 600, padding `12px 28px`.
- **Hover**: Background `#b88523`, transition `200ms ease`.
- **Ghost / Outline**: Border 1px solid `#D19C30`, text `#D19C30`, background transparent.

### Cards / Containers
- **Corner Style**: 0px radius (`rounded-none`).
- **Background**: White (`#FFFFFF`) in light mode; Navy Card (`#041438`) in dark mode.
- **Border**: 1px solid `#E2E8F0` (light) / `#0a2558` (dark).
- **Internal Padding**: 24px (`p-6`).

### Navigation
- **Desktop**: Sticky top header with backdrop blur (`backdrop-blur-md bg-white/90 dark:bg-[#010c22]/90`).
- **Language Switcher**: Flat dropdown with clean borders.

## Do's and Don'ts

### Do:
- **Do** maintain sharp 0px corners and flat surfaces across all components.
- **Do** use `#D19C30` exclusively for active elements, key statistics, and primary CTAs.
- **Do** test all color pairings against WCAG AA 4.5:1 minimum contrast.
- **Do** use clean 1px borders for structured content separation.

### Don't:
- **Don't** add rounded corners or pill badges.
- **Don't** use box shadows, ambient drop shadows, or glow effects.
- **Don't** use multi-color neon gradients, purple shadows, or AI-generated decorative blobs.
- **Don't** repeat brand text next to the crest logo when the crest is self-contained.
