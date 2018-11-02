<?php

	session_start();
	require_once '../includes/config.php';

	$logged_user_id = $_SESSION['logged_user_id'];

	$user_id_2 = $_GET['user_id_2'];
	$scheduled_time = $_GET['time'];
	$location = $_GET['location'];

	

	$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

	if( $mysqli->connect_errno ) {
		//uncomment the next line for debugging
		echo "<p>$mysqli->connect_error<p>";
		die( "Couldn't connect to database");
	}

	//check if username exists
	$query = "INSERT INTO schedules (user_id_1, user_id_2, `time`,location,status)
				VALUES ($logged_user_id, '$user_id_2', '$scheduled_time', '$location' ,'upcoming')";
	echo $query;
		
	if ($mysqli->query($query) === TRUE) {
	    // echo "New record created successfully";
	} else {
	    echo "Error: " . $query . "<br>" . $mysqli->error;
	}

	$mysqli->close();



?>