var movies = [{
				title: "3 Idiots", 
				rating:5,
				hasWatched:true
			},
			{
				title: "Bahubali", 
				rating:4,
				hasWatched:true
			},
			{
				title: "Spectre", 
				rating:3.5,
				hasWatched:false
			}];

movies.forEach(function(movie){
	console.log(buildString(movie));
});

function buildString(movie) {
	var result = "You have ";
	if(movie.hasWatched)
		result += "watched ";
	else
		result += "not seen ";

	result += "\"" + movie.title + "\" - " + movie.rating + " stars";
	return result;
}