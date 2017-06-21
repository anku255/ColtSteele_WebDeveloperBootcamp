var express 	= require("express"),
	app     	= express(),
	bodyParser  = require("body-parser"),
	mongoose 	= require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 		name: "Salmon Creek", 
// 		image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg"
// 	}, function(err, campground) {
// 		if(err) {
// 			console.log(err);
// 		} else {
// 			console.log("NEWLY CREATED CAMPGROUND");
// 			console.log(campground);
// 		}
// 	});

app.get("/", function(req, res) {
	res.render("landing");
});

app.get("/campgrounds", function(req, res) {
	// Get all the campgrounds from DB
	Campground.find({},function(err, campgrounds) {
		if(err) {
			console.log(err);
		} else {
			res.render("campgrounds", {campgrounds: campgrounds});

		}
	});


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
	// Add newCampground to the database
	Campground.create(newCampground, function(err,newlyCreated) {
		if(err) {
			console.log(err);
		} else {
			// redirect back to camgrounds page
			res.redirect("/campgrounds");
		}
	});
	
});

app.listen(3000, function(req, res) {
	console.log("The YelpCamp server has started at PORT 3000");
});