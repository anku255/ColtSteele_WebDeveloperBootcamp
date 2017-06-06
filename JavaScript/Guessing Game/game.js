// Secret Number
var secretNumber = 8;

// ask user for guess
var guess = Number(prompt("Guess a number"));

//check if guess is right
if(guess === secretNumber) {
	alert("YOU GOT IT RIGHT!")
}

// check if guess is greater than secretNumber
else if(guess > secretNumber) {
	alert("Too high. Guess again!")
}

else {
	alert("Too low. Guess again!")
}