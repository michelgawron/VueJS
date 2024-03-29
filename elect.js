// ./main.js
const {app, BrowserWindow} = require('electron');
const url = require('url');
const path = require('path');

let win = null;

app.on('ready', function () {

    // Initialize the window to our specified dimensions
    win = new BrowserWindow({width: 1000, height: 600});

    // Specify entry point to default entry point of vue.js to a lcoal file
    win.loadURL(url.format({
        pathname: path.join(__dirname, '/src/namedSlots.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Remove window once app is closed
    win.on('closed', function () {
        win = null;
    });

});
//create the application window if the window variable is null
app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});

//quit the app once closed
app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});