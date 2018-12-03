
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

	//start the int days of current month
	for (var new_date = 1; new_date < last_date_of_displayed_month+1; new_date++) {
		//class name for weekdays span
		var new_date_obj = new Date(displayed_year,displayed_month-1,new_date);
	    var new_date_weekday = weekday_int_text(new_date_obj.getDay()) ;
		if (new_date==today_dd && displayed_month==today_mm) {
			//if it's today, highlight with background color
	        $(".user_calendar_div .days").append("<li><span class='oh_weekday_"+new_date_weekday+"'><span id='day"+new_date+"' class='"+new_date_weekday+"'><span class='today_day day pointer'>"+today_dd+"</span></span></li>");
	    }else{
	    	$(".user_calendar_div .days").append("<li><span class='oh_weekday_"+new_date_weekday+"'><span id='day"+new_date+"' class='"+new_date_weekday+"'><span class='day pointer'>"+new_date+"</span></span></li>");
	    }
	}//finished displayed dates with scheduled

	//now display available schedule
	//nested ajax
	var request = $.ajax({
		url: "/ajax_php/get_available_hours.php",
		dataType: "JSON",

	});

	request.fail(function(xhr, status, error) {
		console.log("failed");
		console.log(xhr);
		console.log(status);
		console.log(error);
	});

	request.done(function(data) {
		// console.log(data);
		for (var j = 0; j < data.length; j++) {
			var avail_hour = data[j];
			var date_j = avail_hour.date;
			var weekday_j = avail_hour.weekdays;
			var repeat_j = avail_hour.repeat;

			if (repeat_j=="true") {
				$("."+weekday_j).addClass("available_day");
			}else{
				var t = date_j.split('-');
				
				if (displayed_year==parseInt(t[0]) && displayed_month==parseInt(t[1])) {
					$("#day"+parseInt(t[2])).addClass("available_day");
				}
			}
		}
	});

	//now display available schedule
	//nested ajax
	var request2 = $.ajax({
		url: "/faculty_ajax_php/get_office_hours.php",
		dataType: "JSON",
	});

	request2.fail(function(xhr, status, error) {
		console.log("failed");
		console.log(xhr);
		console.log(status);
		console.log(error);
	});

	request2.done(function(data2) {
		// console.log(data2);
		for (var j = 0; j < data2.length; j++) {
			var office_hour = data2[j];
			var weekday_j = office_hour.weekdays;
			
			$(".oh_weekday_"+weekday_j).addClass("oh_day");
		}
	});
}


