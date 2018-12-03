
// function month_int_text(month_int) {
// 	var month = new Array(12);
// 	month[0] = "January";
// 	month[1] = "February";
// 	month[2] = "March";
// 	month[3] = "April";
// 	month[4] = "May";
// 	month[5] = "June";
// 	month[6] = "July";
// 	month[7] = "August";
// 	month[8] = "September";
// 	month[9] = "October";
// 	month[10] = "November";
// 	month[11] = "December";
// 	return month[month_int];
// }

// function month_text_int(month_text) {
// 	var month = new Array(12);
// 	month["January"] = 0;
// 	month["February"] = 1;
// 	month["March"] = 2;
// 	month["April"] = 3;
// 	month["May"] = 4;
// 	month["June"] = 5;
// 	month["July"] = 6;
// 	month["August"] = 7;
// 	month["September"] = 8;
// 	month["October"] = 9;
// 	month["November"] =10 ;
// 	month["December"] =11 ;
// 	return month[month_text];
// }

// function weekday_int_text(weekday_int) {
// 	var weekday = new Array(7);
// 	weekday[0] =  "Sunday";
// 	weekday[1] = "Monday";
// 	weekday[2] = "Tuesday";
// 	weekday[3] = "Wednesday";
// 	weekday[4] = "Thursday";
// 	weekday[5] = "Friday";
// 	weekday[6] = "Saturday";
// 	return weekday[weekday_int];
// }

// function weekday_text_int(weekday_text) {
// 	var weekday = new Array(7);
// 	weekday["Sunday"] = 0;
// 	weekday["Monday"] = 1;
// 	weekday["Tuesday"] = 2;
// 	weekday["Wednesday"] = 3;
// 	weekday["Thursday"] = 4;
// 	weekday["Friday"] = 5;
// 	weekday["Saturday"] = 6;
// 	return weekday[weekday_text];
// }

// function getNextDayOfWeek(dayOfWeek) {
// 	var date = new Date();
//     var resultDate = new Date(date.getTime());

//     resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);

//     return resultDate;
// }

