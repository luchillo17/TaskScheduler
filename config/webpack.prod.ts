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
import * as IgnorePlugin from 'webpack/lib/IgnorePlugin';
import * as ProvidePlugin from 'webpack/lib/ProvidePlugin';
import * as UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';
import * as OptimizeJsPlugin from 'optimize-js-plugin';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
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

/**
 * Webpack Plugins
 */

/**
 * Webpack Constants
 */
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const HMR = hasProcessFlag('hot');
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;

export const config = (env): Configuration => {
  return webpackMerge(commonConfig({ env: ENV }), {
    devtool: 'source-map',
    output: {
      path: root('dist'),
      filename: '[name].bundle.js',
      sourceMapFilename: '[name].map',
      chunkFilename: '[id].chunk.js',
      publicPath: 'dist/'
      // filename: '[name].[chunkhash].bundle.js',
      // sourceMapFilename: '[name].[chunkhash].bundle.map',
      // chunkFilename: '[id].[chunkhash].chunk.js',
    },

    module: {

      rules: [

        /*
         * Extract CSS files from .src/styles directory to external CSS file
         */
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          }),
          include: [root('src', 'styles')]
        },

        /*
         * Extract and compile SCSS files from .src/styles directory to external CSS file
         */
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
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
            ]
          }),
          include: [root('src', 'styles')]
        },

      ]

    },
    plugins: [
      new OptimizeJsPlugin({
        sourceMap: false
      }),
      new ExtractTextPlugin('[name].[contenthash].css'),
      new DefinePlugin({
        HMR,
        IS_NODE: process.env.START_BROWSER ? true : false,
        'ENV': JSON.stringify(ENV),
        'process.env.ENV': JSON.stringify(ENV),
        'process.env.NODE_ENV': JSON.stringify(ENV),
        'process.env.HMR': HMR,
      }),
      new UglifyJsPlugin({
        // beautify: true, //debug
        // mangle: false, //debug
        // unused: false, //debug
        // deadCode: false, //debug
        // compress: {
        //   screw_ie8: true,
        //   keep_fnames: true,
        //   drop_debugger: false,
        //   dead_code: false,
        //   unused: false
        // }, // debug
        // comments: true, //debug

        beautify: false, // prod
        output: {
          comments: false
        }, // prod
        mangle: {
          screw_ie8: true
        }, // prod
        compress: {
          screw_ie8: true,
          warnings: false,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
          negate_iife: false // we need this for lazy v8
        },
      }),

      /**
       * Plugin: NormalModuleReplacementPlugin
       * Description: Replace resources that matches resourceRegExp with newResource
       *
       * See: http://webpack.github.io/docs/list-of-plugins.html#normalmodulereplacementplugin
       */

      new NormalModuleReplacementPlugin(
        /angular2-hmr/,
        root('config/empty.js')
      ),

      new NormalModuleReplacementPlugin(
        /zone\.js(\\|\/)dist(\\|\/)long-stack-trace-zone/,
        root('config/empty.js')
      ),

      // AoT
      // new NormalModuleReplacementPlugin(
      //   /@angular(\\|\/)upgrade/,
      //   root('config/empty.js')
      // ),
      // new NormalModuleReplacementPlugin(
      //   /@angular(\\|\/)compiler/,
      //   root('config/empty.js')
      // ),
      // new NormalModuleReplacementPlugin(
      //   /@angular(\\|\/)platform-browser-dynamic/,
      //   root('config/empty.js')
      // ),
      // new NormalModuleReplacementPlugin(
      //   /dom(\\|\/)debug(\\|\/)ng_probe/,
      //   root('config/empty.js')
      // ),
      // new NormalModuleReplacementPlugin(
      //   /dom(\\|\/)debug(\\|\/)by/,
      //   root('config/empty.js')
      // ),
      // new NormalModuleReplacementPlugin(
      //   /src(\\|\/)debug(\\|\/)debug_node/,
      //   root('config/empty.js')
      // ),
      // new NormalModuleReplacementPlugin(
      //   /src(\\|\/)debug(\\|\/)debug_renderer/,
      //   root('config/empty.js')
      // ),

      /**
       * Plugin: CompressionPlugin
       * Description: Prepares compressed versions of assets to serve
       * them with Content-Encoding
       *
       * See: https://github.com/webpack/compression-webpack-plugin
       */
      //  install compression-webpack-plugin
      // new CompressionPlugin({
      //   regExp: /\.css$|\.html$|\.js$|\.map$/,
      //   threshold: 2 * 1024
      // })

      /**
       * Plugin LoaderOptionsPlugin (experimental)
       *
       * See: https://gist.github.com/sokra/27b24881210b56bbaff7
       */
      new LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        options: {

          /**
           * Html loader advanced options
           *
           * See: https://github.com/webpack/html-loader#advanced-options
           */
          // TODO: Need to workaround Angular 2's html syntax => #id [bind] (event) *ngFor
          htmlLoader: {
            minimize: true,
            removeAttributeQuotes: false,
            caseSensitive: true,
            customAttrSurround: [
              [/#/, /(?:)/],
              [/\*/, /(?:)/],
              [/\[?\(?/, /(?:)/]
            ],
            customAttrAssign: [/\)?\]?=/]
          },

        }
      }),

      /**
       * Plugin: BundleAnalyzerPlugin
       * Description: Webpack plugin and CLI utility that represents
       * bundle content as convenient interactive zoomable treemap
       *
       * `npm run build:prod -- --env.analyze` to use
       *
       * See: https://github.com/th0r/webpack-bundle-analyzer
       */

    ],
    target: process.env.START_BROWSER ? 'web' : 'electron-renderer',

    /*
     * Include polyfills or mocks for various node stuff
     * Description: Node configuration
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: {
      global: true,
      crypto: 'empty',
      process: false,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  });
}

export default config
