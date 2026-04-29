# Consuming @banoffee-ai/ui — Setup Guide

This guide explains how to install and use `@banoffee-ai/ui` in your React/Next.js projects, including CI/CD deployment setup.

---

## How It Works

`@banoffee-ai/ui` is published to **GitHub Packages** (a private npm registry). A GitHub Personal Access Token (PAT) is required to download the package during `npm install`. Once your app is built, no token is needed at runtime — all code is bundled into your app.

| Phase | Needs PAT? | Why? |
|---|---|---|
| `npm install` (local dev) | ✅ Yes | Downloads the package from GitHub Packages |
| `npm install` (CI/CD build) | ✅ Yes | Same — set as a CI environment secret |
| Runtime (deployed app) | ❌ No | Code is already bundled into your app |

---

## 1. Create a GitHub PAT

1. Go to [GitHub → Settings → Developer Settings → Personal Access Tokens → Fine-grained tokens](https://github.com/settings/tokens?type=beta)
2. Create a new token with:
   - **Repository access**: Select `Banoffee-ai/banoffee-ui`
   - **Permissions**: `read:packages` (that's all consumers need)
3. Copy the token — you'll need it below

> **For publishing** (maintainers only), the token also needs `write:packages`.

---

## 2. Local Development Setup

### Add `.npmrc` to your project root

```ini
# .npmrc (commit this file — it contains no secrets)
@banoffee-ai:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

### Set the token as an environment variable

```bash
# Add to your shell profile (~/.zshrc, ~/.bashrc, etc.)
export GITHUB_TOKEN=ghp_your_token_here
```

Then reload your shell and install:

```bash
source ~/.zshrc  # or restart terminal
npm install @banoffee-ai/ui
```

---

## 3. CI/CD Setup

### Vercel

1. Go to **Project Settings → Environment Variables**
2. Add `GITHUB_TOKEN` with your PAT value
3. Set scope to **Production**, **Preview**, and **Development**
4. Ensure your project has the `.npmrc` file (step 2 above) committed to the repo

Vercel will automatically use the token during `npm install` in the build step.

### GitHub Actions

```yaml
# .github/workflows/build.yml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 18
          registry-url: https://npm.pkg.github.com

      - run: npm install
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          # Note: GITHUB_TOKEN is automatically available in GitHub Actions
          # If the package repo is in the same org, this just works.
          # For cross-org access, use a PAT stored as a repository secret.

      - run: npm run build
```

**Important:** If `banoffee-ui` and the consuming app are in the **same GitHub org** (`Banoffee-ai`), the built-in `GITHUB_TOKEN` works automatically. For cross-org access, store a PAT as a repository secret.

### Netlify

1. Go to **Site Settings → Environment Variables**
2. Add `GITHUB_TOKEN` with your PAT value
3. Ensure `.npmrc` is committed to the repo

### AWS Amplify

1. Go to **App Settings → Environment Variables**
2. Add `GITHUB_TOKEN` with your PAT value
3. Ensure `.npmrc` is committed to the repo

### Docker

```dockerfile
# In your Dockerfile
ARG GITHUB_TOKEN
ENV GITHUB_TOKEN=$GITHUB_TOKEN

COPY .npmrc ./
RUN npm install
```

Build with:
```bash
docker build --build-arg GITHUB_TOKEN=ghp_your_token_here .
```

---

## 4. Import Styles

In your app's entry point:

```css
/* CSS file (e.g., globals.css) */
@import '@banoffee-ai/ui/styles';
```

```tsx
// Or in Next.js app/layout.tsx
import '@banoffee-ai/ui/styles'
```

---

## 5. Use Components

```tsx
import { Button, Card, Section, StatusBadge } from '@banoffee-ai/ui'

export function Dashboard() {
  return (
    <Section variant="light">
      <Card variant="light" accentColor="caramel">
        <StatusBadge status="active" />
        <h2>Welcome</h2>
        <Button variant="primary">Get Started →</Button>
      </Card>
    </Section>
  )
}
```

---

## 6. Tailwind Integration (Optional)

If your consuming app uses Tailwind CSS, add the library to content scanning:

```ts
// tailwind.config.ts
content: [
  './src/**/*.{ts,tsx}',
  './node_modules/@banoffee-ai/ui/dist/**/*.js',
]
```

---

## Troubleshooting

### `npm ERR! 401 Unauthorized`
- Your `GITHUB_TOKEN` is missing, expired, or lacks `read:packages` permission
- Check: `echo $GITHUB_TOKEN` should output a value

### `npm ERR! 404 Not Found`
- The `.npmrc` scope mapping may be wrong — ensure it says `@banoffee-ai:registry=https://npm.pkg.github.com`
- The package may not be published yet

### `npm ERR! Unable to authenticate`
- Ensure `//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}` is in `.npmrc` (not `$GITHUB_TOKEN` with dollar sign in quotes)

### Build works locally but fails in CI
- The CI environment variable name must match what's in `.npmrc` — typically `GITHUB_TOKEN`
- In GitHub Actions, use `NODE_AUTH_TOKEN` with `setup-node`'s `registry-url` option
