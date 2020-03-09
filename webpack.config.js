const HtmlWebpackPlugin = require('html-webpack-plugin');
const {WebWorkerPlugin} = require('@shopify/web-worker/webpack');
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: isDevelopment ? './host/index.tsx' : './src/index.tsx',
  output: {
    globalObject: 'self',
    filename: '[name].js',
    path: __dirname + '/build',
  },
  plugins: [new WebWorkerPlugin(), new HtmlWebpackPlugin()],
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
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              [
                'babel-preset-shopify/web',
                {
                  modules: false,
                  typescript: true,
                  browsers: [
                    'last 1 chrome version',
                    'last 1 firefox version',
                    'last 1 safari version',
                  ],
                },
              ],
              'babel-preset-shopify/react',
            ],
            plugins: [
              require.resolve('@shopify/web-worker/babel'),
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
