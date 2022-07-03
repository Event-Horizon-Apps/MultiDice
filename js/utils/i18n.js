const {ipcRenderer} = require("electron");

function i18n(sentence) {
	var translated = ipcRenderer.sendSync("i18n", sentence);
	return translated;
}
