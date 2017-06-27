var express 	= require("express"),
	bodyParser  = require("body-parser"),
	mongoose 	  = require("mongoose"),
	Campground  = require("./models/campground"),
	app     	  = express();

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");



// Campground.create(
// 	{
// 		name: "Salmon Creek", 
// 		image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg",
// 		description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
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

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res) {
	// Get all the campgrounds from DB
	Campground.find({},function(err, campgrounds) {
		if(err) {
			console.log(err);
		} else {
			res.render("index", {campgrounds: campgrounds});

		}
	});


});

// NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
	res.render("new")
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
	// find the camground with provided ID
	Campground.findById(req.params.id, function(err, foundCampground) {
		if(err) {
			console.log(err);
		} else {
			// render show template with that campground
			res.render("show", {campground: foundCampground});
		}
	});
});

// CREATE - add new campground to DB
app.post("/campgrounds", function(req, res) {
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {
		name: name,
		image: image,
		description: desc
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