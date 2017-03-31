const BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  ExtractCSS = new ExtractTextPlugin("css/[name].css");

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
    host: '0.0.0.0'
  },

  plugins: [
    ExtractCSS


  ]
};
