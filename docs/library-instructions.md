# Banoffee UI — Component Library Build Instructions

> **For the coding agent:** Read this document in full before writing a single file.
> Follow every section in order. Do not skip ahead. Do not make assumptions about
> naming, structure, or tokens — everything is specified here.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack & Rationale](#2-tech-stack--rationale)
3. [Prerequisites](#3-prerequisites)
4. [Project Scaffold](#4-project-scaffold)
5. [Directory Structure](#5-directory-structure)
6. [Design Tokens](#6-design-tokens)
7. [Tailwind Configuration](#7-tailwind-configuration)
8. [Build Configuration](#8-build-configuration)
9. [TypeScript Configuration](#9-typescript-configuration)
10. [Package Configuration](#10-package-configuration)
11. [Storybook Configuration](#11-storybook-configuration)
12. [Component Architecture Rules](#12-component-architecture-rules)
13. [Primitive Components](#13-primitive-components)
14. [Layout Components](#14-layout-components)
15. [Marketing Components](#15-marketing-components)
16. [App UI Components](#16-app-ui-components)
17. [Export Barrel](#17-export-barrel)
18. [Utility Helpers](#18-utility-helpers)
19. [Testing Setup](#19-testing-setup)
20. [Publishing Workflow](#20-publishing-workflow)
21. [Consuming the Library](#21-consuming-the-library)
22. [Acceptance Criteria](#22-acceptance-criteria)

---

## 1. Project Overview

You are building **`@banoffee/ui`** — a React component library that serves as the shared
design system for three products under the Banoffee.ai brand:

| Product | Type | Purpose |
|---|---|---|
| `banoffee.ai` | Marketing site | Landing page, blog, case studies |
| `eClarify` | SaaS application | Legal document intelligence tool |
| `Vidhik` | SaaS application | Contractor HRMS |

The library must cover two categories of components:

- **Marketing components** — used in the public-facing Banoffee.ai site
- **Application UI components** — used inside eClarify and Vidhik dashboards

Both share the same design token system. The visual identity is **warm-material** —
espresso dark backgrounds, caramel/gold accents, cream text, DM Sans typeface.
The tone is premium but approachable. Never cold. Never generic.

---

## 2. Tech Stack & Rationale

| Tool | Version | Why |
|---|---|---|
| React | 18+ | Peer dep — consuming apps provide it |
| TypeScript | 5+ | Required. Every component must be typed |
| Vite | 5+ | Library mode bundling |
| Tailwind CSS | v4 | CSS-first token system via `@theme` |
| tsup | latest | npm package bundling (ESM + CJS + types) |
| Storybook | 8+ | Living documentation and dev environment |
| `class-variance-authority` (cva) | latest | Variant management — no ternary soup |
| `clsx` | latest | Conditional class merging |
| `tailwind-merge` | latest | Merge Tailwind classes without conflicts |
| Vitest | latest | Unit testing |
| `@testing-library/react` | latest | Component testing |

**Do not** use:
- Styled Components or Emotion (Tailwind only)
- Radix UI (build primitives from scratch — this is a brand-first library)
- shadcn/ui (same reason — we own the components)
- Any icon library (use emoji or accept icon slot props)

---

## 3. Prerequisites

Before starting, verify the following are installed on the system:

```bash
node --version    # Must be >= 18.0.0
npm --version     # Must be >= 9.0.0
git --version     # Any recent version
```

If Node is below 18, stop and install the correct version via `nvm` before proceeding.

---

## 4. Project Scaffold

Run these commands **in order**, from the directory where you want the project to live:

```bash
# 1. Create the Vite project with React + TypeScript template
npm create vite@latest banoffee-ui -- --template react-ts

# 2. Enter the directory
cd banoffee-ui

# 3. Install base dependencies
npm install

# 4. Install Tailwind v4 and its Vite plugin
npm install tailwindcss @tailwindcss/vite

# 5. Install component utility libraries
npm install class-variance-authority clsx tailwind-merge

# 6. Install tsup for library bundling
npm install -D tsup

# 7. Install testing dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom

# 8. Install Storybook (answer YES to all prompts)
npx storybook@latest init --type react_vite

# 9. Install Storybook Tailwind addon
npm install -D @storybook/addon-styling-webpack

# 10. Initialise git
git init
git add .
git commit -m "chore: initial scaffold"
```

After running these commands, verify:
- `node_modules/` exists and is populated
- `.storybook/` directory exists with `main.ts` and `preview.ts`
- `src/` directory exists with `App.tsx`, `main.tsx`, `vite-env.d.ts`

---

## 5. Directory Structure

Delete the default Vite scaffold files and create the following structure **exactly**:

```
banoffee-ui/
├── .storybook/
│   ├── main.ts
│   └── preview.ts
├── src/
│   ├── tokens/
│   │   └── theme.css                  # All design tokens
│   ├── styles/
│   │   └── index.css                  # Entry CSS — imports tokens + Tailwind
│   ├── utils/
│   │   └── cn.ts                      # Class merging utility
│   ├── components/
│   │   ├── primitives/
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.stories.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Badge/
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Badge.stories.tsx
│   │   │   │   ├── Badge.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Input/
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Input.stories.tsx
│   │   │   │   ├── Input.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Select/
│   │   │   │   ├── Select.tsx
│   │   │   │   ├── Select.stories.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Slider/
│   │   │   │   ├── Slider.tsx
│   │   │   │   ├── Slider.stories.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Eyebrow/
│   │   │   │   ├── Eyebrow.tsx
│   │   │   │   ├── Eyebrow.stories.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Divider/
│   │   │   │   ├── Divider.tsx
│   │   │   │   ├── Divider.stories.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts               # Barrel for all primitives
│   │   ├── layout/
│   │   │   ├── Section/
│   │   │   │   ├── Section.tsx
│   │   │   │   ├── Section.stories.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Container/
│   │   │   │   ├── Container.tsx
│   │   │   │   ├── Container.stories.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Card/
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Card.stories.tsx
│   │   │   │   ├── Card.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Grid/
│   │   │   │   ├── Grid.tsx
│   │   │   │   ├── Grid.stories.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── marketing/
│   │   │   ├── HeroPill/
│   │   │   │   ├── HeroPill.tsx
│   │   │   │   ├── HeroPill.stories.tsx
│   │   │   │   └── index.ts
│   │   │   ├── StatBlock/
│   │   │   │   ├── StatBlock.tsx
│   │   │   │   ├── StatBlock.stories.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Marquee/
│   │   │   │   ├── Marquee.tsx
│   │   │   │   ├── Marquee.stories.tsx
│   │   │   │   └── index.ts
│   │   │   ├── ServiceCard/
│   │   │   │   ├── ServiceCard.tsx
│   │   │   │   ├── ServiceCard.stories.tsx
│   │   │   │   └── index.ts
│   │   │   ├── ProcessStep/
│   │   │   │   ├── ProcessStep.tsx
│   │   │   │   ├── ProcessStep.stories.tsx
│   │   │   │   └── index.ts
│   │   │   ├── TechPill/
│   │   │   │   ├── TechPill.tsx
│   │   │   │   ├── TechPill.stories.tsx
│   │   │   │   └── index.ts
│   │   │   ├── FaqItem/
│   │   │   │   ├── FaqItem.tsx
│   │   │   │   ├── FaqItem.stories.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── app/
│   │   │   ├── StatusBadge/
│   │   │   │   ├── StatusBadge.tsx
│   │   │   │   ├── StatusBadge.stories.tsx
│   │   │   │   └── index.ts
│   │   │   ├── DataTable/
│   │   │   │   ├── DataTable.tsx
│   │   │   │   ├── DataTable.stories.tsx
│   │   │   │   └── index.ts
│   │   │   ├── FormGroup/
│   │   │   │   ├── FormGroup.tsx
│   │   │   │   ├── FormGroup.stories.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Sidebar/
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Sidebar.stories.tsx
│   │   │   │   └── index.ts
│   │   │   ├── PageHeader/
│   │   │   │   ├── PageHeader.tsx
│   │   │   │   ├── PageHeader.stories.tsx
│   │   │   │   └── index.ts
│   │   │   ├── EmptyState/
│   │   │   │   ├── EmptyState.tsx
│   │   │   │   ├── EmptyState.stories.tsx
│   │   │   │   └── index.ts
│   │   │   ├── ProgressBar/
│   │   │   │   ├── ProgressBar.tsx
│   │   │   │   ├── ProgressBar.stories.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Toast/
│   │   │   │   ├── Toast.tsx
│   │   │   │   ├── Toast.stories.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   └── index.ts                   # Root barrel — exports everything
│   └── index.ts                       # Library entry point
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── vite.config.ts
├── tsup.config.ts
├── vitest.config.ts
├── tailwind.config.ts                 # Minimal — v4 uses CSS tokens primarily
├── .npmignore
├── .gitignore
└── README.md
```

**Delete these files** from the Vite scaffold — they are not needed:
- `src/App.tsx`
- `src/App.css`
- `src/main.tsx`
- `src/assets/`
- `index.html` (keep only for Storybook, not the library)
- `public/`

---

## 6. Design Tokens

Create `src/tokens/theme.css` with **exactly** the following content.
Do not rename, reorder, or modify any token value:

```css
/* src/tokens/theme.css
   Banoffee.ai Design Token System
   Single source of truth for all colour, type, spacing, and effect values.
   All tokens are consumed via Tailwind v4 @theme — available as utility classes.
*/

@import "tailwindcss";

@theme {

  /* ────────────────────────────────
     COLOUR — Brand Palette
  ──────────────────────────────── */

  /* Backgrounds */
  --color-espresso:    #16100A;   /* Primary dark bg */
  --color-dark-2:      #1F160D;   /* Elevated dark surface */
  --color-dark-3:      #2A1C0F;   /* Higher elevated dark surface */

  /* Brand Accent */
  --color-caramel:     #C8793A;   /* Primary brand accent */
  --color-caramel-lt:  #D68E52;   /* Hover state of caramel */
  --color-gold:        #E8B96A;   /* Secondary accent — headings on dark */
  --color-banana:      #EAC84E;   /* Tertiary accent — highlight moments */
  --color-toffee:      #7A4A1C;   /* Deep brand accent */

  /* Neutrals */
  --color-cream:       #F6ECD9;   /* Primary text on dark */
  --color-cream-dim:   #C4AB8A;   /* Secondary text on dark */
  --color-soft:        #FAF5EC;   /* Light section background */
  --color-warm-white:  #FEFCF8;   /* Lightest bg — card surfaces on light */
  --color-muted:       #8A7260;   /* Muted text on light */

  /* Semantic — Status */
  --color-status-green:  #3DAA6E;  /* Active / running / success */
  --color-status-blue:   #3D82BE;  /* Exploring / info */
  --color-status-orange: #C8793A;  /* Caution / open */
  --color-status-red:    #BE3D3D;  /* Error / critical */

  /* ────────────────────────────────
     COLOUR — Border System
  ──────────────────────────────── */

  --color-border-dark:  rgba(200, 121, 58, 0.15);  /* Borders on dark surfaces */
  --color-border-light: rgba(122, 74, 28, 0.11);   /* Borders on light surfaces */
  --color-border-focus: rgba(200, 121, 58, 0.6);   /* Focus ring */

  /* ────────────────────────────────
     TYPOGRAPHY
  ──────────────────────────────── */

  --font-family-sans: 'DM Sans', system-ui, -apple-system, sans-serif;

  /* Scale */
  --font-size-display: clamp(2.8rem, 5vw, 4.8rem);
  --font-size-h1:      clamp(2.4rem, 4vw, 4rem);
  --font-size-h2:      clamp(1.9rem, 3.4vw, 2.9rem);
  --font-size-h3:      1.15rem;
  --font-size-body-lg: 1.05rem;
  --font-size-body:    0.95rem;
  --font-size-small:   0.82rem;
  --font-size-xs:      0.72rem;
  --font-size-eyebrow: 0.67rem;

  /* Weights */
  --font-weight-regular:  400;
  --font-weight-medium:   500;
  --font-weight-semibold: 600;
  --font-weight-bold:     700;
  --font-weight-black:    800;

  /* Line heights */
  --line-height-tight:   1.06;
  --line-height-snug:    1.25;
  --line-height-normal:  1.5;
  --line-height-relaxed: 1.75;
  --line-height-loose:   1.85;

  /* Letter spacing */
  --letter-spacing-tight:   -0.035em;
  --letter-spacing-snug:    -0.02em;
  --letter-spacing-normal:   0;
  --letter-spacing-wide:     0.06em;
  --letter-spacing-wider:    0.1em;
  --letter-spacing-eyebrow:  0.2em;

  /* ────────────────────────────────
     SPACING
  ──────────────────────────────── */

  --spacing-section:  6.5rem;   /* Standard section padding */
  --spacing-section-sm: 4.5rem; /* Mobile section padding */
  --spacing-gap:      1.5rem;   /* Standard card gap */
  --spacing-gap-sm:   1rem;     /* Tight card gap */
  --spacing-gap-lg:   3rem;     /* Wide column gap */

  /* ────────────────────────────────
     BORDER RADIUS
  ──────────────────────────────── */

  --radius-none:   0;
  --radius-xs:     6px;
  --radius-sm:     10px;
  --radius-md:     14px;
  --radius-lg:     20px;
  --radius-xl:     28px;
  --radius-pill:   100px;
  --radius-full:   9999px;

  /* ────────────────────────────────
     SHADOWS
  ──────────────────────────────── */

  --shadow-sm:       0 2px 8px rgba(0, 0, 0, 0.06);
  --shadow-md:       0 8px 24px rgba(0, 0, 0, 0.08);
  --shadow-lg:       0 14px 40px rgba(0, 0, 0, 0.10);
  --shadow-card:     0 14px 40px rgba(0, 0, 0, 0.07);
  --shadow-btn:      0 6px 22px rgba(200, 121, 58, 0.40);
  --shadow-btn-hover:0 10px 28px rgba(200, 121, 58, 0.50);
  --shadow-nav:      0 2px 16px rgba(0, 0, 0, 0.06);

  /* ────────────────────────────────
     TRANSITIONS
  ──────────────────────────────── */

  --transition-fast:   150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow:   400ms ease;

  /* ────────────────────────────────
     Z-INDEX SCALE
  ──────────────────────────────── */

  --z-base:    0;
  --z-raised:  10;
  --z-dropdown:100;
  --z-sticky:  200;
  --z-overlay: 300;
  --z-modal:   400;
  --z-toast:   500;
  --z-nav:     600;
}
```

---

## 7. Tailwind Configuration

Create `src/styles/index.css` — this is the CSS entry point for the library:

```css
/* src/styles/index.css */

/* 1. Import design tokens (which also imports Tailwind via @import "tailwindcss") */
@import '../tokens/theme.css';

/* 2. Import DM Sans from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400;1,9..40,700&display=swap');

/* 3. Base resets */
@layer base {
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
  }

  body {
    font-family: var(--font-family-sans);
    font-size: var(--font-size-body);
    line-height: var(--line-height-normal);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Focus visible — caramel ring */
  :focus-visible {
    outline: 2px solid var(--color-caramel);
    outline-offset: 2px;
  }
}

/* 4. Component-layer animations — available globally */
@layer components {
  @keyframes bn-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.45; transform: scale(0.75); }
  }

  @keyframes bn-float {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-8px); }
  }

  @keyframes bn-marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  @keyframes bn-fade-up {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: none; }
  }

  @keyframes bn-scan {
    0%   { left: -50%; }
    100% { left: 140%; }
  }

  .bn-animate-pulse   { animation: bn-pulse   2s ease-in-out infinite; }
  .bn-animate-float   { animation: bn-float   3s ease-in-out infinite; }
  .bn-animate-marquee { animation: bn-marquee linear infinite; }
  .bn-animate-fade-up { animation: bn-fade-up 0.75s ease both; }
}
```

Create a minimal `tailwind.config.ts` — Tailwind v4 needs almost nothing here since
tokens live in CSS, but we keep this file for content scanning:

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    './.storybook/**/*.{ts,tsx}',
  ],
  // No theme extension needed — all tokens defined in theme.css via @theme
}

export default config
```

---

## 8. Build Configuration

### 8a. Vite Config (development + Storybook)

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'BanoffeeUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `banoffee-ui.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'ReactJSXRuntime',
        },
        preserveModules: true,
        preserveModulesRoot: 'src',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'styles.css'
          return assetInfo.name ?? 'asset'
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
  },
})
```

### 8b. tsup Config (npm publish bundling)

```ts
// tsup.config.ts
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  injectStyle: false,         // CSS is shipped separately as styles.css
  treeshake: true,
  minify: false,              // Let consuming apps minify
  banner: {
    js: `'use client';`,      // Next.js compatibility
  },
})
```

### 8c. Vitest Config

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['**/*.stories.tsx', '**/*.test.tsx', '**/index.ts'],
    },
  },
  resolve: {
    alias: { '@': resolve(__dirname, './src') },
  },
})
```

Create `src/test-setup.ts`:

```ts
// src/test-setup.ts
import '@testing-library/jest-dom'
```

---

## 9. TypeScript Configuration

### 9a. Main tsconfig (for development)

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 9b. Build tsconfig (for type generation)

```json
// tsconfig.build.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noEmit": false,
    "declaration": true,
    "declarationMap": true,
    "emitDeclarationOnly": true,
    "outDir": "./dist/types"
  },
  "exclude": [
    "**/*.stories.tsx",
    "**/*.test.tsx",
    "**/*.test.ts",
    "src/test-setup.ts"
  ]
}
```

---

## 10. Package Configuration

```json
// package.json
{
  "name": "@banoffee/ui",
  "version": "0.1.0",
  "description": "Banoffee.ai design system — shared component library for eClarify, Vidhik, and banoffee.ai",
  "author": "Banoffee.ai",
  "license": "MIT",
  "private": false,
  "type": "module",
  "main": "./dist/banoffee-ui.cjs.js",
  "module": "./dist/banoffee-ui.es.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/banoffee-ui.es.js",
      "require": "./dist/banoffee-ui.cjs.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/styles.css"
  },
  "files": [
    "dist",
    "README.md"
  ],
  "sideEffects": ["*.css"],
  "scripts": {
    "dev":        "storybook dev -p 6006",
    "build":      "tsup && npm run build:types",
    "build:types":"tsc --project tsconfig.build.json",
    "build:sb":   "storybook build",
    "test":       "vitest",
    "test:ui":    "vitest --ui",
    "test:cov":   "vitest run --coverage",
    "lint":       "eslint src --ext .ts,.tsx",
    "type-check": "tsc --noEmit",
    "prepublishOnly": "npm run build && npm run test:cov",
    "release":    "npm run prepublishOnly && npm publish --access public"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  },
  "keywords": [
    "banoffee",
    "ui",
    "design-system",
    "react",
    "tailwind",
    "component-library"
  ]
}
```

Create `.npmignore`:

```
.storybook/
src/
*.stories.tsx
*.test.tsx
*.test.ts
vite.config.ts
tsup.config.ts
tsconfig*.json
vitest.config.ts
tailwind.config.ts
node_modules/
.git/
```

---

## 11. Storybook Configuration

### 11a. main.ts

```ts
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config) => {
    // Ensure Tailwind processes in Storybook
    return config
  },
}

export default config
```

### 11b. preview.ts

```ts
// .storybook/preview.ts
import '../src/styles/index.css'
import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    // Default background contexts for all stories
    backgrounds: {
      default: 'soft',
      values: [
        { name: 'warm-white', value: '#FEFCF8' },
        { name: 'soft',       value: '#FAF5EC' },
        { name: 'espresso',   value: '#16100A' },
        { name: 'dark-2',     value: '#1F160D' },
        { name: 'caramel',    value: '#C8793A' },
      ],
    },
    // Consistent padding for all stories
    layout: 'centered',
    // Actions
    actions: { argTypesRegex: '^on[A-Z].*' },
    // Controls
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
```

---

## 12. Component Architecture Rules

Every component **must** follow these rules without exception:

### Rule 1 — File structure

Every component lives in its own folder. Every folder contains:
- `ComponentName.tsx` — the component
- `ComponentName.stories.tsx` — Storybook stories (minimum 3 stories per component)
- `index.ts` — re-exports the component and its types
- `ComponentName.test.tsx` — at minimum for primitives

### Rule 2 — TypeScript interface pattern

```tsx
// All props interfaces are exported
export interface ComponentNameProps
  extends React.HTMLAttributes<HTMLElement> {
  // Custom props here
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  // Never use `any`
}
```

### Rule 3 — forwardRef for all interactive elements

All components that render an HTML element must use `forwardRef`:

```tsx
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props}>
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
```

### Rule 4 — cn() for all className construction

Never concatenate strings directly. Always use the `cn()` utility:

```tsx
// CORRECT
className={cn(baseStyles, conditionalClass && 'applied-when-true', className)}

// INCORRECT — never do this
className={`base-class ${condition ? 'yes' : 'no'} ${className}`}
```

### Rule 5 — cva() for variants

Use `cva` for any component with more than one visual variant:

```tsx
const componentVariants = cva('base-classes-always-applied', {
  variants: {
    variant: { ... },
    size: { ... },
  },
  compoundVariants: [
    // When variant=X AND size=Y, apply extra classes
    { variant: 'primary', size: 'lg', className: 'extra-class' },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})
```

### Rule 6 — No hardcoded colours

Never use hex codes or rgb() directly in className strings.
All colours come from token utility classes (`bg-caramel`, `text-cream`, etc.)
or CSS variables (`style={{ color: 'var(--color-caramel)' }}`).

### Rule 7 — Children are always typed

```tsx
// CORRECT
children: React.ReactNode
// For string-only
children: string
// INCORRECT — never use `any` or leave children untyped
```

### Rule 8 — Index barrel pattern

Every `index.ts` re-exports the component and its prop types:

```ts
// src/components/primitives/Button/index.ts
export { Button } from './Button'
export type { ButtonProps } from './Button'
```

---

## 13. Primitive Components

Build these **in order**. Do not proceed to the next until the current one
has a passing story and passing tests.

---

### 13.1 — `cn` Utility

Create this first. Everything depends on it.

```ts
// src/utils/cn.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind classes safely, resolving conflicts.
 * Use this for all className construction in the library.
 *
 * @example
 * cn('px-4 py-2', isLarge && 'px-8', className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
```

---

### 13.2 — Button

**Variants:** `primary` | `ghost` | `ghost-light` | `dark` | `nav`
**Sizes:** `sm` | `md` | `lg`

Behaviour spec:
- `primary` — caramel background, white text, caramel shadow, lifts 2px on hover
- `ghost` — transparent bg, light border (`border-border-light`), muted text. Hover: caramel border + gold text
- `ghost-light` — same as ghost but for dark surfaces (`border-border-dark`), cream-dim text
- `dark` — espresso bg, banana text. Hover: lift 2px
- `nav` — caramel bg, white text, smaller shadow. Used in the nav bar only

All variants:
- `border-radius: var(--radius-pill)`
- `font-weight: 700`
- `font-family: DM Sans`
- Transition on all interactive properties: `transition-all duration-150`
- Must be focusable with visible caramel focus ring
- Accepts `asChild` prop for composition (renders children directly if true)

```tsx
// src/components/primitives/Button/Button.tsx

import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-bold rounded-pill',
    'transition-all duration-150 cursor-pointer',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    'focus-visible:outline-[var(--color-caramel)]',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    'select-none',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: [
          'bg-[var(--color-caramel)] text-white',
          'shadow-[var(--shadow-btn)]',
          'hover:bg-[var(--color-caramel-lt)]',
          'hover:-translate-y-0.5',
          'hover:shadow-[var(--shadow-btn-hover)]',
        ].join(' '),
        ghost: [
          'bg-transparent text-[var(--color-muted)]',
          'border border-[var(--color-border-light)]',
          'hover:border-[var(--color-caramel)]',
          'hover:text-[var(--color-caramel)]',
        ].join(' '),
        'ghost-light': [
          'bg-transparent text-[var(--color-cream-dim)]',
          'border border-[var(--color-border-dark)]',
          'hover:border-[var(--color-caramel)]',
          'hover:text-[var(--color-gold)]',
        ].join(' '),
        dark: [
          'bg-[var(--color-espresso)] text-[var(--color-banana)]',
          'shadow-md',
          'hover:-translate-y-0.5',
          'hover:shadow-lg',
        ].join(' '),
        nav: [
          'bg-[var(--color-caramel)] text-white',
          'shadow-sm',
          'hover:bg-[var(--color-caramel-lt)]',
          'hover:-translate-y-px',
        ].join(' '),
      },
      size: {
        sm: 'text-xs px-4 py-2 tracking-wide',
        md: 'text-sm px-8 py-3.5',
        lg: 'text-base px-10 py-4',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as child element (e.g. for wrapping anchor tags) */
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
)

Button.displayName = 'Button'
```

**Stories spec** — minimum required stories:
1. `Primary` — default state
2. `Ghost` — on a light background
3. `GhostLight` — on espresso background
4. `Dark` — on banana background
5. `AllVariants` — renders all 5 side by side
6. `AllSizes` — renders sm/md/lg of primary
7. `Disabled` — primary disabled state

---

### 13.3 — Badge

**Variants:** `dev` | `explore` | `pilot` | `open` | `error`

Spec:
- Pill shaped (`border-radius: var(--radius-pill)`)
- Has optional animated dot (pulsing, colour matches variant)
- Small text: `font-size: var(--font-size-eyebrow)`, uppercase, tracked wide
- `dev` — green tint bg + green text + green dot
- `explore` — blue tint bg + blue text + blue dot
- `pilot` — caramel tint bg + caramel text + caramel dot
- `open` — gold tint bg + toffee text
- `error` — red tint bg + red text

```tsx
// Badge.tsx — implement with cva, animated dot is optional via `showDot` prop
// showDot: boolean — default true
// dot animates using bn-animate-pulse class
```

---

### 13.4 — Input

**Variants:** `default` | `dark`

Spec:
- `default` — warm-white bg, light border, espresso text. Focus: caramel border
- `dark` — dark-3 bg, dark border, cream text. Focus: caramel border
- Accepts `label`, `error`, `hint` props
- `error` state: red border + red error text below
- Full width by default
- `type` prop forwarded (text, email, password, number, search, etc.)
- `leftIcon` and `rightIcon` slots (accept `React.ReactNode`)

---

### 13.5 — Select

Same variant system as Input (`default` | `dark`).
Accepts `options` prop: `Array<{ value: string; label: string }>`
Custom styled — no browser default appearance.
Chevron icon (↓) always visible on right side.

---

### 13.6 — Slider

Single slider only (no range).
Always renders with caramel thumb.
Accepts: `min`, `max`, `step`, `value`, `onChange`, `label`, `showValue` props.
When `showValue` is true, displays current value to the right of the label.

---

### 13.7 — Eyebrow

A semantic label component used above section headings.

```tsx
// Eyebrow.tsx
// Renders a <p> tag
// Variants: 'light' (caramel text — for light backgrounds)
//           'dark'  (gold text — for dark backgrounds)
// Always: uppercase, tracked eyebrow (0.2em), font-weight 700, font-size eyebrow
// Accepts className for spacing overrides
```

---

### 13.8 — Divider

```tsx
// Divider.tsx
// Variants:
//   'solid'    — 1px solid line, border-light colour
//   'gradient' — fades transparent → border-dark → transparent (linear-gradient)
//   'dark'     — 1px solid line, border-dark colour (for dark surfaces)
// orientation: 'horizontal' (default) | 'vertical'
// Renders <hr> for horizontal, <div> for vertical
```

---

## 14. Layout Components

---

### 14.1 — Container

```tsx
// Container.tsx
// A max-width wrapper with responsive horizontal padding
// maxWidth: 'sm' | 'md' | 'lg' | 'xl' | 'full'
// Values:   640px | 768px | 1024px | 1280px | 100%
// Horizontal padding: 1.5rem mobile, 3.5rem desktop
// Always: margin auto (centred)
```

---

### 14.2 — Section

```tsx
// Section.tsx
// A semantic <section> element with surface variants
// Variants:
//   'light' — background: var(--color-warm-white)
//   'soft'  — background: var(--color-soft)
//   'dark'  — background: var(--color-espresso)
//   'dark2' — background: var(--color-dark-2)
// Padding: var(--spacing-section) top and bottom
// Responsive: var(--spacing-section-sm) on mobile
// Wraps children in a Container automatically
// Props: variant, containerMaxWidth (passed to Container), id, className
```

---

### 14.3 — Card

```tsx
// Card.tsx
// The most-used layout component — used in services, projects, why-us sections
// Variants: 'light' | 'dark'
// 'light' — warm-white bg, border-light border, radius-lg
// 'dark'  — dark-2 bg, border-dark border, radius-lg
//
// accentColor prop: 'caramel' | 'green' | 'blue' | 'banana' | 'none'
// When accentColor is not 'none':
//   - 3px top border that animates scaleX(0) → scaleX(1) on hover
//   - Color matches accentColor
//
// hover behaviour (always):
//   - border-color transitions to caramel at 30% opacity
//   - translateY(-5px)
//   - box-shadow: var(--shadow-lg)
//
// padding: 2rem (default), 1.4rem (sm), 2.5rem (lg) — via `padding` prop
// Slots: children (free composition)
```

---

### 14.4 — Grid

```tsx
// Grid.tsx
// Responsive CSS grid wrapper
// cols: 1 | 2 | 3 | 4 — number of columns on desktop
// Mobile always collapses to 1 column
// Tablet (768px): 2 columns if cols >= 2
// gap: 'sm' | 'md' (default) | 'lg'
// Renders a <div> with appropriate grid classes
```

---

## 15. Marketing Components

---

### 15.1 — HeroPill

```tsx
// HeroPill.tsx
// The "Now Accepting Pilot Partners" pill above the hero heading
// Props:
//   children: string — the label text
//   dotColor: 'green' | 'blue' | 'caramel' — default 'green'
//   animate: boolean — whether the dot pulses (default true)
//
// Always:
//   - pill shape
//   - caramel bg at 10% opacity
//   - caramel border at 26% opacity
//   - gold text
//   - uppercase, tracked wide, font-size eyebrow, font-weight 600
```

---

### 15.2 — StatBlock

```tsx
// StatBlock.tsx
// Displays a large number + descriptor label
// Used in the hero stats row
// Props:
//   value: string     — e.g. "8+" or "100%"
//   label: string     — e.g. "Years NLP & Text Extraction"
//   surface: 'dark' | 'light' — default 'dark'
//
// 'dark' surface: value in gold, label in cream-dim
// 'light' surface: value in caramel, label in muted
//
// value font: 2.2rem, font-weight 800, letter-spacing tight
// label font: 0.76rem, font-weight 500, line-height 1.45
```

---

### 15.3 — Marquee

```tsx
// Marquee.tsx
// A horizontal scrolling marquee of items
// Props:
//   items: string[]         — the items to display
//   separator?: string      — between items, default '◆'
//   speed?: 'slow' | 'normal' | 'fast' — default 'normal'
//     slow: 32s, normal: 24s, fast: 14s
//   direction?: 'left' | 'right' — default 'left'
//   surface?: 'caramel' | 'dark' | 'soft' — background of the band
//
// Implementation:
//   - Render items array TWICE inside the track (to enable seamless loop)
//   - Track animates with bn-animate-marquee
//   - width: max-content on the track
//   - Overflow hidden on the outer container
//   - Pause on hover (animation-play-state: paused)
//
// Item text style: 0.76rem, font-weight 700, uppercase, tracked wider, italic
// Separator style: same size, not italic, lower opacity
```

---

### 15.4 — ServiceCard

```tsx
// ServiceCard.tsx
// Used in the "What We Do" 6-card grid
// Props:
//   number: string          — "01", "02", etc.
//   icon: string            — emoji or any React.ReactNode
//   title: string
//   body: string
//   className?: string
//
// Layout:
//   - Large decorative number top-left (3rem, font-weight 800, caramel at 10% opacity)
//   - Icon below number
//   - Title (1.05rem, font-weight 700, espresso)
//   - Body text (0.84rem, muted, line-height 1.74)
//   - Caramel top border accent (3px, animates scaleX on hover)
//   - Surface: soft bg on light sections
//   - Hover: lift + shadow + caramel border
```

---

### 15.5 — ProcessStep

```tsx
// ProcessStep.tsx
// A numbered process step with hover indent
// Props:
//   number: string      — "01", "02" etc.
//   title: string
//   body: string
//   surface: 'dark' | 'light' — default 'soft' (light)
//   isLast?: boolean    — if true, no bottom border
//
// Layout: CSS grid, two columns [72px 1fr], gap 2rem
// Hover: padding-left transitions from 0 to 0.5rem (smooth)
// Number: 3rem, font-weight 800, dark3 colour normally, toffee on hover
// Bottom border: 1px solid, border-dark on dark, border-light on light
// isLast: no border
```

---

### 15.6 — TechPill

```tsx
// TechPill.tsx
// Small pill displaying a technology name
// Props:
//   children: string
//   surface: 'dark' | 'light' — default 'dark'
//
// 'dark': espresso bg, cream-dim text, border-dark border
// 'light': soft bg, muted text, border-light border
// Always: pill shape, 0.7rem font, font-weight 600, tracked wide, no wrap
```

---

### 15.7 — FaqItem

```tsx
// FaqItem.tsx
// Accordion FAQ item
// Props:
//   question: string
//   answer: string
//   defaultOpen?: boolean — default false
//
// Behaviour:
//   - Controlled internally with useState
//   - Only one should be open at a time — managed by parent (optional)
//   - Chevron rotates 45° when open
//   - Answer animates max-height 0 → 200px
//   - Chevron circle fills caramel when open
//   - Border bottom always present (border-light)
//
// Expose: isOpen state via onToggle callback for parent management
// Props: onToggle?: (isOpen: boolean) => void
```

---

## 16. App UI Components

These serve eClarify and Vidhik dashboards.
All app components should work on **light surfaces by default**.

---

### 16.1 — StatusBadge

```tsx
// StatusBadge.tsx
// More compact than Badge — for use in data tables and lists
// status: 'active' | 'dev' | 'explore' | 'warning' | 'error' | 'idle'
// Colour map:
//   active   → green
//   dev      → caramel
//   explore  → blue
//   warning  → banana (text: toffee)
//   error    → red
//   idle     → muted
// Always: pill, small dot on left, 0.65rem text, font-weight 700
// No pulsing animation (static — used in dense list contexts)
```

---

### 16.2 — DataTable

```tsx
// DataTable.tsx — Generic typed table component
// Props:
//   columns: Column<T>[]
//   data: T[]
//   loading?: boolean       — shows skeleton rows when true
//   emptyMessage?: string   — shown when data is empty
//   onRowClick?: (row: T) => void
//   striped?: boolean       — alternate row shading
//
// Column type:
//   interface Column<T> {
//     key: keyof T
//     header: string
//     render?: (value: T[keyof T], row: T) => React.ReactNode
//     width?: string
//     align?: 'left' | 'center' | 'right'
//   }
//
// Style:
//   - Full width
//   - Header: soft bg, espresso text, font-weight 700, font-size small
//   - Rows: warm-white bg, border-bottom border-light
//   - Hover row: soft bg tint
//   - Striped: every even row gets soft bg
//   - onRowClick: cursor pointer, hover highlight
//   - Loading: 5 skeleton rows with shimmer animation
//   - Empty: centred EmptyState component
```

---

### 16.3 — FormGroup

```tsx
// FormGroup.tsx — Wraps label + input + error/hint
// Props:
//   label: string
//   htmlFor: string
//   error?: string
//   hint?: string
//   required?: boolean
//   children: React.ReactNode  — the actual Input/Select/Slider
//
// Layout:
//   - Label above children (block, font-size xs, font-weight 600, muted)
//   - Required: asterisk after label in caramel
//   - Hint below children (font-size xs, muted, lighter)
//   - Error below children (font-size xs, red, replaces hint when both present)
//   - Consistent spacing gap between elements
```

---

### 16.4 — Sidebar

```tsx
// Sidebar.tsx — Application sidebar navigation
// Props:
//   items: SidebarItem[]
//   activeId: string
//   onNavigate: (id: string) => void
//   brandName?: string    — displayed at top, default 'banoffee.ai'
//   collapsed?: boolean   — icon-only mode
//
// SidebarItem type:
//   interface SidebarItem {
//     id: string
//     label: string
//     icon: string          — emoji or text icon
//     badge?: string        — optional count badge
//     section?: string      — group label
//   }
//
// Style:
//   - Background: espresso
//   - Width: 240px, collapsed: 64px
//   - Items: full-width rows, 0.88rem, font-weight 500, cream-dim
//   - Active: caramel bg at 12%, caramel left border 3px, caramel text
//   - Hover: dark2 bg
//   - Section headers: eyebrow style, muted, uppercase
//   - Collapsed: hide labels, center icons, tooltips on hover
```

---

### 16.5 — PageHeader

```tsx
// PageHeader.tsx — Top area of an application page
// Props:
//   title: string
//   subtitle?: string
//   breadcrumbs?: BreadcrumbItem[]   — [{label, href}]
//   actions?: React.ReactNode        — slot for buttons top-right
//
// Style:
//   - Title: 1.6rem, font-weight 800, espresso, letter-spacing snug
//   - Subtitle: 0.88rem, muted
//   - Breadcrumbs: xs text, muted, '/' separator, last item espresso
//   - Actions: flex row, right-aligned
//   - Bottom border: border-light
//   - Padding: 1.5rem 0
```

---

### 16.6 — EmptyState

```tsx
// EmptyState.tsx — Empty content placeholder
// Props:
//   icon?: string           — emoji, default '📭'
//   title: string
//   description?: string
//   action?: React.ReactNode — optional Button
//
// Style:
//   - Centred layout (flex column, align centre)
//   - Icon: 2.5rem, opacity 30%
//   - Title: 1rem, font-weight 700, espresso
//   - Description: 0.84rem, muted, max-width 32ch, centred
//   - Spacing: gap 0.8rem between elements
```

---

### 16.7 — ProgressBar

```tsx
// ProgressBar.tsx — Horizontal progress indicator
// Props:
//   value: number           — 0 to 100
//   label?: string          — displayed above
//   showValue?: boolean     — show percentage right of label
//   size: 'sm' | 'md' | 'lg' — track height: 4px | 6px | 10px
//   color: 'caramel' | 'green' | 'blue' — fill colour
//   animated?: boolean      — subtle shimmer on the fill
//
// Style:
//   - Track: soft bg, border-radius full
//   - Fill: transitions width with duration 500ms ease
//   - Label: 0.76rem, font-weight 600, muted
//   - Value: font-weight 700, caramel
```

---

### 16.8 — Toast

```tsx
// Toast.tsx + useToast hook
// Variants: 'success' | 'error' | 'info' | 'warning'
// Props (for the toast message object):
//   id: string
//   variant: ToastVariant
//   title: string
//   description?: string
//   duration?: number     — ms before auto-dismiss, default 4000
//   action?: { label: string; onClick: () => void }
//
// useToast hook returns:
//   toast(options)      — show a toast
//   dismiss(id)         — manually dismiss
//   toasts: Toast[]     — current toasts
//
// ToastProvider wraps the app and renders a ToastViewport
// Viewport: fixed, bottom-right, z-toast, flex-col, gap 0.5rem
//
// Style:
//   - warm-white bg, border-light border, radius-lg, shadow-md
//   - Left border 3px in variant colour (green/red/blue/banana)
//   - Icon in variant colour (left of title)
//   - Close button top-right (×)
//   - Entry animation: slide in from right + fade in
//   - Exit animation: slide out right + fade out
//
// Colour map:
//   success → green  / icon: ✓
//   error   → red    / icon: ✕
//   info    → blue   / icon: ℹ
//   warning → banana / icon: ⚠
```

---

## 17. Export Barrel

This is the public API of the library. Every component must appear here.
If it's not exported here, it doesn't exist to consumers.

```ts
// src/index.ts  — LIBRARY ENTRY POINT

// ── Styles ──
// Note: consumers import styles separately via '@banoffee/ui/styles'
// Do NOT import styles here (causes SSR issues)

// ── Utilities ──
export { cn } from './utils/cn'

// ── Primitives ──
export { Button }       from './components/primitives/Button'
export type { ButtonProps } from './components/primitives/Button'

export { Badge }        from './components/primitives/Badge'
export type { BadgeProps } from './components/primitives/Badge'

export { Input }        from './components/primitives/Input'
export type { InputProps } from './components/primitives/Input'

export { Select }       from './components/primitives/Select'
export type { SelectProps, SelectOption } from './components/primitives/Select'

export { Slider }       from './components/primitives/Slider'
export type { SliderProps } from './components/primitives/Slider'

export { Eyebrow }      from './components/primitives/Eyebrow'
export type { EyebrowProps } from './components/primitives/Eyebrow'

export { Divider }      from './components/primitives/Divider'
export type { DividerProps } from './components/primitives/Divider'

// ── Layout ──
export { Container }    from './components/layout/Container'
export type { ContainerProps } from './components/layout/Container'

export { Section }      from './components/layout/Section'
export type { SectionProps } from './components/layout/Section'

export { Card }         from './components/layout/Card'
export type { CardProps } from './components/layout/Card'

export { Grid }         from './components/layout/Grid'
export type { GridProps } from './components/layout/Grid'

// ── Marketing ──
export { HeroPill }     from './components/marketing/HeroPill'
export type { HeroPillProps } from './components/marketing/HeroPill'

export { StatBlock }    from './components/marketing/StatBlock'
export type { StatBlockProps } from './components/marketing/StatBlock'

export { Marquee }      from './components/marketing/Marquee'
export type { MarqueeProps } from './components/marketing/Marquee'

export { ServiceCard }  from './components/marketing/ServiceCard'
export type { ServiceCardProps } from './components/marketing/ServiceCard'

export { ProcessStep }  from './components/marketing/ProcessStep'
export type { ProcessStepProps } from './components/marketing/ProcessStep'

export { TechPill }     from './components/marketing/TechPill'
export type { TechPillProps } from './components/marketing/TechPill'

export { FaqItem }      from './components/marketing/FaqItem'
export type { FaqItemProps } from './components/marketing/FaqItem'

// ── App UI ──
export { StatusBadge }  from './components/app/StatusBadge'
export type { StatusBadgeProps } from './components/app/StatusBadge'

export { DataTable }    from './components/app/DataTable'
export type { DataTableProps, Column } from './components/app/DataTable'

export { FormGroup }    from './components/app/FormGroup'
export type { FormGroupProps } from './components/app/FormGroup'

export { Sidebar }      from './components/app/Sidebar'
export type { SidebarProps, SidebarItem } from './components/app/Sidebar'

export { PageHeader }   from './components/app/PageHeader'
export type { PageHeaderProps, BreadcrumbItem } from './components/app/PageHeader'

export { EmptyState }   from './components/app/EmptyState'
export type { EmptyStateProps } from './components/app/EmptyState'

export { ProgressBar }  from './components/app/ProgressBar'
export type { ProgressBarProps } from './components/app/ProgressBar'

export { Toast, ToastProvider, useToast } from './components/app/Toast'
export type { ToastProps } from './components/app/Toast'
```

---

## 18. Utility Helpers

Create these helper hooks — they are used by components internally
and should also be exported for consumers.

### 18.1 — useMediaQuery

```ts
// src/utils/useMediaQuery.ts
// Returns true/false based on a media query string
// Usage: const isMobile = useMediaQuery('(max-width: 768px)')
// Must handle SSR (return false on server)
```

### 18.2 — useIntersectionObserver

```ts
// src/utils/useIntersectionObserver.ts
// Returns a ref and a boolean (isIntersecting)
// Used by scroll-reveal animations
// Options: threshold, rootMargin, triggerOnce (default true)
```

### 18.3 — useLocalStorage

```ts
// src/utils/useLocalStorage.ts
// useState that persists to localStorage
// Handles SSR gracefully
// Generic: useLocalStorage<T>(key: string, initialValue: T)
```

Export all three from `src/utils/index.ts` and include in the main `src/index.ts` barrel.

---

## 19. Testing Setup

Every primitive component requires a test file with the following coverage minimum:

### Test coverage requirements

| Test type | Required for |
|---|---|
| Renders without crashing | All components |
| Renders correct variant classes | Button, Badge, StatusBadge, Card |
| Forwards ref correctly | All interactive elements |
| Handles disabled state | Button, Input, Select, Slider |
| Calls onClick/onChange | Button, Input, Select, Slider, FaqItem |
| Renders children | Card, Section, Container, Grid, FormGroup |
| Accessible label | Input (aria-label or associated label) |

### Example test pattern

```tsx
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn()
    render(<Button disabled onClick={onClick}>Click</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<Button ref={ref}>Click</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('applies variant class correctly', () => {
    render(<Button variant="ghost">Ghost</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('bg-transparent')
  })
})
```

Run tests before every commit:
```bash
npm run test
```

---

## 20. Publishing Workflow

### 20.1 — First-time setup

```bash
# Login to npm (create account at npmjs.com first)
npm login

# Verify you're logged in
npm whoami
```

### 20.2 — Version management

Follow semantic versioning strictly:

| Change type | Version bump | Example |
|---|---|---|
| Bug fix, style tweak | patch | 0.1.0 → 0.1.1 |
| New component added | minor | 0.1.0 → 0.2.0 |
| Breaking API change | major | 0.1.0 → 1.0.0 |

```bash
# Bump version (choose one)
npm version patch   # bug fixes
npm version minor   # new components
npm version major   # breaking changes
```

### 20.3 — Publish steps

```bash
# 1. Ensure you're on main branch
git checkout main
git pull

# 2. Run full check
npm run type-check
npm run test:cov
npm run build

# 3. Verify dist/ looks correct
ls dist/
# Should contain: banoffee-ui.es.js, banoffee-ui.cjs.js, styles.css, index.d.ts

# 4. Dry run (shows what would be published — nothing is uploaded)
npm publish --dry-run

# 5. Publish
npm publish --access public

# 6. Tag the release
git tag v$(node -p "require('./package.json').version")
git push --tags
```

### 20.4 — Pre-publish checklist

Before running `npm publish`, verify:
- [ ] All components have Storybook stories
- [ ] All primitive tests pass (`npm run test`)
- [ ] `dist/` contains `styles.css`
- [ ] `dist/` contains TypeScript declaration files (`.d.ts`)
- [ ] `package.json` version is bumped
- [ ] `CHANGELOG.md` updated (create this file and maintain it)
- [ ] No `console.log` statements in any component files

---

## 21. Consuming the Library

### 21.1 — Installation

```bash
# In any consuming project (eClarify, Vidhik, banoffee.ai site)
npm install @banoffee/ui
```

### 21.2 — Setup in the consuming app

```tsx
// In the app's entry CSS (e.g. src/index.css or globals.css)
@import '@banoffee/ui/styles';
```

For Next.js, add to `app/layout.tsx`:
```tsx
import '@banoffee/ui/styles'
```

### 21.3 — Usage

```tsx
// Import components — tree-shaken automatically
import { Button, Card, Eyebrow, StatusBadge } from '@banoffee/ui'

export function MyPage() {
  return (
    <Card variant="light" accentColor="caramel">
      <Eyebrow variant="light">Section Label</Eyebrow>
      <h2>Page Title</h2>
      <StatusBadge status="active" />
      <Button variant="primary" size="md">
        Book a Call →
      </Button>
    </Card>
  )
}
```

### 21.4 — Tailwind integration in consuming apps

The consuming app must have Tailwind configured to scan `@banoffee/ui` components
if it uses Tailwind itself:

```ts
// consuming app's tailwind.config.ts
content: [
  './src/**/*.{ts,tsx}',
  './node_modules/@banoffee/ui/dist/**/*.js',  // scan library components
]
```

---

## 22. Acceptance Criteria

The build is complete when **all** of the following are true:

### Code quality
- [ ] Zero TypeScript errors (`npm run type-check` passes clean)
- [ ] All tests pass (`npm run test` green)
- [ ] No component uses hardcoded hex colours
- [ ] No component uses `any` type
- [ ] All interactive components use `forwardRef`
- [ ] All components have `displayName` set

### Storybook
- [ ] `npm run dev` opens Storybook on port 6006
- [ ] Every component appears in the sidebar
- [ ] Every component has at minimum 3 stories
- [ ] Dark and light backgrounds both work via the Storybook toolbar
- [ ] Autodocs generates a props table for every component

### Distribution
- [ ] `npm run build` produces `dist/` with no errors
- [ ] `dist/styles.css` exists and contains the full token system
- [ ] `dist/index.d.ts` exists (TypeScript declarations)
- [ ] `npm publish --dry-run` shows correct file list (only `dist/` and `README.md`)

### Design fidelity
- [ ] All components use only tokens from `theme.css` — no hardcoded values
- [ ] DM Sans renders correctly in Storybook
- [ ] Caramel focus ring appears on all interactive elements when keyboard-navigating
- [ ] Hover states animate smoothly (no flash)
- [ ] Dark surface components are tested on espresso backgrounds in Storybook

### Consuming app compatibility
- [ ] Library installs cleanly in a new Vite + React project
- [ ] Library installs cleanly in a new Next.js 14 project (App Router)
- [ ] Importing styles does not cause CSS conflicts with consuming app's own styles
- [ ] Tree-shaking works — importing only `Button` does not bundle the entire library

---

*End of build instructions.*

> **Agent note:** When you have completed every section,
> run `npm run test:cov` and `npm run build` one final time,
> then output the coverage report and confirm the `dist/` file list.
> Do not mark the task complete until both commands exit with code 0.