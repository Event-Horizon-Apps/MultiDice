function translate() {
	var i18nElements = document.querySelectorAll(".i18n");
	for (var el of i18nElements) {
		var attribute = el.dataset["i18n"];
		if (attribute == "innerText") {
			el.innerText = i18n(el.innerText);
		} else if (attribute == "innerHTML") {
			el.innerHTML = i18n(el.innerHTML);
		} else {
			el.setAttribute(attribute, i18n(el.getAttribute(attribute)));
		}
	}
	// document.getElementById("settingsModal__title").innerText = i18n("Settings");
	// document.getElementById("settingsModal__serverAddress").setAttribute("placeholder", i18n("Server address"));
	// document.getElementById("settingsModal__serverPort").setAttribute("placeholder", i18n("Server port"));
}
