const { app, BrowserWindow, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");
const { createTray } = require("./utils/createTray");
const { createMainWindow } = require("./utils/createMainWindow");
const { createPopupWindow } = require("./utils/createPopupWindow");
const { showNotification } = require("./utils/showNotification");
const AutoLaunch = require("auto-launch");
const remote = require("@electron/remote/main");
const config = require("./utils/config");
const path = require("path");

if (config.isDev) require("electron-reloader")(module);

let salesWindow = null;

remote.initialize();

if (!config.isDev) {
	const autoStart = new AutoLaunch({
		name: config.appName,
	});
	autoStart.enable();
}

app.on("ready", async () => {
	config.mainWindow = await createMainWindow();
	// config.popupWindow = await createPopupWindow();
	config.tray = await createTray();

	showNotification(
		config.appName,
		"Application running on background! See application tray.",
	);
});

const createSalesWindow = () => {
	// If salesWindow exists but is destroyed, set it to null
	if (salesWindow && salesWindow.isDestroyed()) {
		salesWindow = null;
	}

	// Create a new window if it doesn't exist or was destroyed
	if (!salesWindow) {
		salesWindow = new BrowserWindow({
			minWidth: 1000,
			minHeight: 700,
			frame: false,
			icon: config.icon,
			title: config.appName,
			webPreferences: {
				preload: path.join(__dirname, "preload.js"),
				contextIsolation: true,
				enableRemoteModule: true,
				nodeIntegration: true,
			},
		});

		salesWindow.maximize(); // Maximize the window
		salesWindow.show();
		remote.enable(salesWindow.webContents);

		const startUrl = config.isDev
			? "http://localhost:3000/#/sales"
			: `file://${path.join(
					__dirname,
					"..",
					"../build/index.html",
			  )}#/sales`;

		salesWindow.loadURL(startUrl); // Load the desired route

		salesWindow.webContents.on("did-finish-load", () => {
			if (!salesWindow.webContents.getURL().includes("/sales")) {
				salesWindow.loadURL(startUrl);
			}
		});

		salesWindow.once("ready-to-show", () => {
			autoUpdater.checkForUpdatesAndNotify();
		});

		salesWindow.on("close", (e) => {
			if (!config.isQuiting) {
				e.preventDefault();
				salesWindow.hide();
			}
		});

		salesWindow.on("closed", () => {
			salesWindow = null;
		});
	} else {
		// If window exists but is hidden, show and focus it
		salesWindow.show();
		salesWindow.focus();

		// Reload the sales route to ensure correct view
		const startUrl = config.isDev
			? "http://localhost:3000/#/sales"
			: `file://${path.join(
					__dirname,
					"..",
					"../build/index.html",
			  )}#/sales`;

		salesWindow.loadURL(startUrl);
	}

	return salesWindow;
};

ipcMain.on("open-sales-window", () => {
	createSalesWindow();
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0)
		config.mainWindow = createMainWindow();
});

ipcMain.on("app_version", (event) => {
	event.sender.send("app_version", { version: app.getVersion() });
});

autoUpdater.on("update-available", () => {
	config.mainWindow.webContents.send("update_available");
});

autoUpdater.on("update-downloaded", () => {
	config.mainWindow.webContents.send("update_downloaded");
});

ipcMain.on("restart_app", () => {
	autoUpdater.quitAndInstall();
});

