#!/usr/bin/env bash
set -euo pipefail

# ─────────────────────────────────────────────
# @banoffee/ui — Build, Test & Publish Script
# ─────────────────────────────────────────────
# Usage:
#   ./scripts/publish.sh <patch|minor|major> [--dry-run]
#
# Examples:
#   ./scripts/publish.sh patch           # Bug fix release
#   ./scripts/publish.sh minor           # New component release
#   ./scripts/publish.sh major           # Breaking change release
#   ./scripts/publish.sh patch --dry-run # Preview without publishing

BUMP="${1:-}"
DRY_RUN=false

if [[ "$BUMP" != "patch" && "$BUMP" != "minor" && "$BUMP" != "major" ]]; then
  echo "❌ Usage: ./scripts/publish.sh <patch|minor|major> [--dry-run]"
  exit 1
fi

if [[ "${2:-}" == "--dry-run" ]]; then
  DRY_RUN=true
fi

echo ""
echo "╔══════════════════════════════════════╗"
echo "║   @banoffee/ui — Publish Pipeline    ║"
echo "╚══════════════════════════════════════╝"
echo ""

# ── Step 1: Check we're on main ──
BRANCH=$(git branch --show-current)
if [[ "$BRANCH" != "main" ]]; then
  echo "⚠️  Not on 'main' branch (currently on '$BRANCH')."
  read -rp "Continue anyway? (y/N) " confirm
  if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
    echo "Aborted."
    exit 1
  fi
fi

# ── Step 2: Check for uncommitted changes ──
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "❌ You have uncommitted changes. Commit or stash them first."
  exit 1
fi

echo "✅ Clean working tree"

# ── Step 3: Type check ──
echo ""
echo "🔍 Running type check..."
npm run type-check
echo "✅ Type check passed"

# ── Step 4: Run tests ──
echo ""
echo "🧪 Running tests..."
npx vitest run
echo "✅ All tests passed"

# ── Step 5: Build ──
echo ""
echo "📦 Building library..."
npm run build
echo "✅ Build complete"

# ── Step 6: Verify dist ──
echo ""
echo "🔎 Verifying dist output..."
MISSING=()
for f in dist/index.js dist/index.cjs dist/index.d.ts dist/styles.css; do
  if [[ ! -f "$f" ]]; then
    MISSING+=("$f")
  fi
done

if [[ ${#MISSING[@]} -gt 0 ]]; then
  echo "❌ Missing files in dist/: ${MISSING[*]}"
  exit 1
fi
echo "✅ dist/ verified — index.js, index.cjs, index.d.ts, styles.css"

# ── Step 7: Bump version ──
echo ""
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "📌 Current version: $CURRENT_VERSION"

npm version "$BUMP" --no-git-tag-version
NEW_VERSION=$(node -p "require('./package.json').version")
echo "📌 New version: $NEW_VERSION"

# ── Step 8: Commit & tag ──
git add package.json package-lock.json
git commit -m "chore: release v${NEW_VERSION}"
git tag "v${NEW_VERSION}"
echo "✅ Committed and tagged v${NEW_VERSION}"

# ── Step 9: Publish ──
echo ""
if $DRY_RUN; then
  echo "🏜️  DRY RUN — showing what would be published:"
  npm publish --dry-run
  echo ""
  echo "⚠️  Dry run complete. To actually publish, run without --dry-run."
  echo "   Undoing version bump..."
  git reset --soft HEAD~1
  git tag -d "v${NEW_VERSION}" 2>/dev/null || true
  git checkout package.json package-lock.json
else
  echo "🚀 Publishing @banoffee/ui@${NEW_VERSION}..."
  npm publish --access public
  echo ""
  echo "📤 Pushing to remote..."
  git push
  git push --tags
  echo ""
  echo "╔══════════════════════════════════════╗"
  echo "║  ✅ Published @banoffee/ui@${NEW_VERSION}   ║"
  echo "╚══════════════════════════════════════╝"
fi

echo ""
echo "Done!"
