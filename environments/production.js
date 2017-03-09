const webpack = require('webpack');

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
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),
  ],

  devtool: "source-map"
};
