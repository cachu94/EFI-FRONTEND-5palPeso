---
name: 5palPeso Financial Interface
colors:
  surface: '#021134'
  surface-dim: '#021134'
  surface-bright: '#2a385b'
  surface-container-lowest: '#000c2b'
  surface-container-low: '#0a1a3c'
  surface-container: '#0f1e40'
  surface-container-high: '#1a294b'
  surface-container-highest: '#253457'
  on-surface: '#dae2ff'
  on-surface-variant: '#d1c6ab'
  inverse-surface: '#dae2ff'
  inverse-on-surface: '#212f52'
  outline: '#9a9077'
  outline-variant: '#4d4632'
  surface-tint: '#edc200'
  primary: '#fff1ce'
  on-primary: '#3c2f00'
  primary-container: '#ffd100'
  on-primary-container: '#6f5a00'
  inverse-primary: '#725c00'
  secondary: '#aec6ff'
  on-secondary: '#042e69'
  secondary-container: '#254581'
  on-secondary-container: '#97b4f8'
  tertiary: '#c4ffe0'
  on-tertiary: '#003825'
  tertiary-container: '#54efb3'
  on-tertiary-container: '#006a4a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe07f'
  primary-fixed-dim: '#edc200'
  on-primary-fixed: '#231b00'
  on-primary-fixed-variant: '#564500'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#aec6ff'
  on-secondary-fixed: '#001a43'
  on-secondary-fixed-variant: '#254581'
  tertiary-fixed: '#63fcc0'
  tertiary-fixed-dim: '#3fdfa5'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005138'
  background: '#021134'
  on-background: '#dae2ff'
  surface-variant: '#253457'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 3.5rem
    fontWeight: '800'
    lineHeight: 4rem
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '800'
    lineHeight: 2.75rem
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: 2.25rem
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.01em
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.5rem
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.25rem
  metric-display:
    fontFamily: Plus Jakarta Sans
    fontSize: 2rem
    fontWeight: '700'
    lineHeight: 2.25rem
    letterSpacing: -0.02em
  metric-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.5rem
    letterSpacing: -0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.8125rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.6875rem
    fontWeight: '700'
    lineHeight: 0.875rem
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system establishes a high-conviction, professional financial experience tailored for modern portfolio managers, everyday investors, and fiscal operations. Its emotional identity projects structural stability, fiscal clarity, and athletic momentum. Rather than adhering to conventional sterile fintech palettes, this design system harnesses the authoritative prestige of deep oceanic navy paired with the energetic friction of vibrant gold, creating a decisive, performance-oriented visual environment.

The design movement combines **Modern High-Density SaaS** with **Refined Tactile Elevation**:
- Surfaces employ stratified deep night-blue canvases with intermediate structural containers.
- Information display prioritizes tabular clarity, dynamic metrics, and instant transactional comprehension.
- Visual anchors leverage high-contrast golden triggers, ensuring critical calls-to-action remain unambiguous under split-second operational decisions.
- Surfaces preserve elegance through micro-borders and subtle translucent layering rather than excessive flat fills or chaotic neon expressions.

## Colors

The palette operates in a default dark-mode paradigm configured around high luminous contrast, preserving optical comfort during extended analytic sessions.

### Roles & Semantic Distribution
- **Canvas Base (`#0B1B3D` - Deep Night Blue):** The primary root canvas ground for full-bleed dashboard applications, side navigation, and viewport frames.
- **Structural Foundation (`#002B66` - Institutional Navy):** Used for elevated headers, sidebars, toolbar clusters, and secondary panel backgrounds.
- **Card & Component Surface (`#132A5E` - Intermediate Navy):** The core card container background, modular metric blocks, table row containers, and popovers.
- **Primary Interactive & Accent (`#FFD100` - Vibrant Golden Oro):** Strictly reserved for focal interactive components, primary button fills, key metric badges, chart highlight indicators, and active selection toggles. Text on this background defaults to deep navy (`#0B1B3D`) to preserve maximum WCAG AAA legibility.
- **Neutral Foreground & Data Display (`#FFFFFF` - Crisp White):** Primary figures, major KPIs, tabular balances, and headline text. Secondary labels scale down to light slate tints (`#B8C5E2`).
- **Semantic Accents:**
  - **Success / Positive Growth:** Emerald Green (`#00C48C`) for positive P&L returns, confirmed transfers, and safe thresholds.
  - **Warning / Alert:** Amber Gold (`#FFA800`) for pending reconciliations, margin warnings, and system thresholds.
  - **Critical / Negative Loss:** Crimson Red (`#FF4757`) for drawdown states, account deficits, and cancel actions.

