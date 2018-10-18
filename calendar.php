<?php session_start(); ?>
<!DOCTYPE html>
<html>
    
    <head>
        <meta charset="utf-8">
        <title>Holiday</title>
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/calendar_style.css">
        <link href="https://fonts.googleapis.com/css?family=Yantramanav" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Lora" rel="stylesheet">

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <link rel="stylesheet" href="https://cdn.linearicons.com/free/1.0.0/icon-font.min.css">
		<script src="js/modal_js.js"></script>
        <script src="js/login_register_modal_ajax.js"></script>
        <script src="js/main_index_js.js"></script>
        <script src="js/calendar_js.js"></script>

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


                        require_once 'includes/config.php';

                        $logged_user_id = $_SESSION['logged_user_id'];

                        $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

                        if( $mysqli->connect_errno ) {
                            //uncomment the next line for debugging
                            echo "<p>$mysqli->connect_error<p>";
                            die( "Couldn't connect to database");
                        }

                        //check if username exists
                        $query = "SELECT * FROM users WHERE user_id = $logged_user_id;";
                            
                        $stmt = $mysqli->stmt_init();

                        if ($stmt->prepare($query)) {
                            if (!$stmt->execute()){
                                print("<p>Error with resgister submission</p>");
                            } else {
                                $info_result = $stmt->get_result();
                            }
                        } else {
                            print("<p>Error with register submission1</p>");
                        }
                        mysqli_stmt_close($email_stmt);
                        
                        if($info_result && $info_result->num_rows == 1) {
                            $info_row = $info_result->fetch_assoc();
                        }else{  
                            print("<p>Email already used!</p>");
                        }

                        mysqli_close($mysqli);



                        //check the first weekday of this month
                        // $cur_date = date("j");
                        // $cur_month = date("m");
                        // $cur_month_text = date("F");
                        // $cur_year = date("Y");
                        // $first_weekday = date('l',mktime(null,null,null,$cur_month,1,$cur_year));
                        // $first_weekday_int = date('N',mktime(null,null,null,$cur_month,1,$cur_year));
                        // $last_date_of_month = date('t', mktime(null,null,null,$cur_month,$cur_date,$cur_year));
                ?>
                        <div class="container-fluid">
                            <div class="row full_screen_height">
                                <div class="schedule_info_div col-lg-2">
                                    <h1>TODAY</h1>

                                </div> <!-- end of schedule info div -->
                                <div class="user_calendar_div col-lg-10">
                                    <a href="index.php"><span class="lnr lnr-arrow-left"></span>Back</a>
                                    <div class="month">
                                        <span class="prev_month_pointer switch_month">&#10094;</span>
                                        <span class="next_month_pointer switch_month">&#10095;</span>

                                        <span id="displayed_month"></span><br>
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