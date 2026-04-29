# Changelog

All notable changes to `@banoffee-ai/ui` will be documented in this file.

## [0.1.0] — 2026-04-28

### Added

- **Primitives** — Button (5 variants, 3 sizes), Badge (5 variants), Input (2 variants, label/error/hint/icons), Select (2 variants), Slider (caramel thumb, showValue), Eyebrow (2 variants), Divider (3 variants, 2 orientations)
- **Layout** — Container (5 max-width options), Section (4 bg variants, auto-wraps Container), Card (light/dark, accent border animation), Grid (responsive 1-4 cols)
- **Marketing** — HeroPill, StatBlock, Marquee (infinite scroll), ServiceCard, ProcessStep, TechPill, FaqItem (animated accordion)
- **App UI** — StatusBadge (6 statuses), DataTable (generic typed, loading/empty states), FormGroup (label+input+error wrapper), Sidebar (collapsible, section groups), PageHeader (breadcrumbs, actions slot), EmptyState (centered placeholder), ProgressBar (3 sizes, 3 colors, animated shimmer), Toast system (useToast hook, ToastProvider, 4 variants)
- **Utility hooks** — useMediaQuery, useIntersectionObserver, useLocalStorage
- **Design tokens** — Full Banoffee brand palette, typography scale, spacing, shadows, transitions via Tailwind v4 @theme
- **Storybook** — Stories for all 22 components with autodocs
- **Testing** — 161 tests across 25 test files covering all components
- **Build** — ESM + CJS dual output, TypeScript declarations, tree-shakeable, `'use client'` banner
- **Publishing** — GitHub Packages registry, automated `scripts/publish.sh`
