var canvas, textOut, input, submitButton;

var numOfValues = 3;
var numOfCriteria;
var criIndex;
var values = [];
var objects = [];
var numOfObjects;
var objectPairs = []
var colors = [];



function setup() {
	criIndex = 0;

	// Tablica kolorów lini na wykresach
	colors.push([100, 50, 120]);
	colors.push([140, 125, 200]);
	colors.push([80, 170, 100]);

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
			drawTriangles();
		}
	}
	console.table(values);
}

function drawTriangles() {
	let diagWidth = window.innerWidth / numOfCriteria;
	let diagHeight = 200;

	// Granica pola wykresów
	noStroke();
	fill(225);
	rect(0, 0, window.innerWidth, diagHeight + 14);

	stroke(200, 25, 30);
	line(0, diagHeight, window.innerWidth, diagHeight);

	for(let i = 0; i < numOfCriteria; i++) {
		// Separator wykresów
		stroke(200, 25, 30);
		line(14 + i * diagWidth, 0, 14 + i * diagWidth, diagHeight);
		
		// Wartości na wykresie - OY
		stroke(0);
		fill(100);
		textAlign(LEFT);
		text("1", 5 + i * diagWidth, 11);
		text("0", 5 + i * diagWidth, diagHeight - 2);
	}
	strokeWeight(2);
	for(let i = 0; i < numOfCriteria; i++) {
		// Stosunek wartości środkowej do długości wykresu
		let middleX = Math.abs(values[i][0] - values[i][1]) / (values[i][2] - values[i][0]);

		// Od lewej...
		// Pierwszy trójkąt
		stroke(colors[0][0], colors[0][1], colors[0][2]);
		line(15 + (i * diagWidth), 0, middleX * diagWidth + (i * diagWidth), diagHeight);

		// Drugi trójkąt
		stroke(colors[1][0], colors[1][1], colors[1][2]);
		line(15 + (i * diagWidth), diagHeight, middleX * diagWidth + (i * diagWidth), 0);
		line(middleX * diagWidth + (i * diagWidth), 0, diagWidth + i * diagWidth, diagHeight);

		// Trzeci trójkąt
		stroke(colors[2][0], colors[2][1], colors[2][2]);
		line(middleX * diagWidth + (i * diagWidth), diagHeight, diagWidth + i * diagWidth, 0);

		// Wartości na wykresie - OX
		stroke(0);
		fill(100);
		textAlign(LEFT);
		textSize(10);
		text(values[i][0], 18 + i * diagWidth, diagHeight + 12);
		textAlign(CENTER);
		text(values[i][1], middleX * diagWidth + (i * diagWidth), diagHeight + 12);
		textAlign(RIGHT);
		text(values[i][2], diagWidth + i * diagWidth - 3, diagHeight + 12);
	}
}

function createObjects() {
	textOut.html("Zaczekaj...");

	// Tworzenie tablicy obiektów charakterystycznych 'objects'
	numOfObjects = Math.pow(numOfValues, numOfCriteria);

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

	// Tworzenie par obiektów charakterystycznych
	for(let i = 0; i < objects.length; i++) {
		for(let j = 0; j < objects.length; j++) {
			objectPairs.push([objects[i], objects[j]]);
		}
	}
	console.table(objectPairs);
}