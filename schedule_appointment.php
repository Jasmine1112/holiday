<?php session_start(); ?>
<!DOCTYPE html>
<html>
    
    <head>
        <meta charset="utf-8">
        <title>Holiday</title>
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/schedule_appointment_style.css">
        <!-- <link href="https://fonts.googleapis.com/css?family=Yantramanav" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Lora" rel="stylesheet"> -->
        <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <link rel="stylesheet" href="https://cdn.linearicons.com/free/1.0.0/icon-font.min.css">
        <script src="js/main_index_js.js"></script>
        <script src="js/schedule_appointment_js.js"></script>

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    </head>
    
    <body>
        <div id="container">
            
    
            <div id="homecontent">
                <!-- <h1>THIS IS HOMEPAGE</h1> -->
                <?php
                    //if the user hasn't logged in
                    if ( !isset($_SESSION['logged_user_id'] ) ) {
                        header("Location: index.php");
                    }else{
                        //if the user has already logged in
                ?>
                        <div id="schedule_div">
                            <a href="index.php" class="back_to_home_button"><span class="lnr lnr-arrow-left"></span>Back</a>
                            <h1>SCHEDULE</h1>
                            <h3>SEARCH</h3>
                            <div id="search_schedule_div">
                                <div>
                                    <span class="search_form_span">NAME </span><br><input type="text" id="name_input" value="<?php echo $_GET['name']?>"><br>
                                </div>
                                <div>
                                    <span class="search_form_span">DATE</span><br> <input type="date" placeholder="yyyy-mm-dd" id="date_input"><br>
                                </div>
                                <div>
                                    <span class="search_form_span">DEPARTMENT</span><br> <input type="text" id="department_input" value="<?php echo $_GET['department']?>"><br>
                                </div>
                                <div>
                                    <span class="search_form_span">HOURS TYPE</span><br>
                                    <select id="type_input">
                                        <option value="both">Both</option>
                                        <option value="office_hour">Office Hour</option>
                                        <option value="available_hour">Available Hour</option>
                                    </select><br>
                                </div>
                                
                                
                                <span id="search_schedule_button" class="pointer">SEARCH</span>

                                <div id="search_office_hour_result_div" class="hours_result_div">
                                    <h4><span>Office Hours</span></h4>
                                    <table id="search_office_hour_result_table" class="hours_result_table">
                                        <tr class="header">
                                            <th>Name</th>
                                            <th>Department</th>
                                            <th>Time</th>
                                            <th>Location</th>
                                            <th>Action</th>
                                        </tr>
                                    </table>
                                </div>

                                <div id="search_available_hour_result_div" class="hours_result_div">
                                    <h4><span>Available Hours</span></h4>
                                    <table id="search_available_hour_result_table" class="hours_result_table">
                                        <tr class="header">
                                            <th>Name</th>
                                            <th>Department</th>
                                            <th>Time</th>
                                            <th>Location</th>
                                            <th>Action</th>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>


                        <div class="confirmation_modal" id="schedule_appointment_confirmation_modal">
                            <!-- <span class="close_modal_button pointer"><span class="lnr lnr-arrow-left"></span>Back</span> -->

                            <h2>Do you confirm to attend this appointment?</h2>
                            <input type="hidden" id="hidden_schedule_info">
                            <div class="green_border_div">
                                <p>
                                    <span id="confirm_date_1"></span>, 
                                    <span id="confirm_weekday_1"></span>, 
                                    <span id="confirm_start_time_1"></span>
                                </p>
                                <p><span id="confirm_username_1"></span> @<span id="confirm_location_1"></span></p>
                            </div>
                            
                            <span class="green_bold_span">Meeting Subject</span><br>
                            <input type="text" id="meeting_subject_input" value="<?php echo $_GET['subject']?>"><br>
                            <span class="green_bold_span">Add a Note</span><br>
                            <textarea rows="5" cols="50" id="notes_input" placeholder="optional" ><?php echo $_GET['note']?></textarea><br>
                            <span id="confirm_schedule_appointment_button" class="red_button confirm_button">Confirm</span>
                            <span class="close_modal_button grey_button confirm_button">Cancel</span>
                        </div>

                        <div class="confirmation_modal" id="successful_schedule_confirmation_modal">
                            <span class="close_modal_button pointer back_to_home_button"><span class="lnr lnr-arrow-left"></span>Schedule Another Appointment</span>
                            <h2>You have successfully scheduled your appointment!</h2>
                            <div class="green_border_div">
                                <p>
                                    <span id="confirm_date_2"></span>, 
                                    <span id="confirm_weekday_2"></span>, 
                                    <span id="confirm_start_time_2"></span>
                                </p>
                                <p><span id="confirm_username_2"></span> @<span id="confirm_location_2"></span></p>
                            </div>
                            
                            <a href="calendar.php" class="red_button"><span>View in Calendar</span><a>
                            <a href="edit_appointment.php" class="dark_grey_button"><span class="close_modal_button">Change</span></a>
                        </div>

                        <div class="confirmation_modal" id="pending_schedule_confirmation_modal">
                            <span class="close_modal_button pointer back_to_home_button"><span class="lnr lnr-arrow-left"></span>Schedule Another Appointment</span>
                            <h2>You have successfully sent your appointment request!</h2>
                            <div class="green_border_div">
                                <p>
                                    <span id="confirm_date_3"></span>, 
                                    <span id="confirm_weekday_3"></span>, 
                                    <span id="confirm_start_time_3"></span>
                                </p>
                                <p><span id="confirm_username_3"></span> @<span id="confirm_location_3"></span></p>
                            </div>
                            
                            <!-- <a href="calendar.php" class="red_button"><span>View in Calendar</span><a> -->
                            <a href="edit_appointment.php" class="red_button"><span class="close_modal_button">View Request Status</span></a>
                        </div>




                <?php 
                    }
                ?>



            </div> <!--end content div-->
            
        </div> <!--end container div-->
        
    </body>

</html>