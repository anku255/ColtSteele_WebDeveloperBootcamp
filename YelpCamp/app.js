var express 	= require("express"),
	bodyParser  = require("body-parser"),
	mongoose 	  = require("mongoose"),
	Campground  = require("./models/campground"),
	Comment     = require("./models/comment"),
	seedDB      = require("./seeds"),
	app     	  = express();

mongoose.Promise = require("bluebird");
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); // __dirname gives the pwd

seedDB();

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
			res.render("campgrounds/index", {campgrounds: campgrounds});

		}
	});
});

// NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
	res.render("campgrounds/new")
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
	// find the camground with provided ID
	// populate the comments array inside them
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
		if(err) {
			console.log(err);
		} else {
			// render show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});
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
// ================
// COMMENTS ROUTES
// ================

app.get("/campgrounds/:id/comments/new", function(req, res) {
	// Find campground by ID
	Campground.findById(req.params.id, function(err, campground) {
		if(err) {
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});

app.post("/campgrounds/:id/comments", function(req, res) {
	// lookup campgroud using ID
	Campground.findById(req.params.id, function(err, campground) {
		if(err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			// create a new comment
			Comment.create(req.body.comment, function(err, newComment) {
				if(err) {
					console.log(err);
				} else {
					// connect new comment to campground
					campground.comments.push(newComment);
					campground.save();
					// redirect to campground show page
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
})

app.listen(3000, function(req, res) {
	console.log("The YelpCamp server has started at PORT 3000");
});