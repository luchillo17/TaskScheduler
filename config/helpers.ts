/**
 * @author: @AngularClass
 */
import * as path from 'path';

const EVENT = process.env.npm_lifecycle_event || '';

// Helper functions
let ROOT = path.resolve(__dirname, '..');

export function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

export function hasNpmFlag(flag) {
  return EVENT.includes(flag);
}

export function isWebpackDevServer() {
  return process.argv[1] && !! (/webpack-dev-server/.exec(process.argv[1]));
}

export function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export let root = path.join.bind(path, ROOT);
