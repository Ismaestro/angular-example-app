#!/usr/bin/env bash

rm -Rf public &&
mkdir public &&
cp -a dist/browser/. public/ &&
mv public/assets/common/* public/ &&
rm -Rf public/assets/common public/es/assets/common &&
mv public/index.html public/index2.html &&
mv public/es/index.html public/es/index2.html &&
cp -a dist/ functions/dist &&
firebase deploy
