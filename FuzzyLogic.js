var canvas, textOut, input, submitButton;

var numOfValues = 3;
var numOfCriteria;
var criIndex;
var values = [];
var objects;
var numOfObjects;

var recursionIndex = 0;

function setup() {
	criIndex = 0;

	canvas = createCanvas(window.innerWidth, window.innerHeight - 100);
	canvas.position(0, 100);
	background(0);

	textOut = createElement("h2", "Podaj liczbe kryteriow:")
	textOut.position(20, 0);

	input = createInput();
	input.position(20, 65);

	submitButton = createButton("submit");
	submitButton.position(input.x + input.width, 65);
	submitButton.mousePressed(subCriteria);
}

function subCriteria() {
	numOfCriteria = input.value();

	input = createInput();
	input.position(20, 65);

	input2 = createInput();
	input2.position(input.x + input.width + 10, 65);

	input3 = createInput();
	input3.position(input2.x + input2.width + 10, 65);

	submitButton.position(input3.x + input3.width, 65);
	submitButton.mousePressed(addToValues);

	textOut.html("Podaj wartosci kryterium nr " + (criIndex + 1));
}

function addToValues() {
	if(values.length < numOfCriteria) {
		let tmpTab = new Array(numOfValues);
		tmpTab[0] = input.value();
		tmpTab[1] = input2.value();
		tmpTab[2] = input3.value();

		values.push(tmpTab);
		criIndex++;

		input = createInput();
		input.position(20, 65);

		input2 = createInput();
		input2.position(input.x + input.width + 10, 65);

		input3 = createInput();
		input3.position(input2.x + input2.width + 10, 65);
		if(values.length < numOfCriteria) {
			textOut.html("Podaj wartosci kryterium nr " + (criIndex + 1));
		} else {
			textOut.html("Wcisnij 'submit' by kontynuowac");
			submitButton.mousePressed(createObjects);
		}
	}
	console.table(values);
}

function createObjects() {
	textOut.html("Zaczekaj...");
	numOfObjects = Math.pow(numOfValues, numOfCriteria);
	objects = [];

	// Tablica indeksów, na początku zera
	let indexes = [];
	for(let i = 0; i < numOfCriteria; i++) {
		indexes.push(0);
	}

	while(objects.length !== numOfObjects) {
		let tmpTab = [];
		for(let i = 0; i < numOfCriteria; i++) {
			tmpTab.push(values[i][indexes[i]]);
		}

		objects.push(tmpTab);

		indexes[indexes.length - 1]++;
		for(let j = indexes.length - 1; j >= 0; j--)	{
			if(indexes[j] > numOfValues - 1) {
				indexes[j] = 0;
				indexes[j - 1]++;
			}
		}
	}
	console.table(objects);
}

function recursiveObjects(noc) {
	if(noc > 0) {

	}
}