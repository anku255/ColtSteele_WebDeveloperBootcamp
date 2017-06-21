var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var campgrounds = [
		{name: "Salmon Creek", image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"},
		{name: "Granite Hill", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
		{name: "Mountain Goat's Rest", image: "https://farm3.staticflickr.com/2535/3823437635_c712decf64.jpg"}
	]

app.get("/", function(req, res) {
	res.render("landing");
});

app.get("/campgrounds", function(req, res) {

	res.render("campgrounds", {campgrounds: campgrounds});

});

app.get("/campgrounds/new", function(req, res) {
	res.render("new")
});

app.post("/campgrounds", function(req, res) {
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {
		name: name,
		image: image
	};
	campgrounds.push(newCampground);
	// redirect back to camgrounds page
	res.redirect("/campgrounds");
});

app.listen(3000, function(req, res) {
	console.log("The YelpCamp server has started at PORT 3000");
});