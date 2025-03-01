const { BrowserWindow } = require("electron");
const { join } = require("path");
const { autoUpdater } = require("electron-updater");
const remote = require("@electron/remote/main");
const config = require("./config");

exports.createMainWindow = async () => {
	const window = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: false,
			devTools: config.isDev,
			contextIsolation: false,
		},
		frame: false,
		icon: config.icon,
		title: config.appName,
		show: false,
		minWidth: 1000,
		minHeight: 700,
	});

	window.maximize();
	window.show();

	remote.enable(window.webContents);

	const startUrl = config.isDev
		? "http://localhost:3000/#/login"
		: `file://${join(__dirname, "..", "../build/index.html")}#/login`;

	// const startUrl = config.isDev
	// 	? "http://localhost:3000/#"
	// 	: `file://${join(__dirname, "..", "../build/index.html")}#`;

	await window.loadURL(startUrl);

	window.webContents.on("did-finish-load", () => {
		if (!window.webContents.getURL().includes("/")) {
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

