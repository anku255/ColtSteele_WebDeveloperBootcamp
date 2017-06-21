var mongoose = require("mongoose");
// connect to the Mongo database
mongoose.connect("mongodb://localhost/cat_app");

// schema for a cat
var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

// defining a model and saving it to var Cat
// Here the first @param refers to a single object in collection
// passing in "Cat" will create a cats collection
// We can intereact with the collection using Cat variable
var Cat = mongoose.model("Cat", catSchema);

// adding a new cat to the DB
// var george = new Cat({
// 	name: "Mrs. Norris",
// 	age: 7,
// 	temperament: "Evil"
// });

// george.save(function(err, cat){
// 	if(err) {
// 		console.log("SOMETHING WENT WRONG!");
// 	} else {
// 		console.log("WE JUST SAVED A CAT TO THE DB:");
// 		console.log(cat);
// 	}
// });


// Another way to insert a cat into the collection
Cat.create({
	name: "Snow White",
	age: 15,
	temperament: "Bland"
}, function(err, cat) {
	if(err) {
		console.log(err);
	} else {
		console.log(cat);
	}
});

// retrieve all cats from the DB and console.log each one
Cat.find({}, function(err, cats) {
	if(err) {
		console.log("OH NO, ERROR!!");
		console.log(err);
	} else {
		console.log("ALL THE CAT......");
		console.log(cats);
	}
});