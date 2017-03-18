// Interfaces
import {
  Configuration,
} from 'webpack';

// Webpack packages
import {
  HotModuleReplacementPlugin,
  LoaderOptionsPlugin,
} from 'webpack';

// Plugins
import { CheckerPlugin } from 'awesome-typescript-loader';
import * as WebpackBuildNotifier from 'webpack-build-notifier';

// Node imports
import { spawn } from 'child_process';

// Custom imports
import {
  root,
 } from './helpers';

export default (options): Configuration[] => {
  return [
    // Electron Configuration --------------------------------
    {
      devtool: 'source-map',
      entry: './src/main.electron.ts',
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
        new LoaderOptionsPlugin({}),
        new WebpackBuildNotifier({
          title: 'Electron webpack',
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
    },

    // App Configuration ------------------------------------
    {
      devtool: 'source-map',
      entry: './src/main.browser.ts',
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
        new LoaderOptionsPlugin({
        debug: true,
        options: {
          context: root('src'),
          output: {
            path: root('dist'),
          },
        },
      }),
        new WebpackBuildNotifier({
          title: 'Electron webpack',
          // logo: 'public/dist/img/favicon.ico',
        }),
      ],
      target: 'electron-render',
      devServer: {
        port: '3000',
        host: 'localhost',
        inline: true,
        historyApiFallback: true,
        contentBase: root('dist'),
        publicPath: '',
        setup() {
          console.log('Start hot: ', process.env.START_HOT);
          if (process.env.START_HOT) {
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
    }
  ];
};
