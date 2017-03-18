/**
 * @author: @AngularClass
 */

let path: string;
let env: string;

// Look in ./config folder for webpack.dev.js
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    [path, env] = ['./config/webpack.prod', 'production'];
    break;
  case 'test':
  case 'testing':
    [path, env] = ['./config/webpack.test', 'test'];
    break;
  case 'elec':
  case 'electron':
    [path, env] = ['./config/webpack.electron', 'test'];
    break;
  case 'dev':
  case 'development':
  default:
    [path, env] = ['./config/webpack.dev', 'development'];
}

// tslint:disable-next-line:no-var-requires
module.exports = require(path)({ env });
