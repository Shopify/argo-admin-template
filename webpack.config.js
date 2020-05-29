const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {WebWorkerPlugin} = require('@shopify/web-worker/webpack');
const Dotenv = require('dotenv-webpack');
const isDevelopment = process.env.NODE_ENV !== 'production';

const ignore = [
  /[\/\\]core-js/,
  /@babel[\/\\]runtime/,
];

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  target: 'webworker',
  output: {
    globalObject: 'self',
    filename: '[name].js',
    path: __dirname + '/build',
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    hot: false,
    inline: false,
    port: 39351,
    historyApiFallback: {
      rewrites: [
        {
          from: /./,
          to: '/index.html',
        },
      ],
    },
  },
  devtool: false,
  resolve: {
    extensions: ['.tsx', '.ts', 'jsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.[j|t]s(x?)$/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              '@babel/preset-react',
              "@babel/preset-typescript",
              [
                "@babel/preset-env",
                {
                  modules: 'commonjs',
                  targets: {
                    browsers: [
                      'last 1 chrome version',
                      'last 1 firefox version',
                      'last 1 safari version',
                    ],
                  },
                },
              ],
            ],
            plugins: [
              "@babel/plugin-transform-runtime",
              "@babel/plugin-proposal-class-properties",
            ],
            sourceType: 'unambiguous',
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(graphql|gql)$/,
        // exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ],
  },
};
