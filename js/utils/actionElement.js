function actionElement(e) {
	var el = e.target;
	if (el.id == "login__submit") el.setAttribute("disabled", true);
	var actionParameters = el.dataset["action_parameters"];
	var parameters = {};
	parameters.action = el.dataset["action"];
	for (let p of actionParameters.split(";")) {
		let paramSplit = p.split("/");
		if (paramSplit.length == 2) {
			let targetString = paramSplit[0];
			let targetElement = document.querySelector(targetString);
			let property = paramSplit[1].split("=")[1];
			let propertyName = paramSplit[1].split("=")[0];
			if (targetString == "this") {
				targetElement = e.target;
			}
			if (targetElement != null) {
				propertyValue = property.split(".").reduce(function (prev, curr) {
					return prev ? prev[curr] : null;
				}, targetElement || self);
				parameters[propertyName] = propertyValue;
			}
		} else {
			let property = p.split("=");
			let propertyName = property[0];
			let propertyValue = property[1];
			parameters[propertyName] = eval(propertyValue);
		}
	}
	let dataValidation = el.dataset["action_validation"];
	console.log(el);
	console.log(dataValidation);
	if (dataValidation == null) {
		ipc.send("action", parameters);
	} else {
		let validation = window[dataValidation](parameters);
		if (validation[0] == true) {
			ipc.send("action", parameters);
		} else {
			displayNotification(validation[1], "#db3434");
		}
	}
}
