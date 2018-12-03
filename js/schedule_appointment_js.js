
function month_int_text(month_int) {
	var month = new Array(12);
	month[0] = "January";
	month[1] = "February";
	month[2] = "March";
	month[3] = "April";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "August";
	month[8] = "September";
	month[9] = "October";
	month[10] = "November";
	month[11] = "December";
	return month[month_int];
}

function month_text_int(month_text) {
	var month = new Array(12);
	month["January"] = 0;
	month["February"] = 1;
	month["March"] = 2;
	month["April"] = 3;
	month["May"] = 4;
	month["June"] = 5;
	month["July"] = 6;
	month["August"] = 7;
	month["September"] = 8;
	month["October"] = 9;
	month["November"] =10 ;
	month["December"] =11 ;
	return month[month_text];
}

function weekday_int_text(weekday_int) {
	var weekday = new Array(7);
	weekday[0] =  "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";
	return weekday[weekday_int];
}

function weekday_text_int(weekday_text) {
	var weekday = new Array(7);
	weekday["Sunday"] = 0;
	weekday["Monday"] = 1;
	weekday["Tuesday"] = 2;
	weekday["Wednesday"] = 3;
	weekday["Thursday"] = 4;
	weekday["Friday"] = 5;
	weekday["Saturday"] = 6;
	return weekday[weekday_text];
}

function getNextDayOfWeek(dayOfWeek) {
	var date = new Date();
    var resultDate = new Date(date.getTime());

    resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);

    return resultDate;
}

function confirm_schedule(schedule_detail_json) {
	// console.log(schedule_detail_json);
	var name = schedule_detail_json.username;
	var weekdays = schedule_detail_json.weekdays;
	var next_day_of_week = getNextDayOfWeek(weekday_text_int(weekdays));
	var month = month_int_text( next_day_of_week.getMonth());
	var date = next_day_of_week.getDate();
	var year = next_day_of_week.getFullYear();
	var office_hour_location = schedule_detail_json.office_hour_location;
	// var start_time = schedule_detail_json.start_time;

	var start_time_arr = schedule_detail_json.start_time.split(":");
	var start_time = start_time_arr.slice(0,2).join(":");
	// var end_time_arr = result.end_time.split(":");
	// var end_time = end_time_arr.slice(0,2).join(";");

	$("#schedule_appointment_confirmation_modal #confirm_date_1").text(month+" "+date+", "+year);
	$("#schedule_appointment_confirmation_modal #confirm_weekday_1").text(weekdays);
	$("#schedule_appointment_confirmation_modal #confirm_start_time_1").text(start_time);
	$("#schedule_appointment_confirmation_modal #confirm_username_1").text(name);

	$("#successful_schedule_confirmation_modal #confirm_date_2").text(month+" "+date+", "+year);
	$("#successful_schedule_confirmation_modal #confirm_weekday_2").text(weekdays);
	$("#successful_schedule_confirmation_modal #confirm_start_time_2").text(start_time);
	$("#successful_schedule_confirmation_modal #confirm_username_2").text(name);

	$("#pending_schedule_confirmation_modal #confirm_date_3").text(month+" "+date+", "+year);
	$("#pending_schedule_confirmation_modal #confirm_weekday_3").text(weekdays);
	$("#pending_schedule_confirmation_modal #confirm_start_time_3").text(start_time);
	$("#pending_schedule_confirmation_modal #confirm_username_3").text(name);

	if (office_hour_location!=undefined) {
		$("#schedule_appointment_confirmation_modal #confirm_location_1").text(office_hour_location);
		$("#successful_schedule_confirmation_modal #confirm_location_2").text(office_hour_location);
		$("#pending_schedule_confirmation_modal #confirm_location_3").text(office_hour_location);

		schedule_detail_json["scheduled_month"] = month_text_int(month);
		schedule_detail_json["scheduled_date"] = date;
		schedule_detail_json["scheduled_year"] = year;

	}else{
		var available_hour_location = schedule_detail_json.available_hour_location;
		$("#schedule_appointment_confirmation_modal #confirm_location_1").text(available_hour_location);
		$("#successful_schedule_confirmation_modal #confirm_location_2").text(available_hour_location);
		$("#pending_schedule_confirmation_modal #confirm_location_3").text(available_hour_location);

		//if this is available hour, the date shouldn't be next day of week, should be the date retrived from database
		$("#schedule_appointment_confirmation_modal #confirm_date_1").text(schedule_detail_json.date);
		$("#successful_schedule_confirmation_modal #confirm_date_2").text(schedule_detail_json.date);
		$("#pending_schedule_confirmation_modal #confirm_date_3").text(schedule_detail_json.date);

		schedule_detail_json["scheduled_month"] = schedule_detail_json.date.split("-")[1];
		schedule_detail_json["scheduled_date"] = schedule_detail_json.date.split("-")[2];
		schedule_detail_json["scheduled_year"] = schedule_detail_json.date.split("-")[0];
	}

	

	if (office_hour_location!=undefined) {
		schedule_detail_json['hours_type'] = 'office_hour';
		// $("#schedule_appointment_confirmation_modal #confirm_schedule_appointment_button").click({param: schedule_detail_json, hours_type:'office_hour'}, confirm_register);
	}else{
		schedule_detail_json['hours_type'] = 'available_hour';
		// $("#schedule_appointment_confirmation_modal #confirm_schedule_appointment_button").click({param: schedule_detail_json, hours_type:'available_hour'}, confirm_register);
	}
	
	$("#hidden_schedule_info").val(JSON.stringify(schedule_detail_json));

	

	$("#schedule_appointment_confirmation_modal").css("display","block");
}


