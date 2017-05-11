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
import { DllBundlesPlugin } from 'webpack-dll-bundles-plugin';
import * as AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';
import * as NamedModulesPlugin from 'webpack/lib/NamedModulesPlugin';
import * as NormalModuleReplacementPlugin from 'webpack/lib/NormalModuleReplacementPlugin';

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

const webpackMergeDll = webpackMerge.strategy({plugins: 'replace'});

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
export let config = (options?): Configuration => {
  return webpackMerge(commonConfig({ env: 'development' }), {
    devtool: 'cheap-module-source-map',
    output: {
      path: root('dist'),
      filename: '[name].bundle.js',
      sourceMapFilename: '[file].map',
      chunkFilename: '[id].chunk.js',
      publicPath: isWebpackDevServer() ? '/' : './',
      library: 'ac_[name]',
      libraryTarget: 'var',
    },
    module: {
      rules: [
        /*
         * css loader support for *.css files (styles directory only)
         * Loads external css styles into the DOM, supports HMR
         *
         */
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'resolve-url-loader'],
          include: [root('src', 'styles')]
        },

        /*
         * sass loader support for *.scss files (styles directory only)
         * Loads external sass styles into the DOM, supports HMR
         *
         */
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                root: root('src'),
                sourceMap: true,
                outputStyle: 'expanded',
                includePaths: [
                  root('node_modules'),
                  root('src'),
                ],
              },
            },
          ],
          include: [root('src', 'styles')]
        },
      ],
    },
    plugins: [
      new NormalModuleReplacementPlugin(/(.*)mail-notification\.service(.*)/, (resource) => {
        let mailFileName = `mail-notification${ process.env.START_BROWSER ? '-mock' : '' }.service`
        resource.request = resource.request.replace(/mail-notification\.service/, mailFileName)
      }),
      new LoaderOptionsPlugin({
        debug: true,
      }),
      new DefinePlugin({
        HMR,
        IS_NODE: process.env.START_BROWSER ? true : false,
        'ENV': JSON.stringify(ENV),
        'process.env.ENV': JSON.stringify(ENV),
        'process.env.NODE_ENV': JSON.stringify(ENV),
      }),
      new DllBundlesPlugin({
        bundles: {
          polyfills: [
            'core-js',
            {
              name: 'zone.js',
              path: 'zone.js/dist/zone.js'
            },
            {
              name: 'zone.js',
              path: 'zone.js/dist/long-stack-trace-zone.js'
            },
          ],
          vendor: [
            '@angular/platform-browser',
            '@angular/platform-browser-dynamic',
            '@angular/core',
            '@angular/common',
            '@angular/forms',
            '@angular/http',
            '@angular/router',
            '@angularclass/hmr',
            'rxjs',
          ]
        },
        dllDir: root('dll'),
        webpackConfig: webpackMergeDll(commonConfig({env: ENV}), {
          devtool: 'cheap-module-source-map',
          plugins: []
        })
      }),
      new AddAssetHtmlPlugin([
        { filepath: root(`dll/${DllBundlesPlugin.resolveFile('polyfills')}`) },
        { filepath: root(`dll/${DllBundlesPlugin.resolveFile('vendor')}`) },
      ] as any),
      new NamedModulesPlugin(),
    ],
    target: process.env.START_BROWSER ? 'web' : 'electron-renderer',
    devServer: {
      port: '3000',
      host: 'localhost',
      inline: true,
      historyApiFallback: true,
      contentBase: root('dist'),
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      },
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
