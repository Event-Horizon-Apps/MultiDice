function displayCharacterSheet(sheet, readOnly, player) {
	var characterSheet = document.getElementById("root__characterSheet");
	characterSheet.style.display = "flex";
	setTimeout(() => {
		characterSheet.classList.remove("characterSheet__hidden");
	}, 1);
	window.characterSheetReadOnly = readOnly;
	if (readOnly == 1) {
		document.getElementById("root__characterSheet").classList.add("readOnly");
		document.getElementById("characterSheet__readOnly").classList.remove("characterSheet__readonly_hidden");
	} else {
		document.getElementById("root__characterSheet").classList.remove("readOnly");
		document.getElementById("characterSheet__readOnly").classList.add("characterSheet__readonly_hidden");
	}

	document.getElementById("characterSheet__player").innerText = player;

	var vertue = document.getElementById("characterSheet__vertue");
	var travers = document.getElementById("characterSheet__travers");
	var historiques = document.getElementById("characterSheet__historiques");
	var avantages = document.getElementById("characterSheet__avantages");
	var inventaire = document.getElementById("characterSheet__inventaire");

	vertue.value = sheet.vertue;
	vertue.style.height = vertue.scrollHeight + "px";
	travers.value = sheet.travers;
	travers.style.height = travers.scrollHeight + "px";
	historiques.value = sheet.historiques;
	historiques.style.height = historiques.scrollHeight + "px";
	avantages.value = sheet.avantages;
	avantages.style.height = avantages.scrollHeight + "px";
	inventaire.value = sheet.inventaire;
	inventaire.style.height = inventaire.scrollHeight + "px";

	document.querySelector("#root__characterSheet input[name=characterSheet__force]").value = sheet.force;
	document.querySelector("#root__characterSheet input[name=characterSheet__finesse]").value = sheet.finesse;
	document.querySelector("#root__characterSheet input[name=characterSheet__resolution]").value = sheet.resolution;
	document.querySelector("#root__characterSheet input[name=characterSheet__astuce]").value = sheet.astuce;
	document.querySelector("#root__characterSheet input[name=characterSheet__panache]").value = sheet.panache;
	document.querySelector("#root__characterSheet input[name=characterSheet__blanches]").value = sheet.blanches;
	document.querySelector("#root__characterSheet input[name=characterSheet__intimidation]").value = sheet.intimidation;
	document.querySelector("#root__characterSheet input[name=characterSheet__militaire]").value = sheet.militaire;
	document.querySelector("#root__characterSheet input[name=characterSheet__navigation]").value = sheet.navigation;
	document.querySelector("#root__characterSheet input[name=characterSheet__athletisme]").value = sheet.athletisme;
	document.querySelector("#root__characterSheet input[name=characterSheet__persuasion]").value = sheet.persuasion;
	document.querySelector("#root__characterSheet input[name=characterSheet__bagarre]").value = sheet.bagarre;
	document.querySelector("#root__characterSheet input[name=characterSheet__representation]").value = sheet.representation;
	document.querySelector("#root__characterSheet input[name=characterSheet__dissimulation]").value = sheet.dissimulation;
	document.querySelector("#root__characterSheet input[name=characterSheet__subornation]").value = sheet.subornation;
	document.querySelector("#root__characterSheet input[name=characterSheet__empathie]").value = sheet.empathie;
	document.querySelector("#root__characterSheet input[name=characterSheet__tir]").value = sheet.tir;
	document.querySelector("#root__characterSheet input[name=characterSheet__equitation]").value = sheet.equitation;
	document.querySelector("#root__characterSheet input[name=characterSheet__vigilance]").value = sheet.vigilance;
	document.querySelector("#root__characterSheet input[name=characterSheet__erudition]").value = sheet.erudition;
	document.querySelector("#root__characterSheet input[name=characterSheet__vol]").value = sheet.vol;

	document.querySelector("#root__characterSheet input[name=characterSheet__spirale]").value = sheet.spirale;
	document.querySelector("#root__characterSheet input[name=characterSheet__corruption]").value = sheet.corruption;
}

