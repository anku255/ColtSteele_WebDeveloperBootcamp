var express               = require("express")
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");


mongoose.connect("mongodb://localhost/auth_demo_app");
var app = express();

/**
 * Session data is not saved in the cookie itself, just the session ID.
 * @secret - This is the secret used to sign session ID cookie.
 *           This can be either a string for a single secret, or an array of multiple secrets.
 * @resave - Forces the session to be saved back to the session store,
 *           even if the session was never modified during the request.
 * @saveUninitialized - Forces a session that is "uninitialized" to be saved to the store.
 *                      A session is uninitialized when it is new but not modified.
                        Choosing false is useful for implementing login sessions,
                        reducing server storage usage.
 */
app.use(require("express-session")({
  secret: "Rusty is the best and cutest dog in the world",
  resave: false,
  saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

// Here we are using a local strategy (username-password)
// Instead of passing our own authentication function we are 
// using passport-local-mongoose's predefined authenication function
passport.use(new LocalStrategy(User.authenticate()));

// User's authentication details are not passed with every request
// Request only contain user's ID
// serializeUser takes a user and saved user's ID in the session
// deserialzeUser takes the ID from session and returns the user
// Here we are using passport-local-mongoose's predefined functions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ===========
// ROUTES
// ===========

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/secret", isLoggedIn, function(req,res) {
  res.render("secret");
});


// Auth Routes

// show sign up form
app.get("/register", function(req, res) {
  res.render("register");
});

// handling user sign up
app.post("/register", function(req, res) {

  // calling passport-local-mongoose's register method to register a new user
  // it takes user, password and callback as params
  // it saves new user in database and encrypts the password
  User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
    if(err) {
      console.log(err);
      return res.render("register");
    }
    // authenticating user and redirecting to secret page after signup
    passport.authenticate("local")(req, res, function() {
      res.redirect("/secret");
    });
  });

});

// LOGIN ROUTES
// render login form
app.get("/login", function(req, res) {
  res.render("login");
});

// login logic
app.post("/login", passport.authenticate("local", {
  successRedirect: "/secret",
  failureRedirect: "/login" 
}),function(req, res) {
});

// handle logout
app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});


// midlleware function
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.listen("3000", function() {
  console.log("Server started at PORT 3000");
});