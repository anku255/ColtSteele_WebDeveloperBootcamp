var express    = require('express');
var router     = express.Router({mergeParams: true}); // mergeParams will pass req.params in this file
var Campground = require("../models/campground");
var Comment    = require("../models/comment");
var middleware = require("../middleware");

// Comments New
router.get("/new", middleware.isLoggedIn, function(req, res) {
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
router.post("/", middleware.isLoggedIn, function(req, res) {
  // lookup campgroud using ID
  Campground.findById(req.params.id, function(err, campground) {
    if(err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      // create a new comment
      Comment.create(req.body.comment, function(err, newComment) {
        if(err) {
          req.flash("error", "Something went wrong");
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
          req.flash("success", "Successfully added comment");
          // redirect to campground show page
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

// Show edit form for Comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
  Comment.findById(req.params.comment_id, function(err, foundComment) {
    if(err) {
      res.redirect("back");
    } else {
      res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
    }
  });
});

// UPDATE comment
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err) {
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// DESTROY comment route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function(err) {
    if(err) {
      res.redirect("back");
    } else {
      req.flash("success", "Comment deleted");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

module.exports = router;