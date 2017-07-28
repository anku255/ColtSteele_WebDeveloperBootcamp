var express 	   = require("express"),
	LocalStrategy  = require("passport-local"),
	methodOverride = require("method-override"),
	bodyParser     = require("body-parser"),
	mongoose 	  	 = require("mongoose"),
	flash 				 = require("connect-flash"),
	passport			 = require("passport"),
	Campground  	 = require("./models/campground"),
	Comment     	 = require("./models/comment"),
	User					 = require("./models/user"),
	seedDB      	 = require("./seeds"),
	app     	  	 = express();

var commentRoutes = require("./routes/comments"),
		campgroundRoutes = require("./routes/campgrounds"),
		indexRoutes      = require("./routes/index");

mongoose.Promise = require("bluebird");
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); // __dirname gives the pwd
app.use(methodOverride("_method"));
app.use(flash());

// seedDB(); // seed the database

// PASSPORT CONFIGURATION
app.use(require('express-session')({
	secret: "Once again Rusty wins cutest dog!",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// A middleware to pass currentUser in all routes
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

// Use all routes
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, function(req, res) {
	console.log("The YelpCamp server has started at PORT 3000");
});