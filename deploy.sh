#!/usr/bin/env sh

# Current date
timestamp=$(date +%Y-%m-%d' '%H:%M)

# abort on errors
set -e

# Get rid of CRLF problems
npm run lint -- --fix

# build
npm run build

# navigate into the build output directory
cd dist

# Create 404 same as index for proper vue-routing redirecting.
cp index.html 404.html

git init
git add -A
git commit -m 'deploy at $timestamp'

git push -f https://github.com/Marfullsen/tidy-wallet.git master:gh-pages

cd -