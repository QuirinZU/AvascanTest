const { JSDOM } = require('jsdom');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/index.js','./src/__test__/App.test.js'],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.ProvidePlugin({
      React: 'react'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  // Configurazione di JSDOM
  globals: {
    window: new JSDOM().window,
    document: new JSDOM().window.document
  },
  // Configurazione dei moduli ES6
  experiments: {
    topLevelAwait: true
  }
};
