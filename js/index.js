const ipc = require("electron").ipcRenderer;
let impact;
let settings;
let rolls = [];
let nbOfRollsOnScreen = 0;

ipc.on("setSettings", (e, parameters) => {
	settings = parameters;
	document.getElementById("login__pseudo").value = settings.pseudo;
	settings.soundEffectMuted ? document.getElementById("toolBar__soundEffect").classList.replace("fa-volume-up", "fa-volume-mute") : null;
	document.getElementById("settingsModal__serverAddress").value = settings.serverAddress;
	document.getElementById("settingsModal__serverPort").value = settings.serverPort;
});

ipc.on("noServerSettings", () => {
	displayNotification("Pas de serveur configuré", "#db3434");
	document.getElementById("login__submit").removeAttribute("disabled");
});

ipc.on("serverConnectError", (e, error) => {
	displayNotification("Impossible de se connecter au serveur<br>Vérifier les paramètres<br>" + error, "#db3434");
	document.getElementById("login__submit").removeAttribute("disabled");
});

ipc.on("action", (e, arguments) => {
	if (arguments.action == "joinedServer") {
		settings = Object.assign({}, settings, arguments);
		console.log(settings);
		impact = new Audio(settings.serverAddress + ":" + settings.serverPort + "/impact.wav");
		document.getElementById("root__title").classList.add("small");
		document.getElementById("toolBar__rollType").classList.remove("bottomSlideHidden");
		document.getElementById("toolBar__roll").classList.remove("bottomSlideHidden");
		document.getElementById("toolBar__characterSheet").classList.remove("bottomSlideHidden");
		document.getElementById("toolBar__notes").classList.remove("bottomSlideHidden");
		document.getElementById("playerPanel").classList.add("visible");
		document.getElementById("login").classList.add("hidden");
		setTimeout(() => {
			document.getElementById("login").remove();
		}, 300);
		addPlayer(arguments.pseudo, true);
		for (let p of arguments.players) {
			if (p.pseudo != settings.pseudo) addPlayer(p.pseudo, false);
		}
	} else if (arguments.action == "duplicatePlayer") {
		displayNotification("A player with the same name<br>is already connected", "#db3434");
		document.getElementById("login__submit").removeAttribute("disabled");
	} else if (arguments.action == "newPlayer") {
		addPlayer(arguments.pseudo, false);
	} else if (arguments.action == "playerLeft") {
		removePlayer(arguments.pseudo);
	} else if (arguments.action == "setHeroicPoints") {
		console.log(arguments);
		let playerBetInput = document.getElementById("player__bet-" + arguments.pseudo.replaceAll(" ", "-"));
		playerBetInput !== null ? (playerBetInput.value = arguments.heroicPoints) : null;
	} else if (arguments.action == "roll") {
		rolls.push(arguments);
	} else if (arguments.action == "loadCharacterSheet") {
		console.log(arguments);
		displayCharacterSheet(arguments.characterSheet, arguments.readOnly, arguments.pseudo);
	} else if (arguments.action == "loadNotes") {
		console.log(arguments);
		displayNotes(arguments.notes);
	}
});

document.addEventListener("DOMContentLoaded", () => {
	setTimeout(() => {
		ipc.send("frontendReady");
		document.getElementById("splash__content").classList.remove("opacity_hidden");
		setTimeout(() => {
			document.body.style.backgroundImage = "url('../img/background.jpeg')";
			document.getElementById("splash__content").classList.add("opacity_hidden");
			document.getElementById("splash").classList.add("opacity_hidden");
			setTimeout(() => {
				afterSplash();
			}, 1000);
		}, 2000);
	}, 100);
});

function afterSplash() {
	setRollQueue();
	document.getElementById("splash").style.display = "none";
	document.getElementById("appbar__minimize").addEventListener("click", () => {
		ipc.send("minimize", "main");
	});

	document.getElementById("appbar__close").addEventListener("click", () => {
		document.getElementById("root__title").classList.add("hidden");
		setTimeout(function () {
			ipc.send("close", "main");
		}, 700);
	});

	document.getElementById("toolBar__settings").addEventListener("click", () => {
		document.getElementById("settingsModal__modal").classList.toggle("visible");
	});

	document.getElementById("toolBar__soundEffect").addEventListener("click", (e) => {
		e.target.classList.toggle("fa-volume-up");
		e.target.classList.toggle("fa-volume-mute");
		settings.soundEffectMuted = e.target.classList.contains("fa-volume-mute");
		ipc.send("setSettings", settings);
	});

	document.getElementById("settingsModal__setSettings").addEventListener("click", () => {
		settings.serverAddress = document.getElementById("settingsModal__serverAddress").value;
		settings.serverPort = document.getElementById("settingsModal__serverPort").value;
		document.getElementById("settingsModal__modal").classList.remove("visible");
		displayNotification("Settings saved!");
		ipc.send("setSettings", settings);
	});

	let actionElements = document.querySelectorAll(".actionElement");
	for (let el of actionElements) {
		el.onclick = actionElement;
	}
}

