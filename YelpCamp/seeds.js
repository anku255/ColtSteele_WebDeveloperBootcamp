var mongoose   = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");

var data = [
    {
      name: "Cloud's Rest",
      image: "https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      name: "Desert Mesa",
      image: "https://farm4.staticflickr.com/3751/9580653400_e1509d6696.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      name: "Canyon Floor",
      image: "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }
];

function seedDB() {
  // Remove all campgrounds
  Campground.remove({}, function(err) {
    // if(err) {
    //   console.log(err);
    // } else {
    //   console.log("Removed all campgrounds");

    //   // Add new campgrounds
    //   data.forEach(function(seed) {
    //     Campground.create(seed, function(err, campground) {
    //       if(err) {
    //         console.log(err);
    //       } else {
    //         console.log("Added a campground");
    //         // // Create a comment
    //         // Comment.create(
    //         //   {
    //         //     text: "This place is great, but I wish there was internet",
    //         //     author: "Homer"
    //         //   }, function(err, comment) {
    //         //     if(err) {
    //         //       console.log(err);
    //         //     } else {
    //         //       campground.comments.push(comment);
    //         //       campground.save();
    //         //       console.log("Created new comment");
    //         //     }

    //         //   });
    //       }
    //     });
    //   });
    // }
  });
}

module.exports = seedDB;