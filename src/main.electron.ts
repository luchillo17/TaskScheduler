import { app, Tray, BrowserWindow } from 'electron';
import path = require('path')

// tslint:disable
require('electron-debug')(); // global-require
const p = path.join(__dirname, '..', 'node_modules');
require('module').globalPaths.push(p);
// tslint:enable

if (process.env.NODE_ENV === 'production') {
  // tslint:disable-next-line
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

export class Main {
  private static tray: Electron.Tray;
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

      const iconPath = path.resolve(__dirname, 'TaskScheduleIcon.png')

      Main.browserWindow = new BrowserWindow({
        show: false,
        width: 1024,
        height: 728,
        icon: iconPath,
      });

      Main.browserWindow.loadURL(mainBrowserUrl)

      Main.browserWindow.webContents.on('did-finish-load', Main.onWindowDidFinishLoad)
      Main.browserWindow.on('minimize', Main.onMinimized)
      Main.browserWindow.on('closed', Main.onWindowClosed)

      this.tray = new Tray(iconPath)
      this.tray.setToolTip('TaskScheduler, double click to show')

      if (process.platform === 'linux') {
        this.tray.on('click', Main.onTrayClick)
      } else {
        this.tray.on('double-click', Main.onTrayClick)
      }
    } catch (error) {
      console.error('OnReady error: ', error);
    }
  }

  private static onTrayClick(event: Event) {
    Main.browserWindow.show()
  }

  private static onWindowAllClosed() {
    if (process.platform !== 'darwin')
      Main.application.quit()
  }

  private static onMinimized(event: Event) {
    event.preventDefault()
    Main.browserWindow.hide()
  }

  private static onWindowDidFinishLoad() {
    if (!Main.browserWindow) {
      throw new Error('"browserWindow" is not defined');
    }
    if (process.env.NODE_ENV === 'development') {
      Main.browserWindow.show();
    }
    Main.browserWindow.focus();
  }

  private static onWindowClosed() {
    Main.application.quit()
  }

  private static async installExtensions() {
    if (process.env.NODE_ENV === 'development') {

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
