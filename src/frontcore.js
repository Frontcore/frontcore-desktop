'use strict';

/**
 * Module to control application life.
 */
const electron = require('electron');
const path = require('path');
const product = require('../package');
const config = require('./config');

const app = electron.app;
const debug = /--debug/.test(process.argv[2]);

/**
 * Module to create native browser window.
 */
const BrowserWindow = electron.BrowserWindow;

/**
 * Keep a global reference of the window object, if you don't, the window will
 * be closed automatically when the JavaScript object is garbage collected.
 */
let mainWindow = null;

let shouldQuit = makeSingleInstance();
if (shouldQuit) {
  return app.quit();
}

function createWindow () {
  /**
   * Create the browser window.
   */
  let browserWindowConfig = {
      width: config.project.window.width,
      height: config.project.window.height,
      min-width: config.project.window.minWidth,
      min-height: config.project.window.minHeight,
      center: config.project.window.isCenter,
      title: config.project.name + " v" + product.version,
      resizable: config.project.window.isResizable
  };

  mainWindow = new BrowserWindow(browserWindowConfig);

  /**
   * load the index.html of the app.
   */
  mainWindow.loadURL(path.join('file://', __dirname, '/index.html'));

  /**
   * Launch fullscreen with DevTools open, usage: npm run debug
   */
  if (debug) {
    mainWindow.webContents.openDevTools();
    mainWindow.maximize();
  }

  /**
   * Emitted when the window is closed.
   */
  mainWindow.on('closed', function() {
    /**
     * Dereference the window object, usually you would store windows
     * in an array if your app supports multi windows, this is the time
     * when you should delete the corresponding element.
     */
    mainWindow = null;
  });

  mainWindow.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    require('shell').openExternal(url);
  });
}

/**
 * This method will be called when Electron has finished
 * initialization and is ready to create browser windows.
 */
app.on('ready', createWindow);

/**
 * Quit when all windows are closed.
 */
app.on('window-all-closed', function () {
  /**
   * On OS X it is common for applications and their menu bar
   * to stay active until the user quits explicitly with Cmd + Q
   */
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  /**
   * On OS X it's common to re-create a window in the app when the
   * dock icon is clicked and there are no other windows open.
   */
  if (mainWindow === null) {
    createWindow();
  }
});

/**
 * Make this app a single instance app.
 * The main window will be restored and focused instead of a second window
 * opened when a person attempts to launch a second instance.
 * Returns true if the current version of the app should quit instead of launching.
 */
function makeSingleInstance () {
  if (process.mas) {
    return false;
  }

  return app.makeSingleInstance(function () {
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.focus();
    }
  })
}