## Typography

The design system standardizes on **Plus Jakarta Sans** across all textual hierarchies. Its wide aperture, geometric proportions, and crisp terminal cuts ensure balance between approachable modernity and high-density readability.

### Financial Figures & Tabular Attributes
- Apply font feature settings `tnum` (tabular numerals) and `cv01` across all numerical instances, data grids, balance counters, and transaction feeds. This guarantees uniform column alignment across moving decimals and dynamic financial tickers.
- Display and metric styles carry negative letter-spacing to form tight, high-impact numerical clusters without compromising character legibility.
- Micro-labels (`label-sm`) default to uppercase tracking (`0.04em`) when applied to currency indicators (e.g., `USD`, `ARS`, `EUR`) and badge tags.

## Layout & Spacing

The layout operates on a **12-column fluid grid system** anchored by an 8-point spatial cadence, adjusting dynamically across three primary viewport tiers:

- **Desktop (1280px and above):** 12-column grid, `margin: 2rem`, `gutter: 1.5rem`. Max container constraint of 1440px for analytical clarity. Sidebar navigation occupies a fixed 260px structural anchor, allowing the primary content workspace to adjust dynamically.
- **Tablet (768px – 1279px):** 8-column layout, `margin: 1.5rem`, `gutter: 1rem`. Data grids and metric clusters reflow from 4-column structures to 2x2 modular patterns.
- **Mobile (< 768px):** 4-column layout, `margin-mobile: 1rem`, `gutter-mobile: 0.75rem`. Cards switch to 100% single-column width, toolbars condense into sticky bottom-anchored action zones, and lateral multi-metric tables transition to horizontal swiping panes.

Internal container padding strictly adheres to the component scale:
- Micro-components (chips, badges, segmented controls): `space-xs` and `space-sm`.
- Standard form inputs, dropdowns, and button containers: `space-sm` vertical, `space-md` horizontal.
- Standard analytical cards: `space-lg` uniform internal padding.

## Elevation & Depth

Visual hierarchy does not rely on heavy drop shadows or skeuomorphic bevels. Instead, this design system establishes spatial hierarchy through **Tonal Layering**, **Crisp Luminous Ghost Borders**, and **Controlled Ambient Luminescence**:

1. **Ground Zero (Canvas):** Tone `#0B1B3D` acts as the deepest foundation, without any elevation border.
2. **Tier 1 (Panels & Structural Groups):** Tone `#002B66` bounded by a 1px border rendered in `rgba(255, 255, 255, 0.08)`. No shadow.
3. **Tier 2 (Analytical Cards & Tables):** Tone `#132A5E` encased in a 1px border of `rgba(255, 255, 255, 0.12)`. When raised on hover, the border shifts to `rgba(255, 209, 0, 0.35)` with an ambient shadow of `0 8px 24px -4px rgba(0, 10, 30, 0.6)`.
4. **Tier 3 (Floating Modals, Drawers & Popovers):** Tone `#132A5E` backed by an inset highlight of `rgba(255, 255, 255, 0.15)`, an outer border of `rgba(255, 255, 255, 0.2)`, and an extra-diffused dual shadow:
   - Ambient: `0 20px 40px -8px rgba(0, 0, 0, 0.7)`
   - Rim light: `0 0 0 1px rgba(255, 209, 0, 0.15)`
5. **Active Focus & Tactical Triggers:** Focal components (e.g., active input fields, active action buttons) deploy a targeted outer glow: `0 0 16px rgba(255, 209, 0, 0.25)`.

