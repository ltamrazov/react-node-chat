const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const clientPath = path.resolve(__dirname, '..', 'client');

module.exports = {
  entry: {
    main: '../client/src/styles/main.scss'
  },

  output: {
    path: path.join(clientPath, 'dist'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['src', 'node_modules']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
        })
      }
    ]
  },

  context: clientPath,

  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'Tether': 'tether'
    }),

    new CopyWebpackPlugin(
      [
        {
          from: './src/images/',
          to: 'images/'
        }
      ],
      {
        copyUnmodified: true
      }
    ),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),

    new HTMLWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
