#!/usr/bin/env bash
# 把 theme/ 同步到 shopify 分支(Shopify GitHub 连接读的是那个分支的根目录)。
# Shopify 会把 Customize 里的设置改动 commit 回 shopify 分支,所以先合并再推,不覆盖。
# 预览主题: scripts/sync-theme.sh shopify-preview
set -euo pipefail
cd "$(dirname "$0")/.."
target="${1:-shopify}"
case "$target" in shopify|shopify-preview) ;; *) echo "目标只能是 shopify 或 shopify-preview" >&2; exit 1;; esac
git fetch origin "$target"
git branch -D _split 2>/dev/null || true
git subtree split --prefix=theme -b _split >/dev/null
if ! git merge-base --is-ancestor "origin/$target" _split 2>/dev/null; then
  echo "→ $target 分支有 Shopify 写回的改动,先合并"
  git checkout _split -q
  git merge "origin/$target" --no-edit -m "Merge theme settings written back by Shopify"
  git checkout - -q
fi
git push origin "_split:$target"
git branch -D _split
echo "✓ 已推送到 $target 分支"
