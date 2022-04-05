const { app, BrowserWindow, ipcMain } = require('electron')
const { join } = require('path')

let mainWindow
function createWindow () {
  mainWindow = new BrowserWindow({
    // show: false,
    width: 1280,
    height: 720,
    // frame: false,
    fullscreenable: true,
    webPreferences: {
      // devTools: !app.isPackaged,
      nodeIntegration: true,
      contextIsolation: false,
      preload: join(__dirname, 'preload.js')
    }
  })

  mainWindow.setMenu(null)
  mainWindow.loadFile(join(__dirname, './index.html'))

  mainWindow.on('closed', () => {
    app.quit()
    process.exit()
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  ipcMain.on('app:reload', () => {
    mainWindow.webContents.reload()
  })

  ipcMain.on('app:min', () => {
    mainWindow.minimize()
  })

  ipcMain.on('app:max', e => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
    } else {
      mainWindow.maximize()
    }
  })

  ipcMain.on('app:fullscreen', (e, flag) => {
    mainWindow.setFullScreen(flag ?? !mainWindow.isFullScreen())
    e.returnValue = mainWindow.isFullScreen()
  })

  ipcMain.on('app:quit', () => {
    app.exit()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