function addPlayer(pseudo, editable) {
	let playerContainer = document.getElementById("playerPanel__players");
	let disabledBetInput = editable ? "" : "disabled";
	let escapedPseudo = pseudo.replaceAll(" ", "-");
	let isOwnPseudo = pseudo == settings.pseudo ? " (You)" : "";
	let readOnly = pseudo == settings.pseudo ? 0 : 1;
	playerContainer.innerHTML += "<div class='player' id='player-" + escapedPseudo + "'><span onclick='actionElement(event)' class='actionElement' data-readOnly='" + readOnly + "' data-action='loadCharacterSheet' data-action_parameters='pseudo=`" + pseudo + "`;readOnly=`" + readOnly + "`'>" + pseudo + isOwnPseudo + "</span><input oninput='setHeroicPoints(this)' type='number' min='0' value='1' id='player__bet-" + escapedPseudo + "' " + disabledBetInput + "></div>";
}

function removePlayer(pseudo) {
	let escapedPseudo = pseudo.replaceAll(" ", "-");
	let playerContainer = document.getElementById("player-" + escapedPseudo);
	playerContainer !== null ? playerContainer.remove() : null;
}

function setHeroicPoints(el) {
	console.log(el);
	let parameters = {};
	parameters.action = "setHeroicPoints";
	parameters.pseudo = el.id.split("player__bet-").pop();
	parameters.heroicPoints = el.value;
	ipc.send("action", parameters);
}

function setRollQueue() {
	let lock = 0;
	setInterval(() => {
		if (lock == 1) return;
		if (rolls.length == 0) return;
		lock = 1;
		nbOfRollsOnScreen++;

		let roll = rolls.pop();

		let rollResult = document.createElement("div");
		rollResult.classList.add("rollResult__title");
		rollResult.classList.add("rollResult");
		rollResult.classList.add("hidden");
		rollResult.id = "rollResult__title-" + nbOfRollsOnScreen;

		rollResult.innerText = roll.pseudo + " jette " + roll.nbOfDice + "D" + roll.nbOfFaces;
		document.body.appendChild(rollResult);

		let rollResultDice = document.createElement("div");
		rollResultDice.classList.add("rollResult__dice");
		rollResultDice.classList.add("rollResult");
		rollResultDice.classList.add("hidden");
		rollResultDice.id = "rollResult__dice-" + nbOfRollsOnScreen;
		rollResultDice.innerText = roll.result.join(", ");
		document.body.appendChild(rollResultDice);

		setTimeout(() => {
			document.getElementById("rollResult__title-" + nbOfRollsOnScreen).classList.remove("hidden");
		}, 1);
		setTimeout(() => {
			if (document.getElementById("toolBar__soundEffect").classList.contains("fa-volume-up")) {
				impact.currentTime = 0;
				impact.play();
			}
			document.getElementById("rollResult__dice-" + nbOfRollsOnScreen).classList.remove("hidden");
		}, 1000);
		const maxRollsOnScreen = 6;
		setTimeout(() => {
			let top = 30 + maxRollsOnScreen * nbOfRollsOnScreen + "%";
			let rollsOnScreenDice = document.getElementsByClassName("rollResult__dice small hidden");
			for (roll of rollsOnScreenDice) {
				roll.parentNode.removeChild(roll);
			}
			let rollsOnScreen = document.getElementsByClassName("rollResult__title small hidden");
			for (roll of rollsOnScreen) {
				roll.parentNode.removeChild(roll);
			}
			if (nbOfRollsOnScreen > maxRollsOnScreen) {
				let toBeShiftedRolls = document.getElementsByClassName("rollResult small");
				for (roll of toBeShiftedRolls) {
					roll.style.top = parseInt(roll.style.top.split("%")[0]) - maxRollsOnScreen + "%";
				}
				oldestRollTitle = document.getElementsByClassName("rollResult__title small")[0];
				oldestRollDice = document.getElementsByClassName("rollResult__dice small")[0];
				oldestRollTitle.classList.add("hidden");
				oldestRollDice.classList.add("hidden");
				top = maxRollsOnScreen * 10 + maxRollsOnScreen + "%";
			}
			let currentRollTitle = document.getElementById("rollResult__title-" + nbOfRollsOnScreen);
			let currentRollDice = document.getElementById("rollResult__dice-" + nbOfRollsOnScreen);
			currentRollTitle.style.top = top;
			currentRollTitle.classList.add("small");
			currentRollDice.style.top = top;
			currentRollDice.classList.add("small");
		}, 2000);
		setTimeout(() => {
			lock = 0;
		}, 2700);
	}, 100);
}
