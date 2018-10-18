function display_modal(modal_id) {
	$(".modal").css("display","none");
	$("#"+modal_id).css("display","block");
}

$(document).ready( function () {
	//close the modal when clicking on the exit cross X
	$(".modal .exit").on("click",function() {
		$(".modal").css("display","none");
	});


});
