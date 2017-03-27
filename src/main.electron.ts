// @flow
import { app, BrowserWindow } from 'electron';

if (process.env.NODE_ENV === 'production') {
  // tslint:disable-next-line
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development') {
  // tslint:disable
  require('electron-debug')(); // global-require
  const path = require('path');
  const p = path.join(__dirname, '..', 'node_modules');
  require('module').globalPaths.push(p);
  // tslint:enable
}

export class Main {
  private static application: Electron.App;
  private static browserWindow: Electron.BrowserWindow;

  public static init() {
    try {
      Main.application = app;
      Main.application.on('window-all-closed', Main.onWindowAllClosed);
      Main.application.on('ready', Main.onAppReady);
    } catch (error) {
      console.error('Main error: ', error);
    }
  }

  private static async onAppReady() {
    try {
      await Main.installExtensions();

      Main.browserWindow = new BrowserWindow({
        show: false,
        width: 1024,
        height: 728
      });

      Main.browserWindow.loadURL(mainBrowserUrl);

      Main.browserWindow.webContents.on('did-finish-load', Main.onWindowDidFinishLoad);
      Main.browserWindow.on('closed', Main.onWindowClosed);
    } catch (error) {
      console.error('OnReady error: ', error);
    }
  }

  private static onWindowAllClosed() {
    if (process.platform !== 'darwin')
      Main.application.quit();
  }

  private static onWindowDidFinishLoad() {
    if (!Main.browserWindow) {
      throw new Error('"browserWindow" is not defined');
    }
    Main.browserWindow.show();
    Main.browserWindow.focus();
  }

  private static onWindowClosed() {
    Main.browserWindow = null;
  }

  private static async installExtensions() {
    if (process.env.NODE_ENV === 'development') {
      try {

      } catch (error) {

      }
      // tslint:disable-next-line global-require
      const installer = require('electron-devtools-installer');

      const supportedExtensions = [
        'REDUX_DEVTOOLS',
      ];

      const chromeExtensionsById = [
        'elgalmkoelokbchhkhacckoklkejnhcd',
      ]

      const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

      // TODO: Use async iteration statement.
      //       Waiting on https://github.com/tc39/proposal-async-iteration
      //       Promises will fail silently, which isn't what we want in development
      return Promise
        .all([
          ...supportedExtensions.map((name) => installer.default(installer[name], forceDownload)),
          ...chromeExtensionsById.map((id) => installer.default(id, forceDownload))
        ])
        .catch(console.log);
    }
  }
}

Main.init();

export default Main;
