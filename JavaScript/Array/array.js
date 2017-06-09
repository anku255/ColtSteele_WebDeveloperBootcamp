function printReverse(arr) {
	for(var i = arr.length-1; i>=0; i--)
		console.log(arr[i]);
}

function isUniform(arr) {
	for(var i =0 ; i<arr.length-1; i++) {
		if(arr[i]!==arr[i+1])
			return false;
	}
	return true;
}

function sumArray(arr) {
	var sum=0;
	for (var i = 0; i < arr.length; i++) {
		sum += arr[i];
	}
	return sum;
}

function max(arr) {
	var maximum = arr[0];
	for (var i = 1; i < arr.length; i++) {
		if(arr[i]>maximum)
			maximum = arr[i];
	}
	return maximum;
}