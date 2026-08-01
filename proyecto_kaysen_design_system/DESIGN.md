---
name: Proyecto KAYSEN Design System
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#5a413c'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#8e706b'
  outline-variant: '#e2beb9'
  surface-tint: '#b4281a'
  primary: '#a51d11'
  on-primary: '#ffffff'
  primary-container: '#c83727'
  on-primary-container: '#ffebe8'
  inverse-primary: '#ffb4a8'
  secondary: '#555f69'
  on-secondary: '#ffffff'
  secondary-container: '#d7e1ec'
  on-secondary-container: '#5a646e'
  tertiary: '#505560'
  on-tertiary: '#ffffff'
  tertiary-container: '#686d78'
  on-tertiary-container: '#ecf0fd'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a8'
  on-primary-fixed: '#410000'
  on-primary-fixed-variant: '#910a04'
  secondary-fixed: '#d9e4ef'
  secondary-fixed-dim: '#bdc8d3'
  on-secondary-fixed: '#131d25'
  on-secondary-fixed-variant: '#3e4851'
  tertiary-fixed: '#dee2f0'
  tertiary-fixed-dim: '#c2c6d3'
  on-tertiary-fixed: '#171c25'
  on-tertiary-fixed-variant: '#424751'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: EB Garamond
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: EB Garamond
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 34px
  headline-md:
    fontFamily: EB Garamond
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Libre Franklin
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Libre Franklin
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Libre Franklin
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  caption:
    fontFamily: Libre Franklin
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system for Proyecto KAYSEN is rooted in an **Academic-Executive** aesthetic. It bridges the gap between traditional scholarly authority and modern data-driven decision-making. The visual language conveys prestige, rigor, and institutional stability.

The style is a refined hybrid of **Minimalism** and **Modern Corporate** design. It utilizes expansive white space to denote intellectual clarity, paired with sophisticated serif typography that evokes the heritage of "Universidad de Chile." UI elements are presented with surgical precision—avoiding unnecessary ornamentation in favor of high-legibility layouts and professional card-based structures. 

The target audience consists of executives, researchers, and policy-makers who require information presented with absolute clarity and a sense of gravity. The emotional response is one of trust, order, and intellectual depth.

## Colors

The palette is anchored by **Terracotta (#C83727)**, a primary accent that signals institutional identity and provides a warm, energetic contrast to the cooler neutrals. **Slate Grey (#5C6670)** serves as the secondary structural color, grounding the interface with professional sobriety.

- **Background Strategy:** A dual-tone approach. The global page background uses a soft **Off-White (#F8F9FA)** to reduce eye strain, while active content areas and cards utilize **Pure White (#FFFFFF)** to create a clear "layering" effect.
- **Typography Colors:** **Deep Charcoal (#2B303A)** is the standard for body text to ensure maximum readability against the white surfaces. **Muted Grey (#6C757D)** is reserved for secondary information, metadata, and captions.
- **Status Colors:** Use standard semantic reds and greens, but desaturate them slightly to align with the scholarly aesthetic.

## Typography

The typography system follows a traditional serif-for-display and sans-serif-for-utility model. 

- **Primary Serif:** **EB Garamond** is used for all headlines and editorial titles. Its classical proportions and calligraphic roots mirror the prestigious "Ingeniería Industrial" branding.
- **Secondary Sans-Serif:** **Libre Franklin** (or similar clean Grotesque) is used for body text, data points, and interface labels. This creates a functional contrast that ensures data remains accessible and modern.
- **Hierarchy:** Maintain clear vertical rhythm. Use ample line-height (1.5x - 1.6x) for body text to support long-form academic reading. Labels should frequently use uppercase with slight tracking to denote a "tag" or "category" status.

## Layout & Spacing

The design system employs a **Fixed Grid** model for desktop and a fluid model for mobile.

- **Grid:** A 12-column grid with a maximum container width of 1200px. Gutters are fixed at 24px to maintain an airy, "published" feel.
- **Rhythm:** An 8px base unit drives all spacing. For card-heavy layouts (dashboards or reports), use 32px or 40px of internal padding to prevent information density from feeling overwhelming.
- **Responsive Behavior:** On mobile, margins shrink to 16px. Cards should generally transition to full-width stacks. On desktop, utilize asymmetrical layouts (e.g., a 4-column sidebar with an 8-column main content area) to mimic traditional academic journal formatting.

## Elevation & Depth

Visual hierarchy is achieved through a **Flat-Layered** approach rather than heavy skeuomorphism.

- **Surface Tiers:** Use the background color (#F8F9FA) as the lowest level. Content rests on "Level 1" Pure White (#FFFFFF) cards.
- **Shadows:** Avoid dark, heavy shadows. Instead, use "Ambient Shadows"—extremely diffused, low-opacity (2-4%) shadows with a slight Slate Grey tint. This creates a subtle lift that makes cards feel like paper resting on a desk.
- **Borders:** Instead of shadows for every element, use soft, 1px borders in a very light grey (#E9ECEF) to define boundaries between secondary UI components.

## Shapes

To maintain an "Executive" and "Academic" feel, the design system utilizes **Soft (Level 1)** roundedness.

- **Standard Radius:** 4px (0.25rem) for buttons, input fields, and small containers. This provides just enough softness to feel modern without losing the "serious" edge of a sharp corner.
- **Large Radius:** 8px (0.5rem) for primary content cards and modal windows.
- **Pill Shapes:** Reserved exclusively for "Chips" or "Status Tags" to provide a clear visual distinction from interactive buttons.

## Components

- **Buttons:** 
  - **Primary:** Solid Terracotta (#C83727) with white text. High-contrast, no gradient.
  - **Secondary:** Transparent with a 1px Slate Grey border and Slate Grey text.
- **Cards:** Pure white background, 8px corner radius, and a subtle 1px border. Cards should feature a "Header" section with an EB Garamond title and a "Footer" for actions or metadata.
- **Input Fields:** 1px border (#DEE2E6) that thickens and changes to Slate Grey on focus. Use Libre Franklin for placeholder text in Muted Grey.
- **Data Tables:** High-density, minimal borders (horizontal only). The header row should use a light Slate Grey background with white, uppercase labels.
- **Chips/Badges:** Small, pill-shaped tags used for categories. Use low-saturation background tints of the primary colors (e.g., a 10% opacity Terracotta background with 100% opacity Terracotta text).
- **Navigation:** A clean top-bar or side-bar using Slate Grey as the text color, with Terracotta used only for the active state indicator (typically a 2px bottom or side bar).