function display_appointments(appoint_type) {

	var request = $.ajax({
		type: 'POST',
		url: "/ajax_php/get_schedules_in_edit_appointment.php",
		dataType: 'JSON',
		data: {
			appoint_type: appoint_type
		}
	});

	request.fail(function(xhr, status, error) {
		console.log("failed");
		console.log(xhr);
		console.log(status);
		console.log(error);
	});

	request.done(function(data) {
		var logged_user_id = $("#logged_user_id").val();
		
		//display the 3 div!!!
		if (appoint_type=="waiting_request") {
			$("#waiting_request_table .waiting_request_rows").remove();
			$("#empty_waiting_request_span").remove();

			if (data.length==0) {
				$("#waiting_request_table").after("<span id='empty_waiting_request_span' class='none_result_span'>None</span>");
			}else{
				for (var i = 0; i < data.length; i++) {
					var schedule = data[i];
					
					var tr_str = "<tr class='waiting_request_rows'>";

					if ((schedule.user_id_1==logged_user_id && schedule.seen_by_user1=='false') || (schedule.user_id_2==logged_user_id && schedule.seen_by_user2=='false')) {
						tr_str += "<th><span class='new_red_circle'></span>"+schedule.meeting_subject+"</th>";
					}else{
						tr_str += "<th>"+schedule.meeting_subject+"</th>";
					}

					tr_str += "<th>"+schedule.first_name+" "+schedule.last_name+"</th>";
					tr_str += "<th>"+schedule.time+"</th>";
					tr_str += "<th>"+schedule.location+"</th>";
					tr_str += "<th><span class='action_button green_button approve_request' id='approve_request_"+schedule.schedule_id+"' onClick='display_change_schedule("+JSON.stringify(schedule)+")'>Approve</span>";
					tr_str += "<span class='action_button red_button decline_request' id='decline_request_"+schedule.schedule_id+"'>Decline</span>";
					tr_str += "</tr>";
					$("#waiting_request_table").append(tr_str);
				}
			}
			
			
		}else if (appoint_type=="request_status") {
			$("#request_status_table .request_status_rows").remove();
			$("#empty_request_status_span").remove();

			if (data.length==0) {
				$("#request_status_table").after("<span id='empty_request_status_span' class='none_result_span'>None</span>");
			}else{
				for (var i = 0; i < data.length; i++) {
					var schedule = data[i];
					// console.log(schedule.user_id_1, schedule.seen_by_user1);
					
					var tr_str = "<tr class='request_status_rows'>";

					if ((schedule.user_id_1==logged_user_id && schedule.seen_by_user1=='false') || (schedule.user_id_2==logged_user_id && schedule.seen_by_user2=='false')) {
						tr_str += "<th><span class='new_red_circle'></span>"+schedule.meeting_subject+"</th>";
					}else{
						tr_str += "<th>"+schedule.meeting_subject+"</th>";
					}

					tr_str += "<th>"+schedule.first_name+" "+schedule.last_name+"</th>";
					tr_str += "<th>"+schedule.time+"</th>";
					tr_str += "<th>"+schedule.location+"</th>";
					tr_str += "<th><span class='wait_button'>Waiting</span></th>";
					tr_str += "</tr>";
					$("#request_status_table").append(tr_str);
				}
			}
			
		}else if (appoint_type=="upcoming_schedules") {
			// console.log(data);
			$("#upcoming_schedules_table .upcoming_schedules_rows").remove();
			$("#empty_upcoming_schedules_span").remove();

			if (data.length==0) {
				$("#upcoming_schedules_table").after("<span id='empty_upcoming_schedules_span' class='none_result_span'>None</span>");
			}else{
				for (var i = 0; i < data.length; i++) {
					var schedule = data[i];

					
					var tr_str = "<tr class='upcoming_schedules_rows'>";

					if ((schedule.user_id_1==logged_user_id && schedule.seen_by_user1=='false') || (schedule.user_id_2==logged_user_id && schedule.seen_by_user2=='false')) {
						tr_str += "<th><span class='new_red_circle'></span>"+schedule.meeting_subject+"</th>";
					}else{
						tr_str += "<th>"+schedule.meeting_subject+"</th>";
					}

					tr_str += "<th>"+schedule.first_name+" "+schedule.last_name+"</th>";
					tr_str += "<th>"+schedule.time+"</th>";
					tr_str += "<th>"+schedule.location+"</th>";
					tr_str += "<th><span class='action_button red_button change_upcoming' id='change_"+schedule.schedule_id+"' onClick='display_change_schedule("+JSON.stringify(schedule)+")'>Change</span>";
					tr_str += "<span class='action_button grey_button cancel_upcoming' id='cancel_"+schedule.schedule_id+"'>Cancel</span>";
					tr_str += "</th>"; 
					tr_str += "</tr>";
					$("#upcoming_schedules_table").append(tr_str);
				}
			}
			
		}else if (appoint_type=="past_schedules") {
			// console.log(data);
			$("#past_schedules_table .past_schedules_rows").remove();
			$("#empty_past_schedules_span").remove();

			if (data.length==0) {
				$("#past_schedules_table").after("<span id='empty_past_schedules_span' class='none_result_span'>None</span>");
			}else{
				for (var i = 0; i < data.length; i++) {
					var schedule = data[i];
					
					var tr_str = "<tr class='past_schedules_rows'>";

					if ((schedule.user_id_1==logged_user_id && schedule.seen_by_user1=='false') || (schedule.user_id_2==logged_user_id && schedule.seen_by_user2=='false')) {
						tr_str += "<th><span class='new_red_circle'></span>"+schedule.meeting_subject+"</th>";
					}else{
						tr_str += "<th>"+schedule.meeting_subject+"</th>";
					}

					tr_str += "<th>"+schedule.first_name+" "+schedule.last_name+"</th>";
					tr_str += "<th>"+schedule.time+"</th>";
					tr_str += "<th>"+schedule.location+"</th>";
					tr_str += "<th><a href='schedule_appointment.php?name="+schedule.username+"&department="+schedule.college_department+"&subject="+schedule.meeting_subject+"&note="+schedule.notes+"' class='action_button red_button reschedule_past' id='reschedule_"+schedule.schedule_id+"'>Reschedule</a>";
					tr_str += "</th>";
					tr_str += "</tr>";

					$("#past_schedules_table").append(tr_str);
				}
			}
			
			
		}
	});
}

function display_change_schedule(schedule) {
	//display the input from display schedule to be changed
	// console.log(schedule);
	var name = schedule.username;
	var department = schedule.college_department;
	var location = schedule.location;
	var meeting_subject = schedule.meeting_subject;
	var notes = schedule.notes;

	var time = schedule.time;
	var t = time.split(/[- :]/);
	var year = t[0];
	var month = t[1];
	var date = t[2];
	var hour =t[3];
	var minute = t[4];

	$("#schedule_info_div #hidden_schedule_id").val(schedule.schedule_id);

	$("#schedule_info_div #name_span").text(name);
	$("#schedule_info_div #department_span").text(department);
	$("#schedule_info_div #date_input").val(year+"-"+month+"-"+date);
	$("#schedule_info_div #time_input").val(hour+":"+minute);
	$("#schedule_info_div #location_input").val(location);
	$("#schedule_info_div #meeting_subject_input").val(meeting_subject);
	$("#schedule_info_div #notes_input").val(notes);


	
}


function update_seen() {
	var request = $.ajax({
		type: 'GET',
		url: "/ajax_php/change_schedule_to_seen.php"
	});

	request.fail(function(xhr, status, error) {
		console.log("failed");
		console.log(xhr);
		console.log(status);
		console.log(error);
	});

	request.done(function(data) {
		console.log("hi");
	});
}

//set all schedules to seen
// $(window).on('load', function() {
// 	var request = $.ajax({
// 		type: 'GET',
// 		url: "/ajax_php/change_schedule_to_seen.php"
// 	});