$(document).ready( function () {
	
	//search office hour schedule
	$("#search_schedule_button").on("click",function(event) {
		$(".hours_result_div").css("display","none");
		//retrieve search input
		var name_input = $("#search_schedule_div #name_input").val();
		var date_input = $("#search_schedule_div #date_input").val();
		var department_input = $("#search_schedule_div #department_input").val();
		var hours_type_input = $("#type_input").val();

		var date_lst = date_input.split("-");


		if (date_lst.length==3 || date_input=="") {
			var year_input = parseInt(date_lst[0]);
			var month_input = parseInt(date_lst[1]);
			var day_input = parseInt(date_lst[2]);
			if ((!isNaN(year_input) && !isNaN(month_input) && !isNaN(day_input)) || date_input=="") {
				if (date_input=="") {
					weekday_input = "";
				}else{
					var new_date = new Date(year_input,month_input-1,day_input);
					var weekday_int_input = new_date.getDay();
					var weekday_input = weekday_int_text(weekday_int_input);
				}

				//if office hours are requested
				if (hours_type_input=="both" || hours_type_input=="office_hour") {
					var request = $.ajax({
						type: 'POST',
						url: "/ajax_php/search_user_office_hour.php",
						dataType: "JSON",
						data: {
							name_input: name_input,
							weekday_input: weekday_input,
							department_input: department_input
						}
					});

					request.fail(function(xhr, status, error) {
						console.log("failed");
						console.log(xhr);
						console.log(status);
						console.log(error);
					});

					request.done(function(data) {
						$("#search_office_hour_result_div p").remove();
						// console.log(data.length);
						if (data.length==0) {
							$("#search_office_hour_result_div").css("display","block");
							$("#search_office_hour_result_table").css("display","none");
							$("#search_office_hour_result_div").append("<p>Sorry! No result available.</p>")

						}else{
							// console.log(data);
							
							$("#search_office_hour_result_table").css("display","inline-table");
							$("#search_office_hour_result_table tr.result_rows").remove();
							$("#search_office_hour_result_div").css("display","block");
							data.forEach(function(result){
								var result_json_str = JSON.stringify(result);
								var tr_str = "<tr class='result_rows'>";
								tr_str = tr_str+"<th>"+result.username+"</th>";
								tr_str = tr_str+"<th>"+result.college_department+"</th>";

								var start_time_arr = result.start_time.split(":");
								var start_time = start_time_arr.slice(0,2).join(":");
								var end_time_arr = result.end_time.split(":");
								var end_time = end_time_arr.slice(0,2).join(":");

								// if (weekday_input=="") {

									tr_str = tr_str+"<th>"+result.weekdays+" "+ start_time+"-"+end_time+"</th>";
								// }else{
								// 	tr_str = tr_str+"<th>"+weekday_input+" "+ result.start_time+"-"+result.end_time+"</th>";
								// }
								tr_str = tr_str+"<th>"+result.office_hour_location+"</th>";
								tr_str = tr_str+"<th><span class='register_button pointer' id='register_button_"+result.user_id+"' onclick='confirm_schedule("+result_json_str+")'>Register</span></th>";

								$("#search_office_hour_result_table").append(tr_str);
							});
						}
						
					});
				}

				//if available hours are requested
				if (hours_type_input=="both" || hours_type_input=="available_hour") {
					var request = $.ajax({
						type: 'POST',
						url: "/ajax_php/search_user_available_hour.php",
						dataType: "JSON",
						data: {
							name_input: name_input,
							weekday_input: weekday_input,
							department_input: department_input
						}
					});

					request.fail(function(xhr, status, error) {
						console.log("failed");
						console.log(xhr);
						console.log(status);
						console.log(error);
					});

					request.done(function(data) {
						$("#search_available_hour_result_div p").remove();
						if (data.length==0) {
							$("#search_available_hour_result_div").css("display","block");
							$("#search_available_hour_result_table").css("display","none");
							$("#search_available_hour_result_div").append("<p>Sorry! No result available.</p>")

						}else{
							// console.log(data);
							$("#search_available_hour_result_table").css("display","inline-table");
							$("#search_available_hour_result_table tr.result_rows").remove();
							$("#search_available_hour_result_div").css("display","block");
							data.forEach(function(result){
								var result_json_str = JSON.stringify(result);
								var tr_str = "<tr class='result_rows'>";
								tr_str = tr_str+"<th>"+result.username+"</th>";
								tr_str = tr_str+"<th>"+result.college_department+"</th>";

								var start_time_arr = result.start_time.split(":");
								var start_time = start_time_arr.slice(0,2).join(":");
								var end_time_arr = result.end_time.split(":");
								var end_time = end_time_arr.slice(0,2).join(":");


								// if (weekday_input=="") {
								tr_str = tr_str+"<th>"+result.weekdays+" "+ start_time+"-"+end_time+"</th>";
								// }else{
								// 	tr_str = tr_str+"<th>"+weekday_input+" "+ result.start_time+"-"+result.end_time+"</th>";
								// }
								tr_str = tr_str+"<th>"+result.available_hour_location+"</th>";
								tr_str = tr_str+"<th><span class='register_button pointer' id='register_button_"+result.user_id+"' onclick='confirm_schedule("+result_json_str+")'>Request</span></th>";

								$("#search_available_hour_result_table").append(tr_str);
							});
						}
						
					});
				}
				
				
			}else{
				//if some of the numbers cannot be parsed as int
				alert("Please follow the date format: yyyy-mm-dd");
			}
		}else{
			//if there's no two '-'
			alert("Please follow the date format: yyyy-mm-dd");
		}
	});


	$("#schedule_appointment_confirmation_modal #confirm_schedule_appointment_button").on("click", function( event ) {
		// var schedule_detail_json = param;
		var schedule_detail_json = $("#hidden_schedule_info").val();
		schedule_detail_json = JSON.parse(schedule_detail_json);
		console.log(schedule_detail_json);

		var user_id = schedule_detail_json.user_id;
		var scheduled_time = schedule_detail_json.start_time;
		var location = schedule_detail_json.office_hour_location;
		if (location==undefined) {
			var location = schedule_detail_json.available_hour_location;
			var schedule_type = "available_hour";
		}else{
			var schedule_type = "office_hour";
		}

		var month = schedule_detail_json.scheduled_month;
		var date = schedule_detail_json.scheduled_date;
		var year = schedule_detail_json.scheduled_year;
		var hours_type = schedule_detail_json.hours_type;
		var notes = $("#schedule_appointment_confirmation_modal #notes_input").val();

		var meeting_subject = $("#schedule_appointment_confirmation_modal #meeting_subject_input").val();
		// console.log(scheduled_time, month, date,year);

		if (meeting_subject=="") {
			alert("You have to fill in your meeting subject!");
		}else{
			console.log(year,month,date,scheduled_time);
			var request = $.ajax({
				type: 'GET',
				url: "/ajax_php/add_new_schedule.php",
				data: {
					schedule_type: schedule_type,
					user_id_2: user_id,
					time: scheduled_time,
					location: location,
					month:month,
					date:date,
					year:year,
					notes:notes,
					meeting_subject: meeting_subject
				}
			});

			request.fail(function(xhr, status, error) {
				console.log("failed");
				console.log(xhr);
				console.log(status);
				console.log(error);
			});

			request.done(function(data) {
				$("#schedule_appointment_confirmation_modal").css("display","none");
				$("#schedule_appointment_confirmation_modal #meeting_subject_input").val("");
				$("#schedule_appointment_confirmation_modal #notes_input").val("");
				if (schedule_type=="office_hour") {
					$("#successful_schedule_confirmation_modal").css("display","block");
				}else{
					$("#pending_schedule_confirmation_modal").css("display","block")
				}
				
			});
		}
		
	});

	$("#schedule_appointment_confirmation_modal .close_modal_button").on("click",function(event) {
		$("#proposed_location_input").remove();
		$("#schedule_appointment_confirmation_modal").css("display","none");
		$("#schedule_appointment_confirmation_modal #meeting_subject_input").val("");
		$("#schedule_appointment_confirmation_modal #notes_input").val("");
	});

	$("#successful_schedule_confirmation_modal .close_modal_button").on("click",function(event) {
		$("#successful_schedule_confirmation_modal").css("display","none");
		$("#schedule_appointment_confirmation_modal #meeting_subject_input").val("");
		$("#schedule_appointment_confirmation_modal #notes_input").val("");
	});

	$("#pending_schedule_confirmation_modal .close_modal_button").on("click",function(event) {
		$("#pending_schedule_confirmation_modal").css("display","none");
		$("#schedule_appointment_confirmation_modal #meeting_subject_input").val("");
		$("#schedule_appointment_confirmation_modal #notes_input").val("");
	});










});