var bodyParser  = require("body-parser"),
	mongoose    = require("mongoose"),
    express 	= require("express"),
	app     	= express();

// APP CONFIG

// connect to MongoDB
mongoose.connect("mongodb://localhost/restful_blog_app");
// tell express to use "ejs" as our templating engine
app.set("view engine", "ejs");
//serve public directory
app.use(express.static("public"));
// use body parser to parse req.body into a JS object
app.use(bodyParser.urlencoded({extended: true}));

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

app.get("/blogs", function(req, res) {
	Blog.find({}, function(err, blogs) {
		if(err) {
			console.log(err);
		} else {
			res.render("index", {blogs: blogs});
		}
	});
});



app.listen(3000, function() {
	console.log("Server has started at PORT 3000");
});