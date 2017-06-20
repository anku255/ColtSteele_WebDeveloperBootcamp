var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// Teling express to use body-parser
// body-parser parses the req.body into a JS object
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];

app.get("/", function(req, res) {
	res.render("home");
})

app.post("/addfriend", function(req, res) {
	var newFriend = req.body.newfriend; // Works only if we install body-parser
	friends.push(newFriend);
	res.redirect("/friends");
});

app.get("/friends",function(req, res) {
	res.render("friends",{friends: friends});
});

app.listen(3000,function(req,res){
	console.log("Server has started at 3000");
})