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

remote.initialize();

if (!config.isDev) {
	const autoStart = new AutoLaunch({
		name: config.appName,
	});
	autoStart.enable();
}

// Ensure the tray is created at the start
let tray = null;
app.whenReady().then(async () => {
	tray = await createTray(); // Ensuring tray is created
	config.tray = tray;

	config.mainWindow = await createMainWindow();

	showNotification(
		config.appName,
		"Application running in the background! See application tray.",
	);
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		config.mainWindow = createMainWindow();
	}
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
