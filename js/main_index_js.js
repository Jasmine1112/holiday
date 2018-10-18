$(document).ready( function () {


	//edit profile
	$("#edit_user_button").on("click",function() {

		$(".user_funtionality_div").addClass("hidden");
		$(".student_edit_info_div").removeClass("hidden");

		var request = $.ajax({
			url: "/ajax_php/get_student_info.php",
			dataType: "JSON"
		});


		request.fail(function(xhr, status, error) {
			console.log("failed");
			console.log(xhr);
			console.log(status);
			console.log(error);
		});

		request.done(function(data) {
			var last_name = data['last_name'];
			var first_name = data['first_name'];
			var email = data['email'];
			var phone_number = data['phone_number'];
			var school = data['school'];
			var college = data['college'];
			var major = data['major'];

			$(".student_edit_info_div #last_name_input").val(last_name);
			$(".student_edit_info_div #first_name_input").val(first_name);
			$(".student_edit_info_div #email_input").val(email);
			$(".student_edit_info_div #phone_input").val(phone_number);
			$(".student_edit_info_div #school_input").val(school);
			$(".student_edit_info_div #college_input").val(college);
			$(".student_edit_info_div #major_input").val(major);


		});
	});

	//save change to edit student info
	$(".student_edit_info_div .save_button").on("click",function() {
		var last_name_input = $(".student_edit_info_div #last_name_input").val();
		var first_name_input = $(".student_edit_info_div #first_name_input").val();
		var email_input = $(".student_edit_info_div #email_input").val();
		var phone_input = $(".student_edit_info_div #phone_input").val();
		var school_input = $(".student_edit_info_div #school_input").val();
		var college_input = $(".student_edit_info_div #college_input").val();
		var major_input = $(".student_edit_info_div #major_input").val();

		var request = $.ajax({
			type: 'POST',
			url: "/ajax_php/update_student_info.php",
			data: { last_name_input: last_name_input,
					first_name_input: first_name_input,
					email_input: email_input,
					phone_input: phone_input,
					school_input: school_input,
					college_input: college_input,
					major_input: major_input,
				  }
		});


		request.fail(function(xhr, status, error) {
			console.log("failed");
			console.log(xhr);
			console.log(status);
			console.log(error);
		});

		request.done(function(data) {
			location.reload();

		});
	});



	//cancel the editing of student info
	$(".student_edit_info_div .cancel_button").on("click",function() {
		$(".user_funtionality_div").removeClass("hidden");
		$(".student_edit_info_div").addClass("hidden");
	});














});