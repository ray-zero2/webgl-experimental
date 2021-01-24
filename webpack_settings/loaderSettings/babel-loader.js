const TARGET_BROWSERS = require('../targetBrowsers.js');

module.exports = (isDev) => ({
  loader: 'babel-loader',
  options: {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          targets: TARGET_BROWSERS,
          useBuiltIns: 'usage',
          corejs: 3,
        },
      ],
    ],
  },
});