function saveCharacterSheet() {
	var characterSheet = document.getElementById("root__characterSheet");
	characterSheet.classList.add("characterSheet__hidden");
	setTimeout(() => {
		characterSheet.style.display = "none";
	}, 400);
	if (window.characterSheetReadOnly == 0) {
		var parameters = {};
		parameters.characterSheet = {};
		parameters.action = "saveCharacterSheet";

		var vertue = document.getElementById("characterSheet__vertue");
		var travers = document.getElementById("characterSheet__travers");
		var historiques = document.getElementById("characterSheet__historiques");
		var avantages = document.getElementById("characterSheet__avantages");
		var inventaire = document.getElementById("characterSheet__inventaire");

		parameters.characterSheet.vertue = vertue.value;
		parameters.characterSheet.travers = travers.value;
		parameters.characterSheet.historiques = historiques.value;
		parameters.characterSheet.avantages = avantages.value;
		parameters.characterSheet.inventaire = inventaire.value;
		parameters.characterSheet.spirale = document.querySelector("#root__characterSheet input[name=characterSheet__spirale]").value;
		parameters.characterSheet.corruption = document.querySelector("#root__characterSheet input[name=characterSheet__corruption]").value;
		parameters.characterSheet.force = document.querySelector("#root__characterSheet input[name=characterSheet__force]").value;
		parameters.characterSheet.finesse = document.querySelector("#root__characterSheet input[name=characterSheet__finesse]").value;
		parameters.characterSheet.resolution = document.querySelector("#root__characterSheet input[name=characterSheet__resolution]").value;
		parameters.characterSheet.astuce = document.querySelector("#root__characterSheet input[name=characterSheet__astuce]").value;
		parameters.characterSheet.panache = document.querySelector("#root__characterSheet input[name=characterSheet__panache]").value;
		parameters.characterSheet.blanches = document.querySelector("#root__characterSheet input[name=characterSheet__blanches]").value;
		parameters.characterSheet.intimidation = document.querySelector("#root__characterSheet input[name=characterSheet__intimidation]").value;
		parameters.characterSheet.militaire = document.querySelector("#root__characterSheet input[name=characterSheet__militaire]").value;
		parameters.characterSheet.navigation = document.querySelector("#root__characterSheet input[name=characterSheet__navigation]").value;
		parameters.characterSheet.athletisme = document.querySelector("#root__characterSheet input[name=characterSheet__athletisme]").value;
		parameters.characterSheet.persuasion = document.querySelector("#root__characterSheet input[name=characterSheet__persuasion]").value;
		parameters.characterSheet.bagarre = document.querySelector("#root__characterSheet input[name=characterSheet__bagarre]").value;
		parameters.characterSheet.representation = document.querySelector("#root__characterSheet input[name=characterSheet__representation]").value;
		parameters.characterSheet.dissimulation = document.querySelector("#root__characterSheet input[name=characterSheet__dissimulation]").value;
		parameters.characterSheet.subornation = document.querySelector("#root__characterSheet input[name=characterSheet__subornation]").value;
		parameters.characterSheet.empathie = document.querySelector("#root__characterSheet input[name=characterSheet__empathie]").value;
		parameters.characterSheet.tir = document.querySelector("#root__characterSheet input[name=characterSheet__tir]").value;
		parameters.characterSheet.equitation = document.querySelector("#root__characterSheet input[name=characterSheet__equitation]").value;
		parameters.characterSheet.vigilance = document.querySelector("#root__characterSheet input[name=characterSheet__vigilance]").value;
		parameters.characterSheet.erudition = document.querySelector("#root__characterSheet input[name=characterSheet__erudition]").value;
		parameters.characterSheet.vol = document.querySelector("#root__characterSheet input[name=characterSheet__vol]").value;

		parameters.pseudo = document.getElementById("characterSheet__player").innerText;

		ipc.send("action", parameters);
	}
}
