<?php session_start(); ?>
<!DOCTYPE html>
<html>
    
    <head>
        <meta charset="utf-8">
        <title>Holiday</title>
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/toggle_button.min.css">
        <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet">

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <link rel="stylesheet" href="https://cdn.linearicons.com/free/1.0.0/icon-font.min.css">
		<script src="js/modal_js.js"></script>
        <script src="js/login_register_modal_ajax.js"></script>
        <script src="js/main_index_js.js"></script>

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
                ?> 
                    <div class="div_left">
                        <img src="../img/Login2.jpg" class="home_page_img">
                        <p>We make appointments easier.</p>
                    </div>

                    <div class="modal_right">
                        <div class="center" id="toggle_switch_div">
                            <span id="switch_login_span">Log In</span>
                            <label class="switch vertical_align" >
                                <input type="checkbox" value="login" id="toggle_button">
                                <span class="slider round"></span>
                            </label>
                            <span id="switch_register_span">Register</span>
                        </div>

                        <?php include 'includes/login_modal.php';?>

                        <?php include 'includes/register_modal.php';?>
                    </div>

                    

                <?php
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
                ?>
                        <div class="container-fluid">
                            <div class="row full_screen_height">
                                <div class="user_info_div col-lg-3">
                                    <?php
                                        if ($_SESSION['logged_user_type']=="Student") {
                                            echo '<span id="edit_user_button" class="green_border_button">Edit</span><br>';
                                        }elseif ($_SESSION['logged_user_type']=="Faculty") {
                                            echo '<span id="edit_faculty_button" class="green_border_button">Edit</span><br>';
                                        }
                                    ?>
                                    <?php
                                        if ($_SESSION['logged_user_type']=="Student") {
                                            echo '<img src="../img/student_profile.jpeg" id="portrait_img"><br>';
                                        }elseif ($_SESSION['logged_user_type']=="Faculty") {
                                            echo '<img src="../img/faculty_profile.jpeg" id="portrait_img"><br>';
                                        }
                                    ?>
                                    <!-- <img src="../img/Portrait_Placeholder.png" id="portrait_img"><br> -->
                                    <span id="user_name">
                                        <?php
                                            echo $info_row['first_name'];
                                            echo "  ";
                                            echo $info_row['last_name'];
                                        ?>
                                    </span><br>

                                    <span id="user_affiliation">
                                        <?php
                                            echo $info_row['college_department'];
                                        ?>
                                    </span><br>

                                    <br>
                                    <span id="log_out_span" class="pointer red_button">Log out</span>

                                </div> <!-- end of user info div -->
                            <?php
                                if ($info_row['user_type']=="Student") {
                            ?>
                                    <div class="user_funtionality_div col-lg-9">
                                        <div class="row half_screen_height">

                                            <div class="col-lg-5 full_row_height functionality_grid" id="schedule_appointment_grid">
                                                <a href="schedule_appointment.php">
                                                    <img src="../img/schedule_appointment_icon.png">
                                                </a>
                                                <!-- <span>Schedule an Appointment</span> -->
                                            </div>
                                            <div class="col-lg-5 full_row_height functionality_grid" id="view_schedule_grid">
                                                <a href="calendar.php">
                                                    <img src="../img/view_schedule_icon.png">
                                                </a>
                                            </div>
                                        </div>

                                        <div class="row half_screen_height">
                                            <div class="col-lg-5 full_row_height functionality_grid" id="change_appointment_grid">
                                                <a href="edit_appointment.php">
                                                    <img src="../img/change_appointment_icon.png">
                                                </a>
                                            </div>

                                            <div class="col-lg-5 full_row_height functionality_grid" id="view_message_grid">
                                                <a href="under_construction.php">
                                                    <img src="../img/view_message_icon.png">
                                                </a>
                                                
                                            </div>
                                        </div>
                                        
                                    </div> <!-- end of user functionality div -->

                                    <?php include 'includes/student_edit_info_div.php';?>

                            <?php
                                }else if ($info_row['user_type']=="Faculty"){
                            ?>
                                    <div class="user_funtionality_div col-lg-9">
                                        <div class="row half_screen_height">
                                            <div class="col-lg-5 full_row_height functionality_grid" id="view_schedule_grid">
                                                <a href="view_faculty_schedule.php">
                                                    <img src="../img/view_schedule_icon.png">
                                                </a>
                                            </div>

                                            <div class="col-lg-5 full_row_height functionality_grid" id="schedule_appointment_grid">
                                                <a href="set_hours.php">
                                                    <img src="../img/set_hours_icon.png">
                                                </a>
                                            </div>
                                        </div>

                                        <div class="row half_screen_height">
                                            <div class="col-lg-5 full_row_height functionality_grid" id="change_appointment_grid">
                                                <a href="edit_appointment.php">
                                                    <img src="../img/change_appointment_icon.png">
                                                </a>
                                            </div>

                                            <div class="col-lg-5 full_row_height functionality_grid" id="view_message_grid">
                                                <a href="under_construction.php">
                                                    <img src="../img/view_message_icon.png">
                                                </a>
                                            </div>
                                        </div>
                                        
                                    </div> <!-- end of user functionality div -->

                                    <?php include 'includes/faculty_edit_info_div.php';?>


                            <?php
                                }
                            ?>
                            </div> <!-- end of main-row full-screen-height -->
                            
                        </div> <!-- end of container-fluid -->






                <?php 
                    }
                ?>



            </div> <!--end content div-->
            
        </div> <!--end container div-->
        
    </body>

</html>