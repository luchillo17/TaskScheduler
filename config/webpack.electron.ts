// Interfaces
import {
  Configuration,
} from 'webpack';

// Webpack packages
import {
  LoaderOptionsPlugin,
  DefinePlugin,
} from 'webpack';

// Plugins
import { CheckerPlugin } from 'awesome-typescript-loader';
import * as WebpackBuildNotifier from 'webpack-build-notifier';

// Custom imports
import {
  root,
  isWebpackDevServer,
 } from './helpers';

// Electron Configuration --------------------------------
export let config: Configuration = {
  devtool: 'source-map',
  entry: {
    main: './src/main.electron.ts',
  },
  output: {
    path: root('dist'),
    filename: '[name].js'
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
            // options: {
            //   configFileName: 'tsconfig.webpack.json',
            // },
          },
        ],
        exclude: [/\.(spec|e2e)\.ts$/],
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      }
    ],
  },
  plugins: [
    new CheckerPlugin(),
    new DefinePlugin({
      mainBrowserUrl: process.env.START_HOT ?
        '`http://localhost:3000/index.html`' :
        '`file://${__dirname}/index.html`',
    }),
    new LoaderOptionsPlugin({}),
    new WebpackBuildNotifier({
      title: 'Electron Main',
      // logo: 'public/dist/img/favicon.ico',
    }),
  ],
  target: 'electron-main',
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

export default config;
