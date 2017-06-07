function isEven(num) {
	if(num%2===0)
		return true;
	return false;
}

function factorial(num) {
	var fac=1;
	while(num>0) {
		fac *= num;
		num--;
	}
	return fac;
}

function kebabToSnake(str) {
	return str.replace(/-/g, "_");
}