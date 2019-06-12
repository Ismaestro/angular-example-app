'use strict';

const webpack = require('webpack');

module.exports = {
  plugins: [new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /es|en-gb/)]
};