// 	request.fail(function(xhr, status, error) {
// 		console.log("failed");
// 		console.log(xhr);
// 		console.log(status);
// 		console.log(error);
// 	});

// 	request.done(function(data) {
// 		console.log("hi2");
// 	});

// });





$(document).ready( function () {
	display_appointments("waiting_request");
	display_appointments("request_status");
	display_appointments("upcoming_schedules");
	display_appointments("past_schedules");

	update_seen();
	

	$(document).on("click", ".change_upcoming",function(event) {
		$("#change_schedule_modal").css("display","block");
	});

	$(document).on("click",".cancel_upcoming",function(event) {
		$("#confirm_cancel_modal").css("display","block");
		var schedule_id = $(this).attr("id").replace("cancel_","");
		$("#hidden_schedule_id").val(schedule_id);
		
	});

	$("#change_schedule_modal #save_change_button").on("click",function(event) {
		var schedule_id = $("#hidden_schedule_id").val();
		var date_input = $("#schedule_info_div #date_input").val();
		var time_input = $("#schedule_info_div #time_input").val();
		var location_input = $("#schedule_info_div #location_input").val();
		var meeting_subject_input = $("#schedule_info_div #meeting_subject_input").val();
		var notes_input = $("#schedule_info_div #notes_input").val();

		var hour_input = time_input.split(":")[0];
		var minute_input = time_input.split(":")[1];

		var date_lst = date_input.split("-");

		if (date_lst.length==3 || date_input=="") {
			var year_input = parseInt(date_lst[0]);
			var month_input = parseInt(date_lst[1]);
			var day_input = parseInt(date_lst[2]);
			if ((!isNaN(year_input) && !isNaN(month_input) && !isNaN(day_input)) || date_input=="") {
				var request = $.ajax({
					type: 'POST',
					url: "/ajax_php/change_schedule.php",
					data: {
						schedule_id: schedule_id,
						year: year_input,
						month: month_input,
						date: day_input,
						hour: hour_input,
						minute: minute_input,
						location: location_input,
						meeting_subject: meeting_subject_input,
						notes: notes_input
					}
				});

				request.fail(function(xhr, status, error) {
					console.log("failed");
					console.log(xhr);
					console.log(status);
					console.log(error);
				});

				request.done(function(data) {
					$("#change_schedule_modal").css("display","none");
					display_appointments("upcoming_schedules");
				});
			}else{
				//if some of the numbers cannot be parsed as int
				alert("Please follow the date format: yyyy-mm-dd");
			}
		}else{
			//if there's no two '-'
			alert("Please follow the date format: yyyy-mm-dd");
		}

		
	});

	$("#cancel_schedule_button").on("click",function(event) {
		var schedule_id = $("#hidden_schedule_id").val();

		var request = $.ajax({
			type: 'GET',
			url: "/ajax_php/cancel_schedule.php",
			data: {
				schedule_id: schedule_id
			}
		});

		request.fail(function(xhr, status, error) {
			console.log("failed");
			console.log(xhr);
			console.log(status);
			console.log(error);
		});

		request.done(function(data) {
			$("#confirm_cancel_modal").css("display","none");
			display_appointments("upcoming_schedules");
			display_appointments("past_schedules");
		});
	});


	//approve request
	$(document).on("click", ".approve_request",function(event) {
		var schedule_id = $(this).attr("id").replace("approve_request_","");
		console.log(schedule_id);

		var request = $.ajax({
			type: 'GET',
			url: "/ajax_php/approve_pending_schedule.php",
			data: {
				schedule_id: schedule_id
			}
		});

		request.fail(function(xhr, status, error) {
			console.log("failed");
			console.log(xhr);
			console.log(status);
			console.log(error);
		});

		request.done(function(data) {
			display_appointments("waiting_request");
			display_appointments("upcoming_schedules");
		});
	});

	//decline request
	$(document).on("click", ".decline_request",function(event) {
		var schedule_id = $(this).attr("id").replace("decline_request_","");

		var request = $.ajax({
			type: 'GET',
			url: "/ajax_php/decline_pending_schedule.php",
			data: {
				schedule_id: schedule_id
			}
		});

		request.fail(function(xhr, status, error) {
			console.log("failed");
			console.log(xhr);
			console.log(status);
			console.log(error);
		});

		request.done(function(data) {
			display_appointments("waiting_request");
			display_appointments("past_schedules");
		});
	});







	$(".back_to_schedule_button").on("click",function() {
		$(".confirmation_modal").css("display","none");
	});


	//
	// $("#schedule_appointment_confirmation_modal .close_modal_button").on("click",function(event) {
	// 	$("#proposed_location_input").remove();
	// 	$("#schedule_appointment_confirmation_modal").css("display","none");
	// });

	// $("#successful_schedule_confirmation_modal .close_modal_button").on("click",function(event) {
	// 	$("#successful_schedule_confirmation_modal").css("display","none");
	// });










});