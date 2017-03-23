// Interfaces
import {
  Configuration,
} from 'webpack';

// Webpack packages
import {
  HotModuleReplacementPlugin,
  LoaderOptionsPlugin,
  DefinePlugin,
} from 'webpack';

// Plugins
import { CheckerPlugin } from 'awesome-typescript-loader';
import * as WebpackBuildNotifier from 'webpack-build-notifier';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

// Custom imports
import {
  root,
  delay,
  hasProcessFlag,
  isWebpackDevServer,
 } from './helpers';

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';
const HMR = hasProcessFlag('hot');
const METADATA = {
  title: 'Electron webpack',
  // baseUrl: './',
  isDevServer: isWebpackDevServer()
};

// App Configuration ------------------------------------
export let config = (options): Configuration => {
  return {
    entry: {
      main: './src/main.browser.ts',
    },
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      modules: [root('src'), root('node_modules')]
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'awesome-typescript-loader',
              options: {
                configFileName: options.env === 'test' ? 'tsconfig.webpack.json' : 'tsconfig.webpack.json'
              },
            },
          ],
          exclude: [/\.(spec|e2e)\.ts$/],
        },
        {
          test: /\.json$/,
          use: 'json-loader',
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: 'file-loader'
        },
      ],
    },
    plugins: [
      new CheckerPlugin(),
      new LoaderOptionsPlugin({
        options: {
          context: root('src'),
          output: {
            path: root('dist'),
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        metadata: METADATA,
        chunksSortMode: 'dependency',
      }),
      new WebpackBuildNotifier({
        title: 'Electron Renderer',
        // logo: 'public/dist/img/favicon.ico',
      }),
    ],
    target: 'electron-renderer',
    node: {
      __dirname: false,
      __filename: false,
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false,
    },
  };
};

export default config;
