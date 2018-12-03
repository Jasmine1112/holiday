<?php session_start(); ?>
<!DOCTYPE html>
<html>
    
    <head>
        <meta charset="utf-8">
        <title>Holiday</title>
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/calendar_style.css">
        <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">
        <!-- <link href="https://fonts.googleapis.com/css?family=Yantramanav" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Lora" rel="stylesheet"> -->

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <link rel="stylesheet" href="https://cdn.linearicons.com/free/1.0.0/icon-font.min.css">
        <script src="js/main_index_js.js"></script>
        <script src="faculty_js/set_hours_js.js"></script>

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
                        <div class="container-fluid">
                            <div class="row full_screen_height">
                                <div class="schedule_info_div col-lg-3" id="schedule_info_div">
                                    <span id="oh_filter_span" class="filter_span">Office Hours</span><span id="ah_filter_span" class="filter_span">Available Hours</span>
                                    <h1 id="selected_weekday"><?php echo date("l");?></h1>
                                    <h3 id="selected_date">TODAY</h3>
                                    <!-- <div class="schedule_info_block">Meet with Zhang @3:30pm</div> -->
                                    <div id="oh_info_div"></div>
                                    <div id="ah_info_div"></div>

                                </div> <!-- end of schedule info div -->
                                <div class="user_calendar_div col-lg-9">
                                    <div id='add_available_hour_div'>
                                        <input type="hidden" id="add_avail_year">
                                        <input type="hidden" id="add_avail_month">
                                        <input type="hidden" id="add_avail_date">
                                        <!-- <h5>Available Hour</h5> -->
                                        <select id="add_hour_type_select">
                                            <option id="add_ah_option">Available Hour</option>
                                            <option id="add_oh_option">Office Hour</option>
                                        </select>
                                        <div id="set_ah_div">
                                            <!-- <div> -->
                                                <span class="bold_font-weight">Time:</span><br>
                                                <span class="indent">Start </span><input type="time" id="avai_hour_start_time_input" placeholder="hh:mm"><br>
                                                <span class="indent">End </span><input type="time" id="avai_hour_end_time_input" placeholder="hh:mm"><br>
                                                <span class="bold_font-weight">Repeat:</span> <input type="checkbox" id="repeat_checkbox"><span class="indent light_font-weight">Every week</span><br>
                                                <span class="bold_font-weight">Location:</span><br>
                                                <input type="text" id="avai_hour_location_input"><br>
                                            <!-- </div> -->
                                            <span id="set_ah_button">Set</span>
                                        </div>
                                        <div id="set_oh_div">
                                            <!-- <div> -->
                                                <span class="bold_font-weight">Every <span id="oh_weekday_span"></span></span><br>
                                                <span class="bold_font-weight">Time:</span><br>
                                                <span class="indent">Start </span><input type="time" id="office_hour_start_time_input" placeholder="hh:mm"><br>
                                                <span class="indent">End </span><input type="time" id="office_hour_end_time_input" placeholder="hh:mm"><br>
                                                <span class="bold_font-weight">Location:</span><br>
                                                <input type="text" id="office_hour_location_input"><br>
                                            <!-- </div> -->
                                            <span id="set_oh_button">Set</span>
                                        </div>
                                        
                                        

                                    </div>
                                    <a href="index.php" class="back_to_home_button"><span class="lnr lnr-arrow-left"></span>Back</a>
                                    <div class="month">
                                        <span class="prev_month_pointer switch_month">&#10094;</span>
                                        <span class="next_month_pointer switch_month">&#10095;</span>

                                        <span id="displayed_month"></span>
                                        <span id="displayed_year"></span><br>
                                        <span class="switch_current_month switch_month pointer">today</span>
                                    </div>

                                    <ul class="weekdays">
                                        <li>SUN</li>
                                        <li>MON</li>
                                        <li>TUE</li>
                                        <li>WED</li>
                                        <li>THU</li>
                                        <li>FRI</li>
                                        <li>SAT</li>
                                    </ul>

                                    <ul class="days">
                                    </ul>
                                </div> <!-- end of user calendar div -->
                            
                            </div> <!-- end of main-row full-screen-height -->
                            
                        </div> <!-- end of container-fluid -->






                <?php 
                    }
                ?>



            </div> <!--end content div-->
            
        </div> <!--end container div-->
        
    </body>

</html>