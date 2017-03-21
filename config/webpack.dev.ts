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

// Node imports
import { spawn } from 'child_process';

// Custom imports
import {
  root,
  delay,
  isWebpackDevServer,
 } from './helpers';

const METADATA = {
  title: 'Electron webpack',
  // baseUrl: './',
  isDevServer: isWebpackDevServer()
};

// App Configuration ------------------------------------
export let config: Configuration = {
  devtool: 'source-map',
  entry: {
    'main.browser': './src/main.browser.ts',
  },
  output: {
    path: root('dist'),
    filename: '[name].js',
    publicPath: isWebpackDevServer() ? '/' : './',
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
    new LoaderOptionsPlugin({
      debug: true,
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
  devServer: {
    port: '3000',
    host: 'localhost',
    inline: true,
    historyApiFallback: true,
    contentBase: root('dist'),
    // publicPath: '/',
    async setup() {
      console.log('Start hot: ', process.env.START_HOT);
      if (process.env.START_HOT) {
        await delay(0);
        spawn('npm', ['run', 'start-hot'], {
          shell: true,
          env: process.env,
          stdio: 'inherit',
        })
          .on('close', code => process.exit(code))
          .on('error', spawnError => console.error(spawnError));
      }
    }
  },
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
