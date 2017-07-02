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
          // add username and id to comment
          newComment.author.id = req.user._id;
          newComment.author.username = req.user.username;
          //save the comment
          newComment.save();
          // connect new comment to campground
          campground.comments.push(newComment);
          campground.save();
          // redirect to campground show page
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

// Show edit form for Comment
router.get("/:comment_id/edit", checkCommentOwnership, function(req, res) {
  Comment.findById(req.params.comment_id, function(err, foundComment) {
    if(err) {
      res.redirect("back");
    } else {
      res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
    }
  });
});

// UPDATE comment
router.put("/:comment_id", checkCommentOwnership, function(req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err) {
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// DESTROY comment route
router.delete("/:comment_id", checkCommentOwnership, function(req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function(err) {
    if(err) {
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// middleware
function checkCommentOwnership(req, res, next) {
  if(req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
      if(err) {
        res.redirect("back");
      } else {
        // does user own the comment?
        if(foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
}

// middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;