#!/usr/bin/env bash
# Step 3: push theme/ to the verification theme on the store, so step 4 tests this commit.
#
# Never the live theme: the Shopify CLI refuses a live push without --allow-live, and this
# script never passes it. Never a GitHub-connected theme either (live, or shopify-preview):
# Shopify would commit the push back to that branch. Use a theme that exists only for this.
#
# First run, with no HIKARI_THEME_ID: creates the unpublished theme "Hikari · verify" and
# prints its id. Store that id as HIKARI_THEME_ID.
set -euo pipefail
repo="$(cd "$(dirname "$0")/../../.." && pwd)"
CLI=(npx --yes @shopify/cli@4.9.3)
: "${HIKARI_STORE:?Set HIKARI_STORE, e.g. hikari-dev.myshopify.com}"
: "${SHOPIFY_CLI_THEME_TOKEN:?Set SHOPIFY_CLI_THEME_TOKEN to a Theme Access password}"

if [ -z "${HIKARI_THEME_ID:-}" ]; then
  echo "No HIKARI_THEME_ID: creating the unpublished theme 'Hikari · verify'."
  "${CLI[@]}" theme push --path "$repo/theme" --store "$HIKARI_STORE" \
    --unpublished --theme "Hikari · verify" --json --no-input --no-color
  echo "Store the id above as HIKARI_THEME_ID, so every later run reuses this theme."
  exit 0
fi

"${CLI[@]}" theme push --path "$repo/theme" --store "$HIKARI_STORE" \
  --theme "$HIKARI_THEME_ID" --strict --no-input --no-color
