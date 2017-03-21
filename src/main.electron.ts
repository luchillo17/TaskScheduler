// @flow
import { app, BrowserWindow } from 'electron';
// import MenuBuilder from './menu';

let mainWindow = null;

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

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { app.quit(); }
});

const installExtensions = async () => {
  if (process.env.NODE_ENV === 'development') {
    // tslint:disable-next-line global-require
    const installer = require('electron-devtools-installer');

    const extensions = [
      'REDUX_DEVTOOLS'
    ];

    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

    // TODO: Use async iteration statement.
    //       Waiting on https://github.com/tc39/proposal-async-iteration
    //       Promises will fail silently, which isn't what we want in development
    return Promise
      .all(extensions.map((name) => installer.default(installer[name], forceDownload)))
      .catch(console.log);
  }
};

app.on('ready', async () => {
  await installExtensions();

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });

  mainWindow.loadURL(mainBrowserUrl);

  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // const menuBuilder = new MenuBuilder(mainWindow);
  // menuBuilder.buildMenu();
});
