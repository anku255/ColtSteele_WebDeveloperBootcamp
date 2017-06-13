function Player(displayId, buttonId) {
	this.display = document.querySelector("#"+ displayId);
	this.button = document.querySelector("#" + buttonId);
	this.score = 0;
}

var playerOne = new Player("p1Display","p1");
var playerTwo = new Player("p2Display","p2");
var winningScoreDisplay = document.querySelector("#winningScore");
var winnigScore = 5;
var gameOver = false;
var resetButton = document.querySelector("#reset");
var numInput = document.querySelector("input");

playerOne.button.addEventListener("click", function(){
	changeScore(playerOne);
});

playerTwo.button.addEventListener("click", function(){
	changeScore(playerTwo);
});

resetButton.addEventListener("click", function() {
	reset();
})

numInput.addEventListener("change", function() {
	reset();
	winningScoreDisplay.textContent = this.value;
	winnigScore = Number(this.value);
})

function changeScore(player) {
	if(!gameOver) {
		player.score++;
		player.display.textContent = player.score;
		if(player.score === winnigScore) {
			player.display.classList.add("winner");
			gameOver = true;
		}
	}
}

function reset() {
	playerOne.score = 0;
	playerTwo.score = 0;
	playerOne.display.textContent = 0;
	playerTwo.display.textContent = 0;
	playerOne.display.classList.remove("winner");
	playerTwo.display.classList.remove("winner");
	gameOver = false;
}