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
const { exec } = require("child_process");

if (config.isDev) require("electron-reloader")(module);

remote.initialize();

if (!config.isDev) {
	const autoStart = new AutoLaunch({
		name: config.appName,
	});
	autoStart.enable();
}

function startBackend() {
	const isProduction = !config.isDev;
	const backendPath = isProduction
		? path.join(process.resourcesPath, "back-app")
		: path.join(__dirname, "../back-app");

	// First install dependencies
	exec("npm install", { cwd: backendPath }, (error, stdout, stderr) => {
		if (error) {
			console.error(`Error installing dependencies: ${error.message}`);
			return;
		}

		// Then start the server
		exec("npm start", { cwd: backendPath }, (error, stdout, stderr) => {
			if (error) {
				console.error(`Error starting backend: ${error.message}`);
				return;
			}
			if (stderr) {
				console.error(`Backend stderr: ${stderr}`);
			}
			console.log(`Backend stdout: ${stdout}`);
		});
	});
}

app.on("ready", async () => {
	startBackend();

	config.mainWindow = await createMainWindow();
	config.tray = await createTray();

	showNotification(
		config.appName,
		"Application running on background! See application tray.",
	);
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

