var express = require('express');
var router  = express.Router();
var Campground = require("../models/campground");

// INDEX - show all campgrounds
router.get("/", function(req, res) {
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
router.get("/new", function(req, res) {
  res.render("campgrounds/new")
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res) {
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
router.post("/", function(req, res) {
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

module.exports = router;