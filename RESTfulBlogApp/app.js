var bodyParser    = require("body-parser"),
	methodOveride = require("method-override"),
	expressSanitizer = require("express-sanitizer"),
	mongoose      = require("mongoose"),
    express 	  = require("express"),
	app     	  = express();

// APP CONFIG

// connect to MongoDB
mongoose.connect("mongodb://localhost/restful_blog_app");
// tell express to use "ejs" as our templating engine
app.set("view engine", "ejs");
//serve public directory
app.use(express.static("public"));
// use body parser to parse req.body into a JS object
app.use(bodyParser.urlencoded({extended: true}));
// use method-override to override form POST request into PUT request
app.use(methodOveride("_method"));
// use expressSanitizer to sanitize the input given by user
app.use(expressSanitizer());

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
	title: String,
	image: String ,
	body: String,
	created: {type: Date, default: Date.now} // If no date is given then use current date
});

var Blog = mongoose.model("Blog", blogSchema);

// RESTFUL ROUTES

app.get("/", function(req, res) {
	res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", function(req, res) {
	Blog.find({}, function(err, blogs) {
		if(err) {
			console.log(err);
		} else {
			res.render("index", {blogs: blogs});
		}
	});
});

// NEW ROUTE
app.get("/blogs/new", function(req, res) {
	res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res) {
	// create blog
	// sanitize the input
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog , function(err, newBlog) {
		if(err) {
			res.render("new");
		} else {
			// redirect to the index
			res.redirect("/blogs");
		}
	}); 
	
});


// SHOW ROUTE
app.get("/blogs/:id", function(req, res) {
	Blog.findById(req.params.id, function(err, foundBlog) {
		if(err) {
			res.redirect("/blogs");
		} else {
			res.render("show",{blog: foundBlog});
		}
	});
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res) {
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err) {
			res.redirect("/blogs");
		} else {
			res.render("edit", {blog: foundBlog});
		}
	});
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res) {
	// sanitize the input
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
		if(err) {
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

// DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
	// destroy blog
	Blog.findByIdAndRemove(req.params.id, function(err) {
		if(err) {
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
		}
	});
});

app.listen(3000, function() {
	console.log("Server has started at PORT 3000");
});