var express = require("express");
var app = express();

app.set("view engine", "ejs");



app.get("/", function(req, res) {
	res.render("landing");
});

app.get("/campgrounds", function(req, res) {
	var campgrounds = [
		{name: "Salmon Creek", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"},
		{name: "Granite Hill", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
		{name: "Mountain Goat's Rest", image: "https://farm3.staticflickr.com/2535/3823437635_c712decf64.jpg"}
	]

	res.render("campgrounds", {campgrounds: campgrounds});

});

app.listen(3000, function(req, res) {
	console.log("The YelpCamp server has started at PORT 3000");
});