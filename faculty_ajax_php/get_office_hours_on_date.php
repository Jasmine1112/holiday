<?php

	session_start();
	require_once '../includes/config.php';

	$input_year = $_POST['input_year'];
	$input_month = $_POST['input_month'];
	$input_date = $_POST['input_date'];
	$input_weekday = $_POST['input_weekday'];
	// $input_year = $_GET['input_year'];
	// $input_month = $_GET['input_month'];
	// $input_date = $_GET['input_date'];


	$logged_user_id = $_SESSION['logged_user_id'];

	$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

	if( $mysqli->connect_errno ) {
		//uncomment the next line for debugging
		echo "<p>$mysqli->connect_error<p>";
		die( "Couldn't connect to database");
	}

	//check if username exists
	$query = "SELECT *
			FROM faculty_office_hours
			WHERE user_id = $logged_user_id
				AND weekdays='$input_weekday';";

	$result = $mysqli->query($query);
	if (!$result) {
		print($mysqli->error);
	}

	$schedule_results = [];
	while ( $row = $result->fetch_assoc() ) {
		array_push($schedule_results, $row);
	}

	mysqli_close($mysqli);

	echo json_encode($schedule_results);




?>