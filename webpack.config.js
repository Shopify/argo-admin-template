const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {WebWorkerPlugin} = require('@shopify/web-worker/webpack');
const Dotenv = require('dotenv-webpack');
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: 'production',
  entry: isDevelopment ? './host/index.tsx' : './src/index.tsx',
  target: isDevelopment ? 'web' : 'webworker',
  output: {
    globalObject: 'self',
    filename: '[name].js',
    path: __dirname + '/build',
  },
  plugins: isDevelopment
    ? [new WebWorkerPlugin(), new HtmlWebpackPlugin(), new Dotenv()]
    : [
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
  devtool: isDevelopment ? 'source-map' : false,
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
              [
                "@babel/preset-env",
                {
                  modules: 'commonjs',
                  targets: {
                    browsers: [
                      "iOS >= 7"
                    ],
                  },
                  useBuiltIns: "usage",
                  corejs: '3',
                  forceAllTransforms: true,
                },
              ],
              '@babel/preset-react',
              "@babel/preset-typescript",
            ],
            plugins: [
              '@babel/transform-runtime',
              "@babel/plugin-proposal-class-properties",
              require.resolve('@shopify/web-worker/babel'),
            ],
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
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ],
  },
};
