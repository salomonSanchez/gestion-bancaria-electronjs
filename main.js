const { app, BrowserWindow, Menu } = require('electron');
const path = require('path')
const url = require('url');

//para modificar y no detener los procesos
if (process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    })
}

let mainWindow;

function createmainWindow() {
    mainWindow = new BrowserWindow({
        height: 800,
        width: 1300,
        resizable: true,
        icon: path.join(__dirname, 'assets/img/favicon-160x60.png'),
        webPreferences: {
            nodeIntegration: true,
            worldSafeExecuteJavaScript: true
        }
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    mainWindow.setMenu(null)
    const menu = Menu.buildFromTemplate(templateMenu)
    Menu.setApplicationMenu(menu)

}

app.on('ready', () => {
    createmainWindow()
    mainWindow.on('closed', () => {
        app.quit();
    })
});

//creacion de menus
const templateMenu = [{
    label: 'File',
    submenu: [{
        label: 'Exit',
        accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
        click() {
            app.quit();
        }
    }]
}];

// Developer Tools
if (process.env.NODE_ENV !== 'production') {
    templateMenu.push({
        label: 'DevTools',
        submenu: [{
                label: 'Show/Hide Dev Tools',
                accelerator: process.platform == 'darwin' ? 'Comand+D' : 'Ctrl+D',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}