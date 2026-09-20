#!/bin/sh
# Run before publishing: gives styles/scripts a new ?v= so browsers fetch the fresh files instead of a cached copy.
V=$(date +%Y%m%d%H%M)
for f in *.html; do
  sed -i '' -E "s#(styles\.css|projects\.js|script\.js|config\.js)(\?v=[0-9]+)?\"#\1?v=$V\"#g" "$f"
done
echo "version: $V"
