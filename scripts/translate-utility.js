'use strict';

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const deepmerge = require('deepmerge');

const translateText = (text, sourceLang, targetLang) => {
  if (!text) return Promise.resolve('');

  const url = "https://translate.googleapis.com/translate_a/single";
  const params = {
    client: 'gtx',
    dt: 't',
    sl: sourceLang,
    tl: targetLang,
    q: text
  };

  const headers = {
    'Content-Type': 'application/json'
  };

  return axios.get(url, {params, headers}).then(response => response.data[0][0][0]).catch(error => {
    console.error(error);
    return Promise.resolve('');
  });
};

const translateJson = (json, sourceLang, targetLang, translations, level = 0) => {
  if (level > 10) return Promise.resolve(json);

  translations = translations || clone(json);
  const promises = [];

  Object.entries(json).forEach(([key, value]) => {
    let promise;

    if (typeof value === 'string') {
      promise = translateText(value, sourceLang, targetLang);
      promise.then(translation => {
        translations[key] = translation;
      });

    } else if (typeof value === 'object') {
      promise = translateJson(value, sourceLang, targetLang, translations[key], level++);

    } else {
      promise = Promise.resolve(value);
    }

    promises.push(promise)
  });

  return Promise.all(promises).then(() => translations);
};

const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const readJsonFile = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const getDiffJson = (json1, json2) => {
  const diffJson = {};

  Object.entries(json2).forEach(([key, value]) => {
    if (value === '') {
      diffJson[key] = json1[key];
    } else if (typeof value === 'object') {
      const extractedJson = getDiffJson(json1[key], value);
      if (!isObjectEmpty(extractedJson)) {
        diffJson[key] = extractedJson;
      }
    } else {
      return diffJson;
    }
  });

  return diffJson;
};

const isObjectEmpty = (obj) => {
  return typeof obj === 'object' && Object.keys(obj).length === 0;
};

const translateJsonFile = async (basePath, lang, defaultLanguage) => {
  const fileSrc = basePath + defaultLanguage + '.json';
  const fileTarg = basePath + lang + '.json';

  const jsonSrc = readJsonFile(fileSrc);
  const jsonTarget = readJsonFile(fileTarg);

  const extractedJson = getDiffJson(jsonSrc, jsonTarget);

  const filename = path.basename(fileTarg);
  const filePath = path.dirname(fileSrc);
  const translation = await translateJson(extractedJson, defaultLanguage, lang);

  const newJson = deepmerge(jsonTarget, translation);

  fs.writeFile(path.join(filePath, filename), JSON.stringify(newJson, null, 2), (error) => {
    if (error) {
      console.error('Error during saving ' + filename + ' file: ' + error);
    }
  });
};

module.exports = {
  translateJsonFile
};
