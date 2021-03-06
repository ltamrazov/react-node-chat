const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');

const clientPath = path.resolve(__dirname, '..', 'client');

const components = {
  extensions: ['.js'],
  paths: [
    'src/components',
    'src/components/auth',
    'src/components/message',
    'src/components/navigation',
    'src/templates'
  ]
};

const componentAliases =
  components.paths.reduce((aliases, currentPath) => {
    fs.readdirSync(path.resolve(clientPath, currentPath))
      .map(file =>
        path.resolve(clientPath, currentPath, file)
      )
      .filter(fullPath =>
        components.extensions.includes(path.extname(fullPath))
      )
      .forEach(fullPath => {
        aliases[path.basename(fullPath, path.extname(fullPath))] = fullPath;
      });

    return aliases;
  }, {}
);

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
    ],
    main: '../client/src/styles/main.scss'
  },

  output: {
    path: path.join(clientPath, 'dist'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: componentAliases
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
      names: ['vendor', 'manifest']
    }),

    new HTMLWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
