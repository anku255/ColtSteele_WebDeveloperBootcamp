var express = require("express");
var app = express();

// Serve the public folder (By default only views folder is served)
app.use(express.static("public"));

// By default files extension will be ejs (files to be rendered)
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	res.render("home");
});

app.get('/fallinlovewith/:thing', function(req, res){
	var thing = req.params.thing;
	res.render("love", {thingVar: thing.toUpperCase()});
});

app.get("/posts", function(req, res) {
	var posts = [
		{title: "Post 1", author: "Suzy"},
		{title: "Post 2", author: "David"},
		{title: "Post 3", author: "Colt"}
	];

	res.render("posts", {posts: posts});
});

app.listen(3000, function(req, res){
	console.log("Server has started at port 3000");
});