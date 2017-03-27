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
import { AotPlugin } from '@ngtools/webpack';
import { CheckerPlugin } from 'awesome-typescript-loader';
import * as WebpackBuildNotifier from 'webpack-build-notifier';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import * as CommonsChunkPlugin from 'webpack/lib/optimize/CommonsChunkPlugin';
import * as NormalModuleReplacementPlugin from 'webpack/lib/NormalModuleReplacementPlugin';

// Custom imports
import {
  root,
  delay,
  hasNpmFlag,
  hasProcessFlag,
  isWebpackDevServer,
 } from './helpers';

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';
const HMR = hasProcessFlag('hot');
const AOT = hasNpmFlag('aot');

const METADATA = {
  title: 'Electron webpack',
  // baseUrl: './',
  isDevServer: isWebpackDevServer()
};

// App Configuration ------------------------------------
export let config = (options): Configuration => {
  let isProd = options.env === 'production';
  return {
    entry: {
      polyfills: './src/polyfills.browser.ts',
      main: './src/main.browser.ts'
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
              loader: '@angularclass/hmr-loader',
              options: {
                pretty: !isProd,
                prod: isProd
              }
            },
            '@ngtools/webpack',
          ],
          exclude: [/\.(spec|e2e)\.ts$/],
        },
        {
          test: /\.css$/,
          use: ['to-string-loader', 'css-loader'],
          exclude: [root('src', 'styles')]
        },
        {
          test: /\.scss$/,
          use: ['to-string-loader', 'css-loader', 'sass-loader'],
          exclude: [root('src', 'styles')]
        },
        {
          test: /\.json$/,
          use: 'json-loader',
        },
        {
          test: /\.html$/,
          use: 'raw-loader',
          exclude: [root('src/index.html')]
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: 'file-loader'
        },
        {
          test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
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
      new CommonsChunkPlugin({
        name: 'polyfills',
        chunks: ['polyfills']
      }),
      // This enables tree shaking of the vendor modules
      new CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['main'],
        minChunks: module => /node_modules/.test(module.resource)
      }),
      // Specify the correct order the scripts will be injected in
      new CommonsChunkPlugin({
        name: ['polyfills', 'vendor'].reverse()
      }),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        title: METADATA.title,
        metadata: METADATA,
        chunksSortMode: 'dependency',
      }),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer'
      }),
      // Fix Angular 2
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)async/,
        root('node_modules/@angular/core/src/facade/async.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)collection/,
        root('node_modules/@angular/core/src/facade/collection.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)errors/,
        root('node_modules/@angular/core/src/facade/errors.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)lang/,
        root('node_modules/@angular/core/src/facade/lang.js')
      ),
      new NormalModuleReplacementPlugin(
        /facade(\\|\/)math/,
        root('node_modules/@angular/core/src/facade/math.js')
      ),
      new AotPlugin({
        mainPath: root('src', 'main.browser.ts'),
        tsConfigPath: "tsconfig.json",
        skipCodeGeneration: !AOT,
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
