const { BrowserWindow } = require("electron");
const { join } = require("path");
const { autoUpdater } = require("electron-updater");
const remote = require("@electron/remote/main");
const config = require("./config");

exports.createMainWindow = async () => {
	const window = new BrowserWindow({
		width: 1000,
		height: 800,
		resizable: true,
		frame: true,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			devTools: config.isDev,
			contextIsolation: false,
		},
		frame: false,
		icon: config.icon,
		title: config.appName,
	});

	remote.enable(window.webContents);

	const startUrl = config.isDev
		? 'http://localhost:3000/#/login'
		: `file://${join(__dirname, "..", "../build/index.html")}#/login`;

	await window.loadURL(startUrl);

	// Ensure the login page is loaded
	window.webContents.on('did-finish-load', () => {
		if (!window.webContents.getURL().includes('/login')) {
			window.loadURL(startUrl);
		}
	});

	window.once("ready-to-show", () => {
		autoUpdater.checkForUpdatesAndNotify();
	});

	window.on("close", (e) => {
		if (!config.isQuiting) {
			e.preventDefault();
			window.hide();
		}
	});

	return window;
};
