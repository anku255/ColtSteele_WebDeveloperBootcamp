var products = require("faker");

console.log("===================");
console.log("WELCOME TO MY SHOP!")
console.log("===================");

for (var i = 0; i < 10; i++) {
	console.log(products.commerce.productName() + " - $" + products.commerce.price());
}
