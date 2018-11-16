
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
		
		//display the 3 div!!!
		if (appoint_type=="request_status") {
			$("#request_status_table .request_status_rows").remove();
			for (var i = 0; i < data.length; i++) {
				var schedule = data[i];
				
				var tr_str = "<tr class='request_status_rows'>";
				tr_str += "<th>"+schedule.meeting_subject+"</th>";
				tr_str += "<th>"+schedule.first_name+" "+schedule.last_name+"</th>";
				tr_str += "<th>"+schedule.time+"</th>";
				tr_str += "<th>"+schedule.location+"</th>";
				tr_str += "<th><span class='action_button red_button wait_button'>Waiting</span></th>";

				$("#request_status_table").append(tr_str);
			}
			
		}else if (appoint_type=="upcoming_schedules") {
			// console.log(data);
			$("#upcoming_schedules_table .upcoming_schedules_rows").remove();
			for (var i = 0; i < data.length; i++) {
				var schedule = data[i];
				
				var tr_str = "<tr class='upcoming_schedules_rows'>";
				tr_str += "<th>"+schedule.meeting_subject+"</th>";
				tr_str += "<th>"+schedule.first_name+" "+schedule.last_name+"</th>";
				tr_str += "<th>"+schedule.time+"</th>";
				tr_str += "<th>"+schedule.location+"</th>";
				tr_str += "<th><span class='action_button red_button change_upcoming' id='change_"+schedule.schedule_id+"'>Change</span>";
				tr_str += "<span class='action_button grey_button cancel_upcoming' id='cancel_"+schedule.schedule_id+"'>Cancel</span>";
				tr_str += "</th>"; 

				$("#upcoming_schedules_table").append(tr_str);
			}
		}else if (appoint_type=="past_schedules") {
			// console.log(data);
			$("#past_schedules_table .past_schedules_rows").remove();
			for (var i = 0; i < data.length; i++) {
				var schedule = data[i];
				
				var tr_str = "<tr class='past_schedules_rows'>";
				tr_str += "<th>"+schedule.meeting_subject+"</th>";
				tr_str += "<th>"+schedule.first_name+" "+schedule.last_name+"</th>";
				tr_str += "<th>"+schedule.time+"</th>";
				tr_str += "<th>"+schedule.location+"</th>";
				tr_str += "<th><a href='schedule_appointment.php?name="+schedule.username+"&department="+schedule.college_department+"&subject="+schedule.meeting_subject+"&note="+schedule.notes+"' class='action_button red_button reschedule_past' id='reschedule_"+schedule.schedule_id+"'>Reschedule</a>";
				tr_str += "</th>";

				$("#past_schedules_table").append(tr_str);
			}
		}
	});
}

$(document).ready( function () {
	display_appointments("request_status");
	display_appointments("upcoming_schedules");
	display_appointments("past_schedules");
	

	$(document).on("click", ".change_upcoming",function(event) {
		// body...
	});

	$(document).on("click",".cancel_upcoming",function(event) {
		$("#confirm_cancel_modal").css("display","block");
		var schedule_id = $(this).attr("id").replace("cancel_","");
		$("#hidden_schedule_id").val(schedule_id);
		
	});

	$("#cancel_schedule_button").on("click",function(event) {
		var schedule_id = $("#hidden_schedule_id").val();
		console.log(schedule_id);

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