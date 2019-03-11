#!/usr/bin/env bash

rm -Rf public &&
mkdir public &&
cp -a functions/dist/browser/en/CNAME public/
cp -a functions/dist/browser/en/googled41787c6aae2151b.html public/
cp -a functions/dist/browser/en/sitemap.xml public/
cp -a functions/dist/browser/en/favicon.ico public/

cp -a functions/dist/browser/. public/
firebase deploy
