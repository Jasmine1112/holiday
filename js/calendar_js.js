
//display the calendar based on input month and year
function display_calendar(displayed_year,displayed_month) {
	//remove previously displayed calendar
	$(".user_calendar_div .days li").remove();

	//current day
	var today = new Date();
	var today_dd = today.getDate();
	var today_mm = today.getMonth()+1;
	var today_yyyy = today.getFullYear();

	//7 is Sunday, 1 is Monday
	var first_day_of_displayed_month = new Date(displayed_year,displayed_month-1,1).getDay();
	first_day_of_displayed_month = first_day_of_displayed_month===0 ? 7:first_day_of_displayed_month;
	//get the last date of the month
	var last_date_of_displayed_month = new Date(displayed_year, displayed_month, 0).getDate();

	//set month and year header of displayed month
	$("#displayed_month").text(month_int_text(displayed_month-1));
	$("#displayed_year").text(displayed_year);

	//change the days below based on first weekday and last date of the month
	//insert empty day slot from previous month
	for (var i = 0; i < first_day_of_displayed_month; i++) {
		if (first_day_of_displayed_month==7) {
			break;
		}else{
			$(".user_calendar_div .days").append("<li></li>");
		}
	}

	//retrieve schedules for current user
	var request = $.ajax({
		url: "/ajax_php/get_schedule.php",
		dataType: "JSON"
	});

	request.fail(function(xhr, status, error) {
		console.log("failed");
		console.log(xhr);
		console.log(status);
		console.log(error);
	});

	request.done(function(data) {
		var scheduled_dates = [];
		for (var i = 0; i < data.length; i++) {
			var scheduled_event = data[i];
			var sql_datetime = scheduled_event['time'];
			// Split timestamp into [ Y, M, D, h, m, s ]
			var t = sql_datetime.split(/[- :]/);
			// Apply each element to the Date function
			// var js_datetime = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);

			scheduled_dates.push([parseInt(t[0]), parseInt(t[1]), parseInt(t[2])]);
		}

		//start the int days of current month
		for (var new_date = 1; new_date < last_date_of_displayed_month+1; new_date++) {
			if (new_date==today_dd && displayed_month==today_mm) {
				//if it's today, highlight with background color
		        $(".user_calendar_div .days").append("<li><span class='today_day day pointer'>"+today_dd+"</span></li>");
		    }else{
		    	var scheduled_dates_string = JSON.stringify(scheduled_dates);
		    	var displayed_dates_string = JSON.stringify([displayed_year,displayed_month,new_date]);
		    	var idx = scheduled_dates_string.indexOf(displayed_dates_string);
		    	
		    	// if (scheduled_dates.includes([displayed_year,displayed_month,new_date])) {
		    	if (idx != -1){
		    		//if the date is scheduled, highlight with border color
		    		$(".user_calendar_div .days").append("<li><span class='scheduled_day day pointer'>"+new_date+"</span></li>");
		    	}else{
		    		$(".user_calendar_div .days").append("<li><span class='day pointer'>"+new_date+"</span></li>");
		    	}
		    	

		        
		    }
		}

	});

}


//display schedule of one selected date
function display_left_schedule(input_year, input_month, input_date) {
	var selected_date_obj = new Date(input_year, input_month, input_date);
	var selected_weekday_str = weekday_int_text(selected_date_obj.getDay());
	$(".schedule_info_div #selected_weekday").text(selected_weekday_str);

	//retrieve schedules for current user
	var request = $.ajax({
		type: 'POST',
		url: "/ajax_php/get_schedule_on_date.php",
		dataType: "JSON",
		data: {
				input_year: input_year,
				input_month: input_month+1,
				input_date: input_date
			  }
	});

	request.fail(function(xhr, status, error) {
		console.log("failed");
		console.log(xhr);
		console.log(status);
		console.log(error);
	});

	request.done(function(data) {
		$(".schedule_info_block").remove();
		if (data.length == 0) {
			$(".schedule_info_div").append("<p class='schedule_info_block'>There's no scheduled event!</p>");
		}else{
			for (var i = 0; i < data.length; i++) {
				var schedule_event = data[i];
				var logged_user_id = schedule_event['logged_user_id'];
				var user_id_1 = schedule_event['user_id_1'];
				var user_id_2 = schedule_event['user_id_2'];

				if (user_id_1==logged_user_id) {
					var another_person_id = user_id_2;
				}else{
					var another_person_id = user_id_1;
				}

				var datetime = schedule_event['time'];
				var time = datetime.split(" ")[1];


				var schedule_block_str = '<div class="schedule_info_block">Meet with User '+another_person_id+' @'+time.substr(0,5)+'</div>';
				$(".schedule_info_div").append(schedule_block_str);
			}
		}
		


	});

}


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

$(document).ready( function () {
	//current day
	var today = new Date();
	//initialize current date and displayed calendar date
	var cur_date,calendar_date;
	cur_date = calendar_date = today.getDate();
	var cur_month,calendar_month;
	cur_month = calendar_month = today.getMonth()+1;
	var cur_year,calendar_year;
	cur_year = calendar_year = today.getFullYear();

	//set initial display of calendar: today
	display_calendar(cur_year,cur_month);
	display_left_schedule(cur_year,cur_month,cur_date);

	//switch to prev or next month
	$(".switch_month").on("click",function(event) {
		if ($(event.currentTarget).hasClass("prev_month_pointer")) {
			if (calendar_month==1) {
				calendar_month = 12;
				calendar_year = calendar_year-1;
			}else{
				calendar_month = calendar_month-1;
			}
		}else if ($(event.currentTarget).hasClass("next_month_pointer")) {
			if (calendar_month==12) {
				calendar_month = 1;
				calendar_year = calendar_year+1;
			}else{
				calendar_month = calendar_month+1;
			}
		}else if ($(event.currentTarget).hasClass("switch_current_month")) {
			calendar_month = cur_month;
			calendar_year = cur_year;
		}
		display_calendar(calendar_year,calendar_month);
	});


	//change scheduled events to selected date
	$(document).on("click",".days span.day",function(e) {
		var selected_date = $(event.target).text();

		display_left_schedule(calendar_year,calendar_month-1,selected_date);
	});










});