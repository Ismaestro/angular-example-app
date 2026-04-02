export default {
  '*.{ts,html}': ['eslint --fix'],
  '*.{ts,js,mjs,json,html,css,scss,md,mdx}': ['prettier --write'],
  '*.{css,scss}': ['stylelint --fix'],
};
