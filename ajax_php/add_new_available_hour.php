<?php

	session_start();
	require_once '../includes/config.php';

	$logged_user_id = $_SESSION['logged_user_id'];

	$year = $_GET['year'];
	$month = $_GET['month'];
	$date = $_GET['date'];
	$weekday = $_GET['weekday'];
	$start_time = $_GET['start_time'];
	$end_time = $_GET['end_time'];
	$repeat = $_GET['repeat'];
	$location = $_GET['location'];

	

	$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

	if( $mysqli->connect_errno ) {
		//uncomment the next line for debugging
		echo "<p>$mysqli->connect_error<p>";
		die( "Couldn't connect to database");
	}

	//check if username exists
	$query = "INSERT INTO available_hours (user_id, start_time, end_time,weekdays,available_hour_location,`date`,`repeat`)
				VALUES ($logged_user_id, '$start_time', '$end_time', '$weekday', '$location', '$year-$month-$date','$repeat')";
	echo $query;
		
	if ($mysqli->query($query) === TRUE) {
	    // echo "New record created successfully";
	} else {
	    echo "Error: " . $query . "<br>" . $mysqli->error;
	}

	$mysqli->close();



?>