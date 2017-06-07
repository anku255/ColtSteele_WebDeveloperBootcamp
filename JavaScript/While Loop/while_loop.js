console.log("All numbers between -10 and 19");
var num = -10;
while(num<=19) {
	console.log(num);
	num++;
}

console.log("All even numbers between 10 and 40");
num = 10;
while(num<=40) {
	if(num%2===0)
		console.log(num);
	num++;
}

console.log("All odd numbers between 300 and 333");
num = 300;
while(num<=333) {
	if(num%2!==0)
		console.log(num);
	num++;
}

console.log("All numbers divisible by 5 AND 3 between 5 and 50");
num = 5;
while(num<=50) {
	if((num%5==0) && (num%3==0))
		console.log(num);
	num++;
}