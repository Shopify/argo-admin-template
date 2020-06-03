import webpack from 'webpack';
import path from 'path';
import {createWebpackConfiguration} from './webpackConfig';

interface BuildConfig {
  entry: string;
}

export async function build({entry}: BuildConfig) {
  const staticCompiler = webpack(
    createWebpackConfiguration({
      mode: 'production',
      target: 'webworker',
      entry: path.resolve(entry),
      output: {
        globalObject: 'self',
        filename: 'main.js',
        path: path.resolve('.', 'build'),
        publicPath: '/build/',
      },
      plugins: [
        new webpack.ProvidePlugin({
          React: 'react',
        }),
      ],
      devtool: false,
    })
  );
  staticCompiler.run((err) => {
    if (err) {
      console.error('Error compiling', err);
    }
  });
}
