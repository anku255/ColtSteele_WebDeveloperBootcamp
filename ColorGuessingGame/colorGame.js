var numberOfSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#messageDisplay");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#resetButton");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
	setUpModeButtons();
	setUpSquares();
	reset();
}

resetButton.addEventListener("click", reset);

function setUpModeButtons() {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click",setUpButton);
	}
}

function setUpButton() {
	modeButtons[0].classList.remove("selected");
	modeButtons[1].classList.remove("selected");
	this.classList.add("selected");
	numberOfSquares = this.textContent === "Easy" ? 3 : 6 ;
	reset();
}

function setUpSquares() {
	for (var i = 0; i < squares.length; i++) {
		squares[i].addEventListener("click", setUpSquare);
	}
}

function setUpSquare() {
	var clickedColor = this.style.background;
	if(clickedColor === pickedColor) {
		messageDisplay.textContent = "Correct!";
		resetButton.textContent = "Play Again?";
		changeColors(clickedColor);
		h1.style.background = clickedColor;
	} else {
		this.style.background = "#232323";
		messageDisplay.textContent = "Try Again";
	}
}

function changeColors(color) {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.background = color;
	}
}

function reset() {
	colors = generateRandomColors(numberOfSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	for (var i = 0; i < squares.length; i++) {
		if(colors[i]) {
			squares[i].style.background = colors[i];
			squares[i].style.display = "block";
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.background = "steelblue";
}


function generateRandomColors(num) {
	var arr = [];
	for (var i = 0; i < num; i++) {
		arr.push(randomColor());
	}
	return arr;
}
function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function pickColor() {
	var index = Math.floor(Math.random() * colors.length);
	return colors[index];
}