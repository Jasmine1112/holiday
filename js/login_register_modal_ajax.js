$(document).ready( function () {
	$("#toggle_button").on("click",function() {
		$("#login_form_div").toggleClass("hidden");
		$("#register_form_div").toggleClass("hidden");
	});
	
	//check log in username and password in login modal
	$("#login_form #login_button").on("click",function() {
		var email_input = $("#login_form #login_email_input").val();
		var password_input = $("#login_form #login_password_input").val();


		var request = $.ajax({
			type: 'POST',
			url: "/ajax_php/check_login.php",
			dataType: 'text',
			data: { email_input: email_input, 
					password_input: password_input
				  }
		});


		request.fail(function(xhr, status, error) {
			console.log("failed");
			console.log(xhr);
			console.log(status);
			console.log(error);
		});

		request.done(function(data) {
			// $("#login_form_div").css("display","none");
			console.log(data);
			location.reload();
		});
	});

	//register username and password in login modal
	$("#register_form #register_button").on("click",function() {
		// var username_input = $("#register_form #register_username_input").val();
		var first_name_input = $("#register_form #register_first_name_input").val();
		var last_name_input = $("#register_form #register_last_name_input").val();
		var email_input = $("#register_form #register_email_input").val();
		var password_input = $("#register_form #register_password_input").val();
		var password_again_input = $("#register_form #register_password_again_input").val();
		var type_input = $("#register_form #register_type_input").val();

		if (!first_name_input || !last_name_input || !email_input || !password_input || !password_input) {
			//check for empty input fields
			alert("fill out all fields!");
		}
		else if (password_input!=password_again_input) {
			alert("retype your password! Not the same");
		}else{
			var request = $.ajax({
				type: 'POST',
				url: "/ajax_php/register_user.php",
				data: { //username_input: username_input, 
						first_name_input: first_name_input,
						last_name_input: last_name_input,
						email_input: email_input, 
						password_input: password_input,
						type_input: type_input
					  }
			});


			request.fail(function(xhr, status, error) {
				console.log("failed");
				console.log(xhr);
				console.log(status);
				console.log(error);
			});

			request.done(function(data) {
				$("#register_form_div").addClass("hidden");
				$("#login_form_div").removeClass("hidden");
				$("#toggle_button").prop("checked",false);
			});
		}
		
	});


	//log out
	$("#log_out_span").on("click",function() {

		var request = $.ajax({
			type: 'POST',
			url: "/ajax_php/logout_user.php"
		});


		request.fail(function(xhr, status, error) {
			console.log("failed");
			console.log(xhr);
			console.log(status);
			console.log(error);
		});

		request.done(function(data) {
			console.log("hiiii");
			location.reload();
		});
	});

});