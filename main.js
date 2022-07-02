// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require("electron");
const path = require("path");
const ejse = require("ejs-electron");
const io = require("socket.io-client");
const localStorage = require("electron-settings");

let socket;
let mainWindow;
let adminWindow;

app.whenReady().then(() => {
	mainWindow = new BrowserWindow({
		titleBarStyle: "hidden",
		resizable: true,
		frame: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
		icon: path.join(__dirname, "/img/256x256.png"),
		show: true,
	});
	mainWindow.loadURL(`file://${__dirname}/views/index.ejs`);

	mainWindow.once("ready-to-show", () => {
		mainWindow.show();
	});
});

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") app.quit();
});

ipcMain.on("close", (e, window) => {
	if (window == "main") app.quit();
	if (window == "MJ") adminWindow.close();
	app.quit();
});

ipcMain.on("minimize", (e, window) => {
	if (window == "main") mainWindow.minimize();
	if (window == "MJ") adminWindow.minimize();
});

ipcMain.on("frontendReady", (e) => {
	localStorage.hasSync("settings") ? mainWindow.webContents.send("setSettings", localStorage.getSync("settings")) : null;
});

ipcMain.on("setSettings", (e, settings) => {
	localStorage.setSync("settings", settings);
});

ipcMain.on("action", (e, parameters) => {
	if (parameters.action == "login") {
		defineSocket();
		let settings = localStorage.getSync("settings") || {};
		settings.pseudo = parameters.pseudo;
		localStorage.setSync("settings", settings);
	}
	if (socket != null) socket.emit("action", parameters);
});

function defineSocket() {
	let settings;
	let serverProperties;
	localStorage.hasSync("settings") ? (settings = localStorage.getSync("settings")) : undefined;
	serverProperties = settings !== undefined ? [settings.serverAddress, settings.serverPort] : undefined;
	if (serverProperties !== undefined) {
		socket = io(serverProperties[0] + ":" + serverProperties[1], {
			"connect timeout": 2000,
			rejectUnauthorized: false,
			reconnect: true,
		});

		socket.on("connect_error", function (error) {
			socket.close();
			mainWindow.webContents.send("serverConnectError", error);
			socket == null;
		});
		socket.on("action", function (parameters) {
			mainWindow.webContents.send("action", parameters);
		});
	} else {
		mainWindow.webContents.send("noServerSettings");
	}
}
