const { app, BrowserWindow } = require('electron');
// include the Node.js 'path' module at the top of your file
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');
};

app.whenReady().then(() => {
  createWindow();

  // Whereas Linux and Windows apps quit when they have no windows open,
  // macOS apps generally continue running even without any windows open,
  // and activating the app when no windows are available should open a new one.
  // https://www.electronjs.org/docs/latest/tutorial/quick-start
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  // mac-os is darwin
  if (process.platform !== 'darwin') app.quit();
});
