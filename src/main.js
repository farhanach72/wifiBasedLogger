const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
const wifiName = require('wifi-name');
var fs = require('fs');
const isMac = process.platform === "darwin";
const isWin = process.platform === "win32";

let parentDir = `${path.parse(process.cwd()).root}Wifi_Based_Logger`
if (!fs.existsSync(parentDir)) {
  fs.mkdirSync(parentDir);
}


app.disableHardwareAcceleration()
require("./components/wifi");

var nameOfWifi;
setInterval( () => {
  // try {
  //   const name = await wifiName()
  //   nameOfWifi = name

  // } catch (err) {
  //   console.log('logggggggggg',err)
  // }
  wifiName().then(name => {
    nameOfWifi = name
  }).catch((err)=>{
    // console.log('errrrrrrrrrr',err)
    nameOfWifi = 'Disconnected'

  });
}, 1000)

// console.log('checking wifi name', nameOfWifi)

const { networkInterfaces } = require('os');

//getting ip address dynamically
const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object
for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
    // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
    const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
    if (net.family === familyV4Value && !net.internal) {
      if (!results[name]) {
        results[name] = [];
      }
      results[name].push(net.address);
    }
  }
}

//storing ip address to IPV4
const IPV4 = results['Wi-Fi'] ? `${results['Wi-Fi'].join('')}` : undefined

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    minWidth: 900,
    minHeight: 700,
    webPreferences: {
      autoHideMenuBar: true,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      // devTools: false,
      webSecurity: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  // mainWindow.setMenuBarVisibility(false)
  // mainWindow.setMenu(null)
  // mainWindow.removeMenu();
  // mainWindow.setAutoHideMenuBar(true)
  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  mainWindow.maximize()
  // mainWindow.webContents.on('did-finish-load', () => {
  //   // exec(`npx json-server --watch src/db.json --port 8000 -H ${ipv4}`);
  // });
  // ipcMain.on('stopCycle',(event,args)=>{
  //   mainWindow.webContents.reloadIgnoringCache()
  // })
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow()
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.on('getIpv4', (event, arg) => {
  // console.log('arg',arg)
  event.returnValue = IPV4
})

ipcMain.on('getWifiName', (event, arg) => {
  // console.log('arg',arg)
  event.returnValue = nameOfWifi
})

// let dir = path.join(__dirname, '../../../src/data.json')
// console.log("=> ", dir)
const dirJSON = path.join(__dirname, '../../src/data.json')

ipcMain.on("runScript", (event, data) => {
  // exec(`npx json-server --watch ${dirJSON} --port 8000 --no-cors -H ${IPV4}`);
  // let process = spawn('npx', [`json-server --watch ${dirJSON} --port 8000 --no-cors -H ${IPV4}`])
  // process.on('exit', (code) => {
  //   console.log("Child exited");
  // });
  // exec(`npx json-server --watch ${dirJSON} --port 8000 --no-cors -H ${IPV4}`);
  // event.returnValue = dirJSON
});

// ipcMain.on("stopScript", (event, data) => {
//   process.kill(-child.pid);
//   console.log('killing')
// });

// ipcMain.handle("test", async (event, args) => {
// new Notification({title:'Notification', body:args}).show()
// })

// All of the Node.js APIs are available in the preload process.
