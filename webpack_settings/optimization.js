const TerserPlugin = require('terser-webpack-plugin');

module.exports = (isDev) => ({
  minimize: !isDev,
  minimizer: isDev
    ? []
    : [
        new TerserPlugin({
          terserOptions: {
            compress: { drop_console: true },
            // sourceMap: true,
          },
        }),
      ],
  splitChunks: {
    cacheGroups: {
      commons: {
        test: /node_modules/,
        name: 'vendors',
        chunks: 'all',
        enforce: true,
      },
    },
  },
});
