<?php

	session_start();
	require_once '../includes/config.php';

	$schedule_id = $_POST['schedule_id'];
	$year = $_POST['year'];
	$month = $_POST['month'];
	$date = $_POST['date'];
	$hour = $_POST['hour'];
	$minute = $_POST['minute'];
	$location = $_POST['location'];
	$meeting_subject = $_POST['meeting_subject'];
	$notes = $_POST['notes'];

	$logged_user_id = $_SESSION['logged_user_id'];

	$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

	if( $mysqli->connect_errno ) {
		//uncomment the next line for debugging
		echo "<p>$mysqli->connect_error<p>";
		die( "Couldn't connect to database");
	}

	//check if username exists
	$query = "UPDATE schedules
			SET `time`='$year-$month-$date $hour:$minute:00', location='$location', meeting_subject='$meeting_subject', notes='$notes'
			WHERE schedule_id = $schedule_id AND (user_id_1 = $logged_user_id OR user_id_2 = $logged_user_id);";
	

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
	mysqli_stmt_close($stmt);




?>