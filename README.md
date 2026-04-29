# @banoffee/ui

> Shared React component library & design system for **banoffee.ai**, **eClarify**, and **Vidhik**.

Warm-material design tokens · Tailwind v4 · Storybook · Tree-shakeable ESM + CJS

---

## Table of Contents

- [What's Inside](#whats-inside)
- [Quick Start (Local Development)](#quick-start-local-development)
- [Running Storybook](#running-storybook)
- [Building the Library](#building-the-library)
- [Running Tests](#running-tests)
- [Consuming in a React / Next.js Project](#consuming-in-a-react--nextjs-project)
- [Consuming in a Plain HTML Project](#consuming-in-a-plain-html-project)
- [Publishing a New Version](#publishing-a-new-version)
- [Project Structure](#project-structure)
- [Design Tokens](#design-tokens)
- [Component List](#component-list)

---

## What's Inside

| Category | Components |
|---|---|
| **Primitives** | Button, Badge, Input, Select, Slider, Eyebrow, Divider |
| **Layout** | Container, Section, Card, Grid |
| **Marketing** | HeroPill, StatBlock, Marquee, ServiceCard, ProcessStep, TechPill, FaqItem |
| **App UI** | StatusBadge, DataTable, FormGroup, Sidebar, PageHeader, EmptyState, ProgressBar, Toast |
| **Hooks** | `useMediaQuery`, `useIntersectionObserver`, `useLocalStorage` |
| **Utilities** | `cn()` (Tailwind class merging) |

---

## Quick Start (Local Development)

### Prerequisites

- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0

### Install dependencies

```bash
git clone https://github.com/Banoffee-ai/banoffee-ui.git
cd banoffee-ui
npm install
```

---

## Running Storybook

Storybook is the interactive UI for previewing all components, their variants, and props.

```bash
npm run dev
```

This starts Storybook at **http://localhost:6006**. Every component has stories with auto-generated documentation.

### Build a static Storybook (for deployment)

```bash
npm run build:sb
```

Output is in `storybook-static/`.

---

## Building the Library

```bash
npm run build
```

This runs three steps:
1. **tsup** — bundles `src/index.ts` into ESM (`dist/index.js`) + CJS (`dist/index.cjs`)
2. **tsc** — generates TypeScript declarations in `dist/`
3. **css copy** — copies `src/styles/index.css` → `dist/styles.css`

### Verify the build

```bash
ls dist/
# Expected: index.js  index.cjs  index.d.ts  index.d.cts  styles.css  types/  *.map
```

---

## Running Tests

```bash
# Run all tests
npm test

# Run tests with UI (interactive browser)
npm run test:ui

# Run tests with coverage report
npm run test:cov

# Run a specific test file
npx vitest run src/components/primitives/Button/Button.test.tsx
```

### Type checking

```bash
npm run type-check
```

---

## Consuming in a React / Next.js Project

### 1. Install the package

```bash
npm install @banoffee/ui
```

### 2. Import the styles

Add to your app's entry CSS file (e.g., `src/index.css`, `globals.css`, or `app/layout.tsx`):

```css
/* In a CSS file */
@import '@banoffee/ui/styles';
```

```tsx
// Or in Next.js app/layout.tsx
import '@banoffee/ui/styles'
```

### 3. Use components

```tsx
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

### 4. Tailwind integration (if your app uses Tailwind)

Add the library to your content scanning so Tailwind generates the needed utility classes:

```ts
// your app's tailwind.config.ts
content: [
  './src/**/*.{ts,tsx}',
  './node_modules/@banoffee/ui/dist/**/*.js',
]
```

### 5. Toast system setup

Wrap your app with `ToastProvider` and use the `useToast` hook:

```tsx
import { ToastProvider, useToast } from '@banoffee/ui'

function App() {
  return (
    <ToastProvider>
      <MyComponent />
    </ToastProvider>
  )
}

function MyComponent() {
  const { toast } = useToast()

  return (
    <button onClick={() => toast({ variant: 'success', title: 'Saved!' })}>
      Save
    </button>
  )
}
```

---

## Consuming in a Plain HTML Project

Since this is a React component library, it requires React to run. For a plain HTML project, you'll need a minimal React setup:

### Option A: Use a bundler (Vite)

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install @banoffee/ui
```

Then follow the React instructions above.

### Option B: CDN-based (for quick prototyping)

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Load the library's styles -->
  <link rel="stylesheet" href="./node_modules/@banoffee/ui/dist/styles.css">
</head>
<body>
  <div id="root"></div>

  <script type="importmap">
  {
    "imports": {
      "react": "https://esm.sh/react@18",
      "react-dom/client": "https://esm.sh/react-dom@18/client",
      "react/jsx-runtime": "https://esm.sh/react@18/jsx-runtime",
      "@banoffee/ui": "./node_modules/@banoffee/ui/dist/index.js"
    }
  }
  </script>

  <script type="module">
    import { createRoot } from 'react-dom/client'
    import { createElement } from 'react'
    import { Button } from '@banoffee/ui'

    const root = createRoot(document.getElementById('root'))
    root.render(createElement(Button, { variant: 'primary' }, 'Hello Banoffee'))
  </script>
</body>
</html>
```

> **Note:** For production use, a proper bundler (Vite, webpack, etc.) is strongly recommended.

---

## Publishing a New Version

### One-time setup

```bash
npm login          # Login to npmjs.com
npm whoami         # Verify you're logged in
```

### Using the publish script

A convenience script handles the full workflow:

```bash
# Patch release (bug fixes)
./scripts/publish.sh patch

# Minor release (new components)
./scripts/publish.sh minor

# Major release (breaking changes)
./scripts/publish.sh major

# Dry run (preview without publishing)
./scripts/publish.sh patch --dry-run
```

### Manual publish workflow

```bash
# 1. Ensure clean main branch
git checkout main && git pull

# 2. Run checks
npm run type-check
npm test
npm run build

# 3. Bump version
npm version patch   # or minor / major

# 4. Publish
npm publish --access public

# 5. Push tags
git push && git push --tags
```

### Pre-publish checklist

- [ ] All components have Storybook stories
- [ ] All tests pass (`npm test`)
- [ ] `dist/styles.css` exists
- [ ] `dist/index.d.ts` exists
- [ ] Version bumped in `package.json`
- [ ] `CHANGELOG.md` updated
- [ ] No `console.log` in component files

---

## Project Structure

```
banoffee-ui/
├── .storybook/              # Storybook configuration
│   ├── main.ts
│   └── preview.ts
├── src/
│   ├── tokens/theme.css     # Design tokens (colors, typography, spacing, etc.)
│   ├── styles/index.css     # Entry CSS — imports tokens + Tailwind + animations
│   ├── utils/               # cn(), useMediaQuery, useIntersectionObserver, useLocalStorage
│   ├── components/
│   │   ├── primitives/      # Button, Badge, Input, Select, Slider, Eyebrow, Divider
│   │   ├── layout/          # Container, Section, Card, Grid
│   │   ├── marketing/       # HeroPill, StatBlock, Marquee, ServiceCard, ProcessStep, TechPill, FaqItem
│   │   └── app/             # StatusBadge, DataTable, FormGroup, Sidebar, PageHeader, EmptyState, ProgressBar, Toast
│   └── index.ts             # Library entry point — all public exports
├── dist/                    # Built output (ESM + CJS + types + CSS)
├── scripts/publish.sh       # Automated publish script
├── package.json
├── tsup.config.ts           # npm bundle config
├── vite.config.ts           # Dev/Storybook config
├── vitest.config.ts         # Test config
├── tailwind.config.ts
└── tsconfig.json
```

---

## Design Tokens

All visual tokens are defined in `src/tokens/theme.css` using Tailwind v4's `@theme` directive. They are available as utility classes:

| Token | Example classes |
|---|---|
| **Colors** | `bg-espresso`, `text-cream`, `border-caramel` |
| **Typography** | `text-[length:var(--font-size-h1)]`, `font-[var(--font-weight-bold)]` |
| **Spacing** | `p-[var(--spacing-section)]`, `gap-[var(--spacing-gap)]` |
| **Radius** | `rounded-[var(--radius-pill)]`, `rounded-[var(--radius-lg)]` |
| **Shadows** | `shadow-[var(--shadow-btn)]`, `shadow-[var(--shadow-card)]` |

---

## Component List

### Primitives

| Component | Variants | Key Props |
|---|---|---|
| `Button` | primary, ghost, ghost-light, dark, nav | `variant`, `size`, `asChild` |
| `Badge` | dev, explore, pilot, open, error | `variant`, `showDot` |
| `Input` | default, dark | `variant`, `label`, `error`, `hint`, `leftIcon`, `rightIcon` |
| `Select` | default, dark | `variant`, `options`, `label`, `error` |
| `Slider` | — | `min`, `max`, `step`, `value`, `label`, `showValue` |
| `Eyebrow` | light, dark | `variant` |
| `Divider` | solid, gradient, dark | `variant`, `orientation` |

### Layout

| Component | Variants | Key Props |
|---|---|---|
| `Container` | — | `maxWidth` (sm/md/lg/xl/full) |
| `Section` | light, soft, dark, dark2 | `variant`, `containerMaxWidth` |
| `Card` | light, dark | `variant`, `accentColor`, `padding` |
| `Grid` | — | `cols` (1-4), `gap` (sm/md/lg) |

### Marketing

| Component | Key Props |
|---|---|
| `HeroPill` | `dotColor`, `animate` |
| `StatBlock` | `value`, `label`, `surface` |
| `Marquee` | `items`, `separator`, `speed`, `direction`, `surface` |
| `ServiceCard` | `number`, `icon`, `title`, `body` |
| `ProcessStep` | `number`, `title`, `body`, `surface`, `isLast` |
| `TechPill` | `surface` |
| `FaqItem` | `question`, `answer`, `defaultOpen`, `onToggle` |

### App UI

| Component | Key Props |
|---|---|
| `StatusBadge` | `status` (active/dev/explore/warning/error/idle) |
| `DataTable` | `columns`, `data`, `loading`, `emptyMessage`, `onRowClick`, `striped` |
| `FormGroup` | `label`, `htmlFor`, `error`, `hint`, `required` |
| `Sidebar` | `items`, `activeId`, `onNavigate`, `brandName`, `collapsed` |
| `PageHeader` | `title`, `subtitle`, `breadcrumbs`, `actions` |
| `EmptyState` | `icon`, `title`, `description`, `action` |
| `ProgressBar` | `value`, `label`, `showValue`, `size`, `color`, `animated` |
| `Toast` / `useToast` | `variant` (success/error/info/warning), `title`, `description`, `duration` |

---

## License

MIT © [Banoffee.ai](https://banoffee.ai)