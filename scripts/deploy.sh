#!/usr/bin/env bash

npm run build:prod &&
rm -Rf public &&
mkdir public &&
cp -a dist/. public/ &&
firebase deploy
