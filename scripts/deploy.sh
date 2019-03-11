#!/usr/bin/env bash

rm -Rf public &&
mkdir public &&
cp -a functions/dist/browser/. public/ &&
mv public/assets/common/* public/ &&
rm -Rf public/es/assets/common &&
mv public/index.html public/app.html &&
firebase deploy
