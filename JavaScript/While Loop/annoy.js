var ans = prompt("Are we there yet?");

while(ans.indexOf("yes") === -1) {
	ans = prompt("Are we there yet?");
}

alert("Yes! We finally made it.");