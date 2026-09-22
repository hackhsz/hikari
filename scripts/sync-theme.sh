#!/usr/bin/env bash
# 把 theme/ 同步到 shopify 分支(Shopify GitHub 连接读的是那个分支的根目录)。
# Shopify 会把 Customize 里的设置改动 commit 回 shopify 分支,所以先合并再推,不覆盖。
set -euo pipefail
cd "$(dirname "$0")/.."
git fetch origin shopify
git branch -D _split 2>/dev/null || true
git subtree split --prefix=theme -b _split >/dev/null
if ! git merge-base --is-ancestor origin/shopify _split 2>/dev/null; then
  echo "→ shopify 分支有 Shopify 写回的改动,先合并"
  git checkout _split -q
  git merge origin/shopify --no-edit -m "Merge theme settings written back by Shopify"
  git checkout - -q
fi
git push origin _split:shopify
git branch -D _split
echo "✓ 已推送到 shopify 分支"
