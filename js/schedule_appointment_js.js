
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

function getNextDayOfWeek(dayOfWeek) {
	var date = new Date();
    var resultDate = new Date(date.getTime());

    resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);

    return resultDate;
}

$(document).ready( function () {
	
	//search office hour schedule
	$("#search_schedule_button").on("click",function(event) {
		//retrieve search input
		var name_input = $("#search_schedule_div #name_input").val();
		var date_input = $("#search_schedule_div #date_input").val();
		var department_input = $("#search_schedule_div #department_input").val();

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
				
				
				var request = $.ajax({
					type: 'POST',
					url: "/ajax_php/search_user_schedule.php",
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
					console.log(data);
					$("#search_schedule_result_table tr.result_rows").remove();
					$("#search_schedule_result_table").css("display","block");
					data.forEach(function(result){
						var tr_str = "<tr class='result_rows'>";
						tr_str = tr_str+"<th>"+result.username+"</th>";
						tr_str = tr_str+"<th>"+result.college_department+"</th>";

						if (weekday_input=="") {

						tr_str = tr_str+"<th>"+result.weekdays+" "+ result.start_time+"-"+result.end_time+"</th>";
						}else{
							tr_str = tr_str+"<th>"+weekday_input+" "+ result.start_time+"-"+result.end_time+"</th>";
						}
						tr_str = tr_str+"<th>"+result.office_hour_location+"</th>";
						tr_str = tr_str+"<th><span class='register_button pointer' id='register_button_"+result.user_id+"'>Register</span></th>";

						$("#search_schedule_result_table").append(tr_str);
					});
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


	//pop out confirmation
	$(document).on("click",".register_button",function(event) {

		$("#schedule_appointment_confirmation_modal").css("display","block");
		// var request = $.ajax({
		// 	type: 'POST',
		// 	url: "/ajax_php/search_user_schedule.php",
		// 	dataType: "JSON",
		// 	data: {
		// 		name_input: name_input,
		// 		weekday_input: weekday_input,
		// 		department_input: department_input
		// 	}
		// });

		// request.fail(function(xhr, status, error) {
		// 	console.log("failed");
		// 	console.log(xhr);
		// 	console.log(status);
		// 	console.log(error);
		// });

		// request.done(function(data) {
		// 	console.log(data);
		// 	$("#search_schedule_result_table tr.result_rows").remove();
		// 	$("#search_schedule_result_table").css("display","block");
		// 	data.forEach(function(result){
		// 		var tr_str = "<tr class='result_rows'>";
		// 		tr_str = tr_str+"<th>"+result.username+"</th>";
		// 		tr_str = tr_str+"<th>"+result.college_department+"</th>";

		// 		if (weekday_input=="") {

		// 		tr_str = tr_str+"<th>"+result.weekdays+" "+ result.start_time+"-"+result.end_time+"</th>";
		// 		}else{
		// 			tr_str = tr_str+"<th>"+weekday_input+" "+ result.start_time+"-"+result.end_time+"</th>";
		// 		}
		// 		tr_str = tr_str+"<th>"+result.office_hour_location+"</th>";
		// 		tr_str = tr_str+"<th><span class='register_button pointer' id='register_button_"+result.user_id+"'>Register</span></th>";

		// 		$("#search_schedule_result_table").append(tr_str);
		// 	});
		// });
		
	});

	//add schedule 
	$(document).on("click","#schedule_appointment_confirmation_modal #confirm_schedule_appointment_button",function(event) {

		//TEST
		var user_id_2 = '8';
		var scheduled_time = '2018-11-02 10:00';
		var location = 'Gates 321';

		var request = $.ajax({
			type: 'GET',
			url: "/ajax_php/add_new_schedule.php",
			data: {
				user_id_2: user_id_2,
				time: scheduled_time,
				location: location
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
			$("#successful_schedule_confirmation_modal").css("display","block");
		});
		
	});


	$("#schedule_appointment_confirmation_modal .close_modal_button").on("click",function(event) {
		$("#schedule_appointment_confirmation_modal").css("display","none");
	});

	$("#successful_schedule_confirmation_modal .close_modal_button").on("click",function(event) {
		$("#successful_schedule_confirmation_modal").css("display","none");
	});










});