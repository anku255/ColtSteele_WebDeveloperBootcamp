// Check Off Specific Todos By Clicking
$("ul").on("click", "li", function() {
	$(this).toggleClass("completed");
});

// Click on X to delete the Todo
$("ul").on("click", "span", function(event) {
	$(this).parent().fadeOut(500,function() {
		$(this).remove();
	});
	event.stopPropagation();
});

// Pressing enter in input will add a new todo
$("input[type='text']").keypress(function(event) {
	if(event.which === 13) {
		// Grabbing new todo text from input
		var todoText = $(this).val();
		// Clear the input
		$(this).val("");
		// Create a new li and add to ul
		$("ul").append("<li><span><i class='fa fa-trash' aria-hidden='true'></i></span> " 
			+ todoText + "</li>");

	}
});

// Clicking on pencil icon will display/hide input
$(".fa-pencil-square-o").click(function(){
	$("input[type='text']").fadeToggle();
});