## Shapes

The design system applies a **Rounded (Level 2)** geometry to reinforce modern software ergonomics without diminishing data-dense precision.

- **Standard Cards, Tables, and Analytical Containers:** Apply `rounded-xl` (1.5rem / 24px) for outer container peripheries, ensuring modular elements read as cohesive floating tiles.
- **Interactive Form Inputs, Buttons, and Selects:** Apply `rounded-md` to `rounded-lg` (0.5rem to 0.75rem / 8px to 12px) to maintain structured edges for compact interactions.
- **Badges, Metric Pills, and Status Indicator Chips:** Apply full pill curvature (`rounded-full` / 9999px) to visually distinguish categorical metadata from clickable rectangular controls.
- **Embedded Inner Containers:** When cards house child sub-blocks (e.g., nested mini-charts, asset item bars), internal child corners scale down to `rounded-lg` (1rem / 16px) to maintain proportional concentric geometry.

## Components

### Buttons
- **Primary Action Button:** Solid `#FFD100` background, `#0B1B3D` typography (`label-md`, font weight 700). Height: 44px (desktop), 48px (mobile). Hover state deepens to `#E6BC00` with subtle scale transition (`1.01`).
- **Secondary Action Button:** Deep `#132A5E` background, 1px border in `rgba(255, 255, 255, 0.18)`, `#FFFFFF` text. Hover shifts border color to `#FFD100` and adds light surface tinting.
- **Ghost/Tertiary Button:** Transparent background, `#B8C5E2` label, no border. Hover applies `rgba(255, 255, 255, 0.05)` fill and crisp `#FFFFFF` text.

### Cards & Analytical Widgets
- Built on surface tone `#132A5E` with `rounded-xl` boundaries and 1px `rgba(255, 255, 255, 0.10)` outline.
- Header zones partition title, metadata, and quick action icon buttons (`28x28px`).
- KPI metric values inside cards employ `metric-display` with dedicated delta chips placed directly inline or immediately below the figure.

### Chips & Badges
- **Status Pills:** Pill-shaped (`rounded-full`), padding `0.25rem 0.75rem`.
  - **Golden Active / Highlight:** Background `rgba(255, 209, 0, 0.15)`, text `#FFD100`, border `1px solid rgba(255, 209, 0, 0.35)`.
  - **Positive / Inflow:** Background `rgba(0, 196, 140, 0.12)`, text `#00C48C`, border `1px solid rgba(0, 196, 140, 0.3)`.
  - **Negative / Outflow:** Background `rgba(255, 71, 87, 0.12)`, text `#FF4757`, border `1px solid rgba(255, 71, 87, 0.3)`.

### Inputs & Form Fields
- Surface background `#0B1B3D` with 1px border `rgba(255, 255, 255, 0.14)`.
- Height: 44px; text color `#FFFFFF` (`body-md`), placeholder text `#637394`.
- Active focus state: border shifts to `#FFD100` accompanied by a `0 0 0 3px rgba(255, 209, 0, 0.2)` focus ring.
- Numeric amount inputs feature integrated right-aligned currency selector chips (`ARS`, `USD`).

### Checkboxes & Radio Buttons
- Base state: 18x18px, `#0B1B3D` fill, 1.5px border `rgba(255, 255, 255, 0.25)`, `rounded-sm` (4px for checkboxes, full circle for radios).
- Checked state: Fill `#FFD100` with icon/indicator rendered in `#0B1B3D`.

### Transaction Lists & Data Tables
- Row structures leverage surface `#132A5E` with subtle alternating or divider strokes `rgba(255, 255, 255, 0.05)`.
- Row height: 56px default, 48px compact mode.
- Left column anchors icon avatars with `rounded-lg` containers tinted in secondary navy (`#002B66`).
- Quantitative amounts rendered with `tnum` numeric alignment right-justified against date stamps and categorical tags.

### Financial Progress Trackers & Donut Meters
- Track background: `#002B66`.
- Active fill: `#FFD100` for primary budget thresholds, transitioning to `#00C48C` upon completion or `#FF4757` when past maximum limit.
