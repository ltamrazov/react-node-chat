const webpack = require('webpack'),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  ExtractCSS = new ExtractTextPlugin("css/[name].[chunkhash].css");

module.exports = {
  entry: {
    bundle: [
      './src/index.js'
    ]
  },

  output: {
    filename: 'js/[name].[chunkhash].js'
  },

  plugins: [
    ExtractCSS,

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),
  ],

  devtool: "source-map"
};
