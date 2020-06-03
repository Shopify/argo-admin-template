export function createWebpackConfiguration(config: any): any {
  return {
    ...config,
    stats: 'minimal',
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
}
