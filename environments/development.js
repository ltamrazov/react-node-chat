const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: {
    bundle: [
      'webpack-dev-server/client?http://localhost:8080',
      './src/index.js'
    ]
  },

  output: {
    filename: 'js/[name].js'
  },

  devServer: {
    contentBase: '../client/dist',
    inline: true,
    historyApiFallback: true,
    headers: {'Access-Control-Allow-Origin': '*'}
  },

  plugins: [
    new BrowserSyncPlugin({
      proxy: 'localhost:8080'
    })
  ]
};
