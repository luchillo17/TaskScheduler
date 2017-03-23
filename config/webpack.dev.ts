// Interfaces
import {
  Configuration,
} from 'webpack';

// Webpack packages
import {
  // HotModuleReplacementPlugin,
  LoaderOptionsPlugin,
  DefinePlugin,
} from 'webpack';
import * as webpackMerge from 'webpack-merge';

// Plugins

// Node imports
import { spawn } from 'child_process';

// Custom imports
import {
  root,
  delay,
  hasProcessFlag,
  isWebpackDevServer,
 } from './helpers';

import commonConfig from './webpack.common'; // the settings that are common to prod and dev

const METADATA = {
  title: 'Electron webpack',
  // baseUrl: './',
  isDevServer: isWebpackDevServer()
};

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HMR = hasProcessFlag('hot');

// App Configuration ------------------------------------
export let config = (options): Configuration => {
  return webpackMerge(commonConfig({ env: 'development' }), {
    devtool: 'cheap-module-source-map',
    output: {
      path: root('dist'),
      filename: '[name].bundle.js',
      sourceMapFilename: '[file].map',
      chunkFilename: '[id].chunk.js',
      publicPath: isWebpackDevServer() ? '/' : './',
    },
    // module: {
    //   rules: [
    //   ],
    // },
    plugins: [
      new LoaderOptionsPlugin({
        debug: true,
      }),
      new DefinePlugin({
        'ENV': JSON.stringify(ENV),
        HMR,
        'process.env.ENV': JSON.stringify(ENV),
        'process.env.NODE_ENV': JSON.stringify(ENV),
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
          await delay(3000);
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
  });
};

export default config;
