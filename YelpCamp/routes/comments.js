var express    = require('express');
var router     = express.Router({mergeParams: true}); // mergeParams will pass req.params in this file
var Campground = require("../models/campground");
var Comment    = require("../models/comment");

// Comments New
router.get("/new", isLoggedIn, function(req, res) {
  // Find campground by ID
  Campground.findById(req.params.id, function(err, campground) {
    if(err) {
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  });
});

// Comments Create
router.post("/", isLoggedIn, function(req, res) {
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

// middleware function to check if user is logged in
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;