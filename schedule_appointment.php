<?php session_start(); ?>
<!DOCTYPE html>
<html>
    
    <head>
        <meta charset="utf-8">
        <title>Holiday</title>
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/schedule_appointment_style.css">
        <link href="https://fonts.googleapis.com/css?family=Yantramanav" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Lora" rel="stylesheet">

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
                        <a href="index.php"><span class="lnr lnr-arrow-left"></span>Back</a>
                        <div id="schedule_div">
                            <h1>Schedule</h1>
                            <h2>Search</h2>
                            <div id="search_schedule_div">
                                <span>Name: </span><input type="text" id="name_input"><br>
                                <span>Date:</span> <input type="date" placeholder="yyyy-mm-dd" id="date_input"><br>
                                <span>Department:</span> <input type="text" id="department_input"><br>
                                <span id="search_schedule_button" class="pointer">SEARCH</span>

                                <table id="search_schedule_result_table">
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


                        <div class="confirmation_modal" id="schedule_appointment_confirmation_modal">
                            <span class="close_modal_button pointer"><span class="lnr lnr-arrow-left"></span>Back</span>
                            <h2>Do you confirm to attend this appointment?</h2>
                            <p>PLACEHOLDER PLACEHOLDER PLACEHOLDER</p>
                            <span id="confirm_schedule_appointment_button" class="pointer">Confirm</span>
                            <span class="close_modal_button pointer">Cancel</span>
                        </div>

                        <div class="confirmation_modal" id="successful_schedule_confirmation_modal">
                            <span class="close_modal_button pointer"><span class="lnr lnr-arrow-left"></span>Back</span>
                            <h2>You have successfully scheduled your appointment!</h2>
                            <p>PLACEHOLDER PLACEHOLDER PLACEHOLDER</p>
                            <a href="calendar.php"><span class="pointer">View in Calendar</span><a>
                            <span class="close_modal_button pointer">Change</span>
                        </div>




                <?php 
                    }
                ?>



            </div> <!--end content div-->
            
        </div> <!--end container div-->
        
    </body>

</html>