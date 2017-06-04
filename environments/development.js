// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractCSS = new ExtractTextPlugin('css/[name].css');

module.exports = {
  entry: {
    bundle: [
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
    headers: {'Access-Control-Allow-Origin': '*'},
    host: 'localhost'
  },

  plugins: [
    ExtractCSS
  ]
};
