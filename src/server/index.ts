import webpack from 'webpack';
import path from 'path';
import WebpackDevServer from 'webpack-dev-server';
import {createWebpackConfiguration} from '../webpackConfig';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const {WebWorkerPlugin} = require('@shopify/web-worker/webpack');

interface ServerConfig {
  port: number;
  entry: string;
  type: string;
}

export async function server({port, entry, type}: ServerConfig) {
  const url = `http://localhost:${port}`;

  const staticCompiler = webpack(
    createWebpackConfiguration({
      mode: 'development',
      target: 'webworker',
      entry: path.resolve(entry),
      output: {
        globalObject: 'self',
        filename: 'third-party-script.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build/',
      },
      devtool: 'source-map',
    })
  );
  staticCompiler.watch({}, (err) => {
    if (err) {
      console.error('Error compiling', err);
    }
  });

  const serverCompiler = webpack([
    createWebpackConfiguration({
      mode: 'development',
      target: 'web',
      entry: {
        main: path.resolve(__dirname, './host/index'),
      },
      output: {
        globalObject: 'self',
        filename: '[name].js',
        path: __dirname + '/build',
        publicPath: `${url}/`,
      },
      plugins: [
        new WebWorkerPlugin(),
        new HtmlWebpackPlugin(),
        new webpack.DefinePlugin({
          THIRD_PARTY_SCRIPT: `"${url}/build/third-party-script.js"`,
          EXTENSION_POINT: `"${type}"`,
        }),
      ],
      devtool: false,
    }),
  ]);

  const serverConfig = {
    disableHostCheck: true,
    host: '0.0.0.0',
    hot: false,
    inline: false,
    port,
    historyApiFallback: {
      rewrites: [
        {
          from: /./,
          to: '/index.html',
        },
      ],
    },
    contentBase: path.resolve(__dirname),
  };

  const server = new WebpackDevServer(serverCompiler, serverConfig);

  server.listen(port, 'localhost', (err) => {
    if (err) {
      console.log('err', err);
    }
    console.log(`listening on ${url}`);
  });
}
