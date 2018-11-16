<?php

	session_start();
	require_once '../includes/config.php';

	$schedule_id = $_POST['schedule_id'];

	$logged_user_id = $_SESSION['logged_user_id'];

	$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

	if( $mysqli->connect_errno ) {
		//uncomment the next line for debugging
		echo "<p>$mysqli->connect_error<p>";
		die( "Couldn't connect to database");
	}

	//check if username exists
	if ($appoint_type=="request_status") {
		$query = "UPDATE schedules
				WHERE schedule_id = $schedule_id AND (user_id_1 = $logged_user_id OR user_id_2 = $logged_user_id);";
	}
	

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