// Interfaces
import {
  Configuration,
} from 'webpack';

// Webpack packages
import {
  DefinePlugin,
  LoaderOptionsPlugin,
} from 'webpack';
import * as webpackMerge from 'webpack-merge';

// Custom imports
import {
  root,
  delay,
  hasProcessFlag,
  isWebpackDevServer,
 } from './helpers';

import commonConfig from './webpack.common'; // the settings that are common to prod and dev

// import { DllBundlesPlugin } from 'webpack-dll-bundles-plugin';

// const webpackMergeTest = webpackMerge.strategy({ 'module.rules': 'replace' });

const webpackMergeDll = webpackMerge.strategy({plugins: 'replace'});

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';
const HMR = hasProcessFlag('hot');

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
export default (options): Configuration => {
  return webpackMerge(commonConfig({env: ENV}), {

    entry: {
      test: './src/server.ts',
      // test: './src/server.spec.ts',
    },

    /**
     * Developer tool to enhance debugging
     *
     * See: http://webpack.github.io/docs/configuration.html#devtool
     * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
     */
    devtool: 'inline-source-map',

    /**
     * Options affecting the output of the compilation.
     *
     * See: http://webpack.github.io/docs/configuration.html#output
     */
    output: {

      /**
       * The output directory as absolute path (required).
       *
       * See: http://webpack.github.io/docs/configuration.html#output-path
       */
      path: root('dist'),

      /**
       * Specifies the name of each output file on disk.
       * IMPORTANT: You must not specify an absolute path here!
       *
       * See: http://webpack.github.io/docs/configuration.html#output-filename
       */
      filename: '[name].bundle.js',

      /**
       * The filename of the SourceMaps for the JavaScript files.
       * They are inside the output.path directory.
       *
       * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
       */
      sourceMapFilename: '[file].map',

      /** The filename of non-entry chunks as relative path
       * inside the output.path directory.
       *
       * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
       */
      chunkFilename: '[id].chunk.js',

      // library: 'ac_[name]',
      // libraryTarget: 'var',
    },

    module: {

      rules: [
        {
          enforce: 'post',
          test: /\.(js|ts)$/,
          use: {
            loader: 'istanbul-instrumenter-loader',
            query: {
              embedSource: true,
              noAutoWrap: true,
            },
          },
          exclude: [
            /\.(spec|e2e)\.ts$/,
            /node_modules/,
          ]
        },
      ]

    },

    plugins: [
      /**
       * Plugin LoaderOptionsPlugin (experimental)
       *
       * See: https://gist.github.com/sokra/27b24881210b56bbaff7
       */
      new LoaderOptionsPlugin({
        debug: true,
        options: {

        }
      }),

      // new DllBundlesPlugin({
      //   bundles: {
      //     polyfills: [
      //       'core-js',
      //       {
      //         name: 'zone.js',
      //         path: 'zone.js/dist/zone.js'
      //       },
      //       {
      //         name: 'zone.js',
      //         path: 'zone.js/dist/long-stack-trace-zone.js'
      //       },
      //       'ts-helpers',
      //     ],
      //     vendor: [
      //       'rxjs',
      //     ]
      //   },
      //   dllDir: helpers.root('dll'),
      //   webpackConfig: webpackMergeDll(commonConfig({env: ENV}), {
      //     devtool: 'cheap-module-source-map',
      //     plugins: []
      //   })
      // }),

      /**
       * Plugin: NamedModulesPlugin (experimental)
       * Description: Uses file names as module name.
       *
       * See: https://github.com/webpack/webpack/commit/a04ffb928365b19feb75087c63f13cadfc08e1eb
       */
      // new NamedModulesPlugin(),

      new DefinePlugin({
        'ENV': JSON.stringify(ENV),
        HMR,
        'process.env.ENV': JSON.stringify(ENV),
        'process.env.NODE_ENV': JSON.stringify(ENV),
      }),

    ],

  });
};
