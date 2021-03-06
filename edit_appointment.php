<?php session_start(); ?>
<!DOCTYPE html>
<html>
    
    <head>
        <meta charset="utf-8">
        <title>Holiday</title>
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/edit_appointment_style.css">
        <!-- <link href="https://fonts.googleapis.com/css?family=Yantramanav" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Lora" rel="stylesheet"> -->
        <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <link rel="stylesheet" href="https://cdn.linearicons.com/free/1.0.0/icon-font.min.css">
        <!-- <script src="js/main_index_js.js"></script> -->
        <script src="js/edit_appointment_js.js"></script>

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
                        $logged_user_id = $_SESSION['logged_user_id'];
                        //if the user has already logged in
                ?>
                        <?php
                            echo '<input type="hidden" id="logged_user_id" value="'.$logged_user_id.'">';
                        ?>
                        

                        <div id="edit_schedules_div">
                            <div>
                                <a href="index.php" class="back_to_home_button"><span class="lnr lnr-arrow-left"></span>Back</a>
                                <h2>Change Schedules</h2>
                            </div>

                            <div id="upcoming_schedules_div" class="schedules_to_change_div">
                                <h3>Upcoming Schedules</h3>
                                <table id="upcoming_schedules_table">
                                    <tr class="table_header">
                                        <th>Meeting Subject</th>
                                        <th>Who</th> 
                                        <th>When</th>
                                        <th>Where</th>
                                        <th>Action</th>
                                    </tr>
                                </table>
                            </div>

                            <div id="waiting_request_div" class="schedules_to_change_div">
                                <h3>Waiting Request from Others</h3>
                                <table id="waiting_request_table">
                                    <tr class="table_header">
                                        <th>Meeting Subject</th>
                                        <th>Who</th> 
                                        <th>When</th>
                                        <th>Where</th>
                                        <th>Action</th>
                                    </tr>
                                </table>
                            </div>
                            
                            <div id="request_status_div" class="schedules_to_change_div">
                                <h3>Your Request Status</h3>
                                <table id="request_status_table">
                                    <tr class="table_header">
                                        <th>Meeting Subject</th>
                                        <th>Who</th> 
                                        <th>When</th>
                                        <th>Where</th>
                                        <th>Status</th>
                                    </tr>
                                </table>
                            </div>

                            <div id="past_schedules_div" class="schedules_to_change_div">
                                <h3>Past Schedules</h3>
                                <table id="past_schedules_table">
                                    <tr class="table_header">
                                        <th>Meeting Subject</th>
                                        <th>Who</th> 
                                        <th>When</th>
                                        <th>Where</th>
                                        <th>Action</th>
                                    </tr>
                                </table>
                            </div>
                        </div>

                        <div class="confirmation_modal" id="confirm_cancel_modal">
                            <!-- <span class="close_modal_button pointer back_to_home_button"><span class="lnr lnr-arrow-left"></span>Back</span> -->
                            <h2>Are you sure you want to cancel it?</h2>
                            
                            <span id="cancel_schedule_button" class="confirm_button red_button">Yes, Cancel It!</span>
                            <span class="back_to_schedule_button confirm_button grey_button">No, Go Back.</span>
                        </div>

                        <div class="confirmation_modal" id="change_schedule_modal">
                            <div id="schedule_div">
                                <h1>Schedule Info</h1>
                                <div id="schedule_info_div">
                                    <input type="hidden" id="hidden_schedule_id">
                                    <span class="green_span">NAME</span><br>
                                    <span id="name_span"></span><br>
                                    <span class="green_span">DEPARTMENT</span><br>
                                    <span id="department_span"></span><br>
                                    <span class="green_span">DATE</span><br>
                                    <input type="date" placeholder="yyyy-mm-dd" id="date_input"><br>
                                    <span class="green_span">TIME</span><br>
                                    <input type="time" id="time_input" placeholder="hh:mm"><br>
                                    <span class="green_span">LOCATION</span><br>
                                    <input type="text" id="location_input"><br>
                                    <span class="green_span">MEETING SUBJECT</span><br>
                                    <input type="text" id="meeting_subject_input"><br>
                                    <span class="green_span">NOTES</span><br>
                                    <textarea rows="5" cols="50" id="notes_input" placeholder="optional" ></textarea><br>
                                </div>
                            </div>
                            <span id="save_change_button" class="confirm_button red_button">Save</span>
                            <span class="back_to_schedule_button confirm_button grey_button">Cancel</span>

                        </div>
                        




                <?php 
                    }
                ?>



            </div> <!--end content div-->
            
        </div> <!--end container div-->
        
    </body>

</html>