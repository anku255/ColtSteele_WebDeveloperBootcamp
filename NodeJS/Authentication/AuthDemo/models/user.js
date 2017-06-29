var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = mongoose.Schema({
  username: String,
  password: String
});

// Adding passport-local-mongoose plugin to UserSchema
// Now User will contain every passport-local-mongoose's functions
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);