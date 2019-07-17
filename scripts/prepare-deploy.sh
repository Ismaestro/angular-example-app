#!/usr/bin/env bash

rm -Rf public &&
mkdir public &&
cp -a dist/browser/. public/ &&
mv public/index.html public/index2.html &&
mv public/es/index.html public/es/index2.html &&
cp -a dist/ functions/dist
cd functions
npm i
cd ../
