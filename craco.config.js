const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        util: require.resolve('util/'),
        buffer: require.resolve('buffer/'),
        process: require.resolve('process/browser'), // Ensure process polyfill is correctly set
      };

      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          process: 'process/browser', // Define process globally
          Buffer: ['buffer', 'Buffer'], // Define Buffer globally
        })
      );

      return webpackConfig;
    },
  },
};
