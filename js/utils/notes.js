function displayNotes(notes) {
	console.log(notes);
	var notesEl = document.getElementById("root__notes");
	notesEl.classList.remove("notes__hidden");

	document.getElementById("notes__content").value = notes;
}

function saveNotes() {
	var notes = document.getElementById("root__notes");
	notes.classList.add("notes__hidden");
	var parameters = {};
	parameters.action = "saveNotes";
	parameters.notes = document.getElementById("notes__content").value;
	ipc.send("action", parameters);
}
