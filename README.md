# Electron-webpack

This repo is a base project which facilitates the start of development of an electron app with webpack.

## Quick start

Just edit the files in `src` and run in terminal:

```sh
npm start
```

It will create the `main.js` file for the main Electron process, start the `webpack-dev-server` and start the Electron app using the `main.js` file.

## Todo

* [X] ~~*Add base Angular 2 project and config.*~~
* [X] ~~*Add HMR for Angular 2.*~~
* [X] ~~*Add `@ngrx/store`.*~~
* [X] ~~*Add `Redux-DevTools` to Electron for debugging Redux state and history.*~~
* [X] ~~*Set persistence for store state, use observable to sync with localStore, and `beforeunload` event for window close or reloads.*~~
* [ ] Use `localForage` instead of `localStorage` for better compatibility and fallback support.
* [ ] Add support for `primeng` widgets.
* [ ] Add support for `@angular/material` widgets.
* [ ] Add support for `AgGrid` community version (maybe).
