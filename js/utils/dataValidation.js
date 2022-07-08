function diceRollValidation(parameters) {
	var nbOfDice = parameters.nbOfDice;
	var nbOfFaces = parameters.nbOfFaces;

	const nbOfDiceNumber = Number(nbOfDice);
	const nbOfFacesNumber = Number(nbOfFaces);

	if (Number.isInteger(nbOfDiceNumber) && nbOfDiceNumber > 0 && Number.isInteger(nbOfFacesNumber) && nbOfFacesNumber > 0) return [true, ""];
	return ["false", i18n("Number of dice and their faces must be a strictly positive integer")];
}
