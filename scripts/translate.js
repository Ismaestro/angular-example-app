const translate = require('./translate-utility');
const fs = require('fs');

const basePath = 'src/assets/i18n/';
const defaultLanguage = 'en';

fs.readdirSync(basePath).forEach((lang) => {
  lang = lang.replace(/\.[^/.]+$/, ''); // Remove extension

  translate.translateJsonFile(basePath, lang, defaultLanguage).then(() => {
    console.log('Translation for ' + lang + ' language done!');
  });
});
