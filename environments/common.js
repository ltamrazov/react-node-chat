const webpack = require('webpack'),
  path = require('path'),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    vendor: [
      'jquery',
      'tether',
      'bootstrap',
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'redux-form',
      'redux-thunk',
      'socket.io-client'
    ]
  },

  output: {
    path: path.join(__dirname, '..', 'client/dist')
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },

  context: path.join(__dirname, '..', 'client'),

  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'Tether': 'tether'
    }),

    new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),

    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),

    new HTMLWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
