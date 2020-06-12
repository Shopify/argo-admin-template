const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {WebWorkerPlugin} = require('@shopify/web-worker/webpack');
const Dotenv = require('dotenv-webpack');
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: isDevelopment ? './host/index.tsx' : './src/index.<% FileExtension %>',
  target: isDevelopment ? 'web' : 'webworker',
  stats: 'minimal',
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
              '@babel/preset-react',
              '@babel/preset-typescript',
              [
                '@babel/preset-env',
                {
                  modules: false,
                  targets: {
                    browsers: [
                      'last 2 chrome version',
                      'last 2 firefox version',
                      'last 2 safari version',
                      'last 2 edge version',
                    ],
                  },
                  forceAllTransforms: true,
                },
              ],
            ],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  regenerator: true,
                  useESModules: true,
                },
              ],
              '@babel/plugin-proposal-numeric-separator',
              '@babel/plugin-proposal-optional-chaining',
              '@babel/plugin-proposal-nullish-coalescing-operator',
              ['@babel/plugin-proposal-class-properties', {loose: true}],
              require.resolve('@shopify/web-worker/babel'),
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
    ],
  },
};
