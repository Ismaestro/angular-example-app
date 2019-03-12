#!/usr/bin/env bash

rm -Rf public &&
mkdir public &&
cp -a dist/browser/. public/ &&
mv public/assets/common/* public/ &&
rm -Rf public/es/assets/common &&
mv public/index.html public/app.html &&
cp -a dist/ functions/dist &&
firebase deploy
