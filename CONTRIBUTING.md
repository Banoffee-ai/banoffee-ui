# Contributing to @banoffee-ai/ui

Thanks for contributing! This guide will help you add components, run the dev environment, and submit clean PRs.

---

## Getting Started

```bash
git clone https://github.com/Banoffee-ai/banoffee-ui.git
cd banoffee-ui
npm install
npm run dev    # Opens Storybook at http://localhost:6006
```

---

## Adding a New Component

### 1. Create the component folder

Every component lives in its own folder under the appropriate category:

```
src/components/<category>/<ComponentName>/
├── ComponentName.tsx          # Component implementation
├── ComponentName.stories.tsx  # Storybook stories (minimum 3)
├── ComponentName.test.tsx     # Tests (required for primitives, recommended for all)
└── index.ts                   # Barrel export
```

**Categories:**
- `primitives/` — Base elements (buttons, inputs, badges, etc.)
- `layout/` — Structural containers (cards, grids, sections)
- `marketing/` — Marketing site components (hero pills, stat blocks, etc.)
- `app/` — Dashboard/app UI components (data tables, sidebars, etc.)

### 2. Follow the component rules

- **TypeScript**: All props must be typed. No `any`. Export the props interface.
- **forwardRef**: All components that render an HTML element must use `forwardRef`.
- **displayName**: Set `ComponentName.displayName = 'ComponentName'`.
- **cn()**: Use the `cn()` utility for all className construction — never concatenate strings.
- **cva()**: Use `cva` for components with multiple visual variants.
- **No hardcoded colors**: All colors come from design tokens in `theme.css`.
- **Children typed**: Use `React.ReactNode` or `string`, never `any`.

### 3. Write stories

Minimum 3 stories per component. Include variant demos and dark/light backgrounds.

```tsx
// ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { ComponentName } from './ComponentName'

const meta: Meta<typeof ComponentName> = {
  title: 'Category/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ComponentName>

export const Default: Story = { args: { /* ... */ } }
export const VariantA: Story = { args: { variant: 'a' } }
export const VariantB: Story = { args: { variant: 'b' } }
```

### 4. Write tests

```tsx
// ComponentName.test.tsx
import { render, screen } from '@testing-library/react'
import { ComponentName } from './ComponentName'

describe('ComponentName', () => {
  it('renders without crashing', () => { /* ... */ })
  it('forwards ref', () => { /* ... */ })
  it('applies variant classes', () => { /* ... */ })
})
```

### 5. Export from barrels

Add exports to:
1. `src/components/<category>/index.ts` — category barrel
2. `src/components/index.ts` — root component barrel
3. `src/index.ts` — library entry point

```ts
// src/index.ts
export { ComponentName } from './components/<category>/ComponentName'
export type { ComponentNameProps } from './components/<category>/ComponentName'
```

### 6. Verify everything

```bash
npm run type-check   # No TypeScript errors
npm test             # All tests pass
npm run dev          # Component appears in Storybook
npm run build        # Library builds cleanly
```

---

## Code Style

- **Styling**: Tailwind v4 only. No CSS-in-JS, no inline styles (except CSS variable references).
- **Design tokens**: All from `src/tokens/theme.css`. Use utility classes like `bg-caramel`, `text-cream`.
- **File naming**: PascalCase for components (`Button.tsx`), camelCase for utilities (`cn.ts`).
- **Comments**: Only when code needs clarification. Don't over-comment.

---

## Pull Request Process

1. Create a feature branch: `git checkout -b feat/component-name`
2. Make your changes following the rules above
3. Run the full check: `npm run type-check && npm test && npm run build`
4. Push and open a PR against `main`
5. Fill out the PR template
6. Request a review

---

## Design Token Changes

If you need to modify or add design tokens:
1. Edit `src/tokens/theme.css`
2. Document the change clearly in your PR
3. Verify no existing components break
4. Update Storybook backgrounds in `.storybook/preview.ts` if new surface colors are added

---

## Questions?

Open an issue or reach out to the team. We're happy to help!
