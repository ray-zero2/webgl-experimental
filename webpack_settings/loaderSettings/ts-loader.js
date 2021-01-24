const path = require('path');

module.exports = (isDev) => ({
  loader: 'ts-loader',
  options: {
    configFile: path.join(__dirname, '../../tsconfig.json'),
    compilerOptions: {
      sourceMap: isDev,
    },
  },
});
