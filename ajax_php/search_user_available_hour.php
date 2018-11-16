<?php

	session_start();
	require_once '../includes/config.php';

	$name_input = $_POST['name_input'];
	$weekday_input = $_POST['weekday_input'];
	$department_input = $_POST['department_input'];
	// $name_input = $_GET['name_input'];
	// $weekday_input = $_GET['weekday_input'];
	// $department_input = $_GET['department_input'];

	$logged_user_id = $_SESSION['logged_user_id'];

	$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

	if( $mysqli->connect_errno ) {
		//uncomment the next line for debugging
		echo "<p>$mysqli->connect_error<p>";
		die( "Couldn't connect to database");
	}

	//check if username exists
	$query = "SELECT *
			FROM users U, available_hours AH
			WHERE (U.user_id<>$logged_user_id AND U.user_id = AH.user_id)
				AND UPPER(U.username) LIKE UPPER('%$name_input%')
				AND UPPER(U.college_department) LIKE UPPER('%$department_input%')
				AND UPPER(AH.weekdays) LIKE UPPER('%$weekday_input%')
			ORDER BY U.username;";


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