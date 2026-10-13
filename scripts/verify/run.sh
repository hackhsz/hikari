#!/usr/bin/env bash
# The verification loop. Run it after any change to theme/, before pushing:
#   bash scripts/verify/run.sh
#
#   1   Theme Check, Shopify's own linter                     always
#   2a  Liquid: our templates rendered against sample data    always
#   2b  Browser: the bag script, and house page screenshots   always
#   3   Deploy theme/ to the verification theme               with HIKARI_STORE, SHOPIFY_CLI_THEME_TOKEN, HIKARI_THEME_ID
#   4   Store: Playwright against that theme                  with HIKARI_STORE
#
# Each step must pass before the next runs. Screenshots land in scripts/verify/out/.
set -uo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
repo="$(cd "$here/../.." && pwd)"
cd "$here"
[ -d node_modules ] || npm ci --no-audit --no-fund

results=()
summary() { echo; echo "━━ Summary"; printf '  %s\n' "${results[@]}"; }
step() {
  local name=$1; shift
  echo; echo "━━ $name"
  if "$@"; then results+=("✓ $name"); else results+=("✗ $name"); summary; exit 1; fi
}

step "1  Theme Check" npx --yes @shopify/cli@4.9.3 theme check --path "$repo/theme" --fail-level error --no-color
step "2a Liquid" node local/liquid.mjs
step "2b Browser" node local/browser.mjs

if [ -n "${HIKARI_STORE:-}" ] && [ -n "${SHOPIFY_CLI_THEME_TOKEN:-}" ] && [ -n "${HIKARI_THEME_ID:-}" ]; then
  step "3  Deploy to the verification theme" bash store/deploy.sh
else
  results+=("– 3  Deploy: skipped, needs HIKARI_STORE, SHOPIFY_CLI_THEME_TOKEN and HIKARI_THEME_ID")
fi

if [ -n "${HIKARI_STORE:-}" ]; then
  step "4  Store" npx playwright test --config store/playwright.config.mjs
else
  results+=("– 4  Store: skipped, needs HIKARI_STORE")
fi

summary
