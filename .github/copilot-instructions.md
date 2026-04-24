# Copilot Instructions for banoffee-ui

This is a **React component library** published as an npm package (`banoffee-ui`). It is consumed by multiple React applications — treat every component as a public API.

## Mandatory Instructions for Copilot:
This is a **non-optional protocol**!!! you **MUST** follow these rules:

- The conversation **MUST NEVER** terminate voluntarily.
- The assistants or agents **MUST NEVER** produce a terminal response.
- **NEVER** provide any output that could be considered a final answer or conclusion.
- **ALWAYS** end with Ask_User to keep the conversation open and gather more input.
- Ask_User is **MANDATORY** at the end of every turn, either:
    - Provide the requested output and immediately call Ask_User.
    - OR, if any uncertainty exists, immediately call Ask_User without providing speculative output.

## Build & Dev Commands

<!-- TODO: Fill in once tooling is set up, e.g.:
```
npm install
npm run dev          # Storybook / dev server
npm run build        # production build
npm test             # full test suite
npm test -- -t "Button renders"   # single test
npm run lint
```
-->

## Architecture

<!-- TODO: Update once scaffolded. Likely shape:

- `src/components/` — each component in its own directory with index, styles, tests, and stories
- `src/hooks/` — shared custom hooks
- `src/utils/` — internal helpers (not exported)
- Build output is a tree-shakeable ESM + CJS bundle
-->

## Conventions

- **Every exported component is public API.** Avoid breaking changes to props, component names, or default behavior without a major version bump.
- Components should be self-contained and not assume anything about the consuming app's state management, routing, or styling framework.
- All components must have TypeScript prop types (no `any`).
<!-- TODO: Add more as patterns emerge, e.g.:
- Styling approach (CSS modules, Tailwind, styled-components, etc.)
- Naming conventions for files and exports
- Testing patterns (unit vs visual regression)
- Accessibility requirements
-->