//display schedule of one selected date
function display_left_schedule(input_year, input_month, input_date) {
	var selected_date_obj = new Date(input_year, input_month, input_date);
	var selected_weekday_str = weekday_int_text(selected_date_obj.getDay());

	var today_obj = new Date();
	var today_year = today_obj.getFullYear();
	var today_month = today_obj.getMonth();
	var today_date = today_obj.getDate();

	if (parseInt(today_year) == parseInt(input_year) && parseInt(today_month) == parseInt(input_month) && parseInt(today_date) == parseInt(input_date)) {
		$("#selected_date").text("TODAY");
	}else{
		var selected_month = month_int_text(input_month);
		$("#selected_date").text(selected_month + ", " +input_date);
	}
	
	$(".schedule_info_div #selected_weekday").text(selected_weekday_str);

	//done for displaying schedule for selected date
	//nested ajax: display available hours for selected date
	var selected_date_obj = new Date(input_year,input_month,input_date);
	var selected_date_weekday = weekday_int_text(selected_date_obj.getDay());

	var request = $.ajax({
		type: 'POST',
		url: "/ajax_php/get_available_hours_on_date.php",
		dataType: "JSON",
		data: {
				input_year: input_year,
				input_month: input_month+1,
				input_date: input_date,
				input_weekday: selected_date_weekday
			  }
	});

	request.fail(function(xhr, status, error) {
		console.log("failed");
		console.log(xhr);
		console.log(status);
		console.log(error);
	});

	request.done(function(data) {
		$("#avail_hour_h4").remove();
		$(".avail_hour_block").remove();
		if (data.length!=0) {
			$("#ah_info_div").append("<h4 id='avail_hour_h4'><span>Available Hours</span></h4>");
			for (var j = 0; j < data.length; j++) {
				var avail_hour_id = data[j].available_hours_id;
				var location = data[j].available_hour_location;
				var weekday = data[j].weekdays;
				var start_time = data[j].start_time.slice(0,5);
				var end_time = data[j].end_time.slice(0,5);
				var repeat = data[j].repeat;
			
				var avail_block_str = '<div class="avail_hour_block" id="avail_hour_block_'+avail_hour_id+'">';
				avail_block_str += '<span>'+weekday+' '+start_time+'-'+end_time+' @'+location;
				if (repeat=="true") {
					avail_block_str += " (weekly)";
				}
				avail_block_str += '</span>';
				avail_block_str +='<img src="img/remove-sign.png" class="delete_avail_sign" id="delete_avail_sign_'+avail_hour_id+'">';
				avail_block_str +='<span class="delete_avail_button" id="delete_avail_button_'+avail_hour_id+'">DELETE</span></span>';
				avail_block_str += '</div>';
				$("#ah_info_div").append(avail_block_str);
			}
			
		}
		//done with displaying avail
	});

	var request2 = $.ajax({
		type: 'POST',
		url: "/faculty_ajax_php/get_office_hours_on_date.php",
		dataType: "JSON",
		data: {
				input_weekday: selected_date_weekday
			  }
	});

	request2.fail(function(xhr, status, error) {
		console.log("failed");
		console.log(xhr);
		console.log(status);
		console.log(error);
	});

	request2.done(function(data) {
		$("#office_hour_h4").remove();
		$(".office_hour_block").remove();
		if (data.length!=0) {
			$("#oh_info_div").append("<h4 id='office_hour_h4'><span>Office Hours</span></h4>");
			for (var j = 0; j < data.length; j++) {
				var office_hour_id = data[j].office_hour_id;
				console.log(office_hour_id);
				var weekday = data[j].weekdays;
				var location = data[j].office_hour_location;
				var start_time = data[j].start_time.slice(0,5);
				var end_time = data[j].end_time.slice(0,5);
			
				var office_block_str = '<div class="office_hour_block" id="office_hour_block_'+office_hour_id+'">';
				office_block_str += '<span>'+weekday+' '+start_time+'-'+end_time+' @'+location;
				office_block_str += '</span>';
				office_block_str +='<img src="img/remove-sign.png" class="delete_office_sign" id="delete_office_sign_'+office_hour_id+'">';
				office_block_str +='<span class="delete_office_button" id="delete_office_button_'+office_hour_id+'">DELETE</span></span>';
				office_block_str += '</div>';
				$("#oh_info_div").append(office_block_str);
			}
		}
		//done with displaying avail
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
	display_left_schedule(cur_year,cur_month-1,cur_date);

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
			display_left_schedule(calendar_year,calendar_month-1,cur_date);
		}
		display_calendar(calendar_year,calendar_month);
	});

	//change scheduled events to selected date
	$(document).on("click",".days span.day",function(e) {

		var selected_date = $(e.target).text();
		calendar_date = parseInt(selected_date);
		display_left_schedule(calendar_year,calendar_month-1,selected_date);
	});

	//right click on dates
	//disable the right click menu

	$(document).on("contextmenu",".user_calendar_div .day", function (event) {
		//highlight the right clicked date
		$(".right_clicked").removeClass("right_clicked");
		$(this).addClass("right_clicked");


		var selected_date = $(event.target).text();
		calendar_date = parseInt(selected_date);
		display_left_schedule(calendar_year,calendar_month-1,selected_date);
	    // Avoid the real one
	    event.preventDefault();

	    //record which date this box is for
	    $("#add_available_hour_div #add_avail_year").val(calendar_year);
	    $("#add_available_hour_div #add_avail_month").val(calendar_month);
	    $("#add_available_hour_div #add_avail_date").val($(event.target).text());
	    
	    // Show contextmenu
	    var left_width= document.getElementById('schedule_info_div').clientWidth;
	    $("#add_available_hour_div").css("top",event.clientY+ "px");
	    $("#add_available_hour_div").css("left",event.clientX-left_width + "px");
	    $("#add_available_hour_div").css("display","block");

	    //add the weekday to add oh div
	    var weekday = $(this).parent().attr("class").replace(" available_day","");
	    $("#set_oh_div #oh_weekday_span").text(weekday);
	    
	});

	//change displayed form if adding different hour type
	$("#add_hour_type_select").change(function(){ 
		console.log($("#add_hour_type_select option:selected").attr('id'));
	    if($("#add_hour_type_select option:selected").attr('id') == 'add_ah_option'){ 
	    	$("#add_hour_type_select").css("background-color","#e1b676");
	        $("#set_ah_div").css("display","block");
	        $("#set_oh_div").css("display","none");
	    }else if($("#add_hour_type_select option:selected").attr('id') == 'add_oh_option'){
	    	$("#add_hour_type_select").css("background-color","#4e79d7");
	        $("#set_oh_div").css("display","block");
	        $("#set_ah_div").css("display","none");
	    }
	});


	// If the document is clicked somewhere, hide the add avai hour div
	$(document).on("click", function (e) {
	    // If the clicked element is not the menu
	    if ($(e.target).closest("#add_available_hour_div").length == 0) {
	        // Hide it
	        $("#add_available_hour_div").hide(100);
	        $("#avai_hour_start_time_input").val("");
			$("#avai_hour_end_time_input").val("");
			$("#avai_hour_location_input").val("");
			$("#repeat_checkbox").prop("checked",false);
			$(".right_clicked").removeClass("right_clicked");
	    }

	    if ($(e.target).closest(".avail_hour_block").length == 0) {
	        $(".delete_avail_button").css("display","none");
	    }

	});


	//save new available hours
	$("#set_ah_div #set_ah_button").on("click",function(event) {
		var year_input = $("#add_available_hour_div #add_avail_year").val();
		var month_input = $("#add_available_hour_div #add_avail_month").val();
		var date_input = $("#add_available_hour_div #add_avail_date").val();

		var date_obj = new Date(year_input,month_input-1,date_input);
		var weekday_input = date_obj.getDay();
		var weekday_input = weekday_int_text(weekday_input);

		var start_time_input = $("#avai_hour_start_time_input").val();
		var end_time_input = $("#avai_hour_end_time_input").val();
		var repeat_input = $("#repeat_checkbox").prop("checked");
		var location_input = $("#avai_hour_location_input").val();

		console.log(year_input, month_input, date_input, weekday_input, start_time_input, end_time_input, repeat_input, location_input);



		var request = $.ajax({
			type: 'GET',
			url: "/ajax_php/add_new_available_hour.php",
			data: {
					year: year_input,
					month: month_input,
					date: date_input,
					weekday: weekday_input,
					start_time: start_time_input,
					end_time: end_time_input,
					repeat: repeat_input,
					location: location_input
				  }
		});

		request.fail(function(xhr, status, error) {
			console.log("failed");
			console.log(xhr);
			console.log(status);
			console.log(error);
		});

		request.done(function(data) {
			// Hide it
			$(".right_clicked").removeClass("right_clicked");
	        $("#add_available_hour_div").hide(100);
	        $("#avai_hour_start_time_input").val("");
			$("#avai_hour_end_time_input").val("");
			$("#avai_hour_location_input").val("");
			$("#repeat_checkbox").prop("checked",false);

			display_left_schedule(calendar_year,calendar_month-1,calendar_date);
	        display_calendar(calendar_year,calendar_month);
		});

	});

	//save new office hours
	$("#set_oh_div #set_oh_button").on("click",function(event) {
		var weekday_input = $("#set_oh_div #oh_weekday_span").text();

		var start_time_input = $("#office_hour_start_time_input").val();
		var end_time_input = $("#office_hour_end_time_input").val();

		var location_input = $("#office_hour_location_input").val();

		console.log(weekday_input, start_time_input, location_input)

		var request = $.ajax({
			type: 'GET',
			url: "/faculty_ajax_php/add_new_office_hour.php",
			data: {
					weekday: weekday_input,
					start_time: start_time_input,
					end_time: end_time_input,
					location: location_input
				  }
		});

		request.fail(function(xhr, status, error) {
			console.log("failed");
			console.log(xhr);
			console.log(status);
			console.log(error);
		});

		request.done(function(data) {
			// Hide it
			$(".right_clicked").removeClass("right_clicked");
	        $("#add_available_hour_div").hide(100);
	        $("#office_hour_start_time_input").val("");
			$("#office_hour_end_time_input").val("");
			$("#office_hour_location_input").val("");

			display_left_schedule(calendar_year,calendar_month-1,calendar_date);
	        display_calendar(calendar_year,calendar_month);
		});

	});


	//show delete sign if hover on available hour block
	$(document).on("mouseenter",".avail_hour_block",function(event) {
		var avail_hour_id = $(this).attr("id").replace("avail_hour_block_","");
		var button_display = $("#delete_avail_button_"+avail_hour_id).css("display");
		if (button_display=="none") {
			$("#delete_avail_sign_"+avail_hour_id).css("display","block");
		}
		
	});

	//filter button for ah and oh
	$("#oh_filter_span").on("click",function(event) {
		if ($(this).hasClass("disabled")) {
			$("#oh_info_div").css("display","block");
			$(this).removeClass("disabled");
		}else{
			$("#oh_info_div").css("display","none");
			$(this).addClass("disabled");
		}
	});

	$("#ah_filter_span").on("click",function(event) {
		if ($(this).hasClass("disabled")) {
			$("#ah_info_div").css("display","block");
			$(this).removeClass("disabled");
		}else{
			$("#ah_info_div").css("display","none");
			$(this).addClass("disabled");
		}
	});

	$(document).on("mouseleave",".avail_hour_block",function(event) {
		var avail_hour_id = $(this).attr("id").replace("avail_hour_block_","");
		$("#delete_avail_sign_"+avail_hour_id).css("display","none");
	});

	//show the delete button to confirm deleting avail hour
	$(document).on("click",".delete_avail_sign",function(event) {
		var avail_hour_id = $(this).attr("id").replace("delete_avail_sign_","");
		$("#delete_avail_sign_"+avail_hour_id).css("display","none");
		$("#delete_avail_button_"+avail_hour_id).css("display","block");
	});

	//actually delete the avail hour if delete button is clicked
	$(document).on("click",".delete_avail_button",function(event) {
		var avail_hour_id = $(this).attr("id").replace("delete_avail_button_","");
		var request = $.ajax({
			type: 'GET',
			url: "/ajax_php/delete_avail_hour.php",
			data: {
					avail_hour_id: avail_hour_id
				  }
		});

		request.fail(function(xhr, status, error) {
			console.log("failed");
			console.log(xhr);
			console.log(status);
			console.log(error);
		});

		request.done(function(data) {
			// Hide it
	        display_left_schedule(calendar_year,calendar_month-1,calendar_date);
	        display_calendar(calendar_year,calendar_month);
		});
	});


	//show delete sign if hover on office hour block
	$(document).on("mouseenter",".office_hour_block",function(event) {
		var office_hour_id = $(this).attr("id").replace("office_hour_block_","");
		var button_display = $("#delete_office_button_"+office_hour_id).css("display");
		if (button_display=="none") {
			$("#delete_office_sign_"+office_hour_id).css("display","block");
		}
		
	});

	$(document).on("mouseleave",".office_hour_block",function(event) {
		var office_hour_id = $(this).attr("id").replace("office_hour_block_","");
		$("#delete_office_sign_"+office_hour_id).css("display","none");
	});

	//show the delete button to confirm deleting office hour
	$(document).on("click",".delete_office_sign",function(event) {
		var office_hour_id = $(this).attr("id").replace("delete_office_sign_","");
		$("#delete_office_sign_"+office_hour_id).css("display","none");
		$("#delete_office_button_"+office_hour_id).css("display","block");
	});

	//actually delete the office hour if delete button is clicked
	$(document).on("click",".delete_office_button",function(event) {
		var office_hour_id = $(this).attr("id").replace("delete_office_button_","");
		var request = $.ajax({
			type: 'GET',
			url: "/faculty_ajax_php/delete_office_hour.php",
			data: {
					office_hour_id: office_hour_id
				  }
		});

		request.fail(function(xhr, status, error) {
			console.log("failed");
			console.log(xhr);
			console.log(status);
			console.log(error);
		});

		request.done(function(data) {
			// Hide it
	        display_left_schedule(calendar_year,calendar_month-1,calendar_date);
	        display_calendar(calendar_year,calendar_month);
		});
	});